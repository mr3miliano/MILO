import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { AppShell } from '../components/layout/AppShell';
import { theme } from '../theme';
import { IntegrationCard } from '../components/features/integrations/IntegrationCard';
import { TelegramTokenModal } from '../components/features/integrations/TelegramTokenModal';
import { Connector, IntegrationProvider } from '../types';
import { apiClient } from '../services/apiClient';

const AVAILABLE_PROVIDERS: { provider: IntegrationProvider, name: string, description: string }[] = [
  { provider: 'telegram', name: 'Telegram', description: 'Bot de comunicación de Milo. Conecta el bot para que tu equipo interactúe con Milo.' },
  { provider: 'gmail', name: 'Gmail', description: 'Permite a Milo leer y responder correos importantes de tu cuenta.' },
  { provider: 'drive', name: 'Google Drive', description: 'Documentos del equipo. Milo podrá buscar y resumir información de tus archivos.' },
  { provider: 'github', name: 'GitHub', description: 'Repositorio y Pull Requests. Milo revisará código y status de desarrollo.' },
  { provider: 'github_pat', name: 'GitHub PAT', description: 'Conexión a GitHub mediante Personal Access Token.' },
  { provider: 'notion', name: 'Notion', description: 'Base de conocimiento. Milo indexará tus páginas.' },
  { provider: 'vercel', name: 'Vercel', description: 'Deployments y status del frontend.' },
];

export default function IntegrationsScreen() {
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);
  const [telegramModalVisible, setTelegramModalVisible] = useState(false);
  const [pollingConnectors, setPollingConnectors] = useState<Set<string>>(new Set());

  // Hardcoded for mock purposes
  const TEAM_ID = 't1';

  const loadConnectors = async () => {
    try {
      const data = await apiClient.getTeamConnectors(TEAM_ID);
      setConnectors(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConnectors();
  }, []);

  // POLLING LOGIC
  useEffect(() => {
    if (pollingConnectors.size === 0) return;

    const intervalId = setInterval(async () => {
      const newConnectors = [...connectors];
      let changed = false;

      for (const id of pollingConnectors) {
        try {
          const status = await apiClient.getConnectorStatus(id);
          const index = newConnectors.findIndex(c => c.id === id);
          if (index !== -1 && newConnectors[index].status !== status.status) {
            newConnectors[index] = status;
            changed = true;
            if (status.status === 'connected' || status.status === 'error') {
              setPollingConnectors(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
              });
            }
          }
        } catch (e) {
          console.error(e);
        }
      }

      if (changed) {
        setConnectors(newConnectors);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [pollingConnectors, connectors]);

  const handleConnect = async (provider: IntegrationProvider, payload?: any) => {
    try {
      const { authUrl, connector } = await apiClient.connectProvider(TEAM_ID, provider, payload);
      
      // Update UI optimistically to pending
      setConnectors(prev => {
        const exists = prev.findIndex(c => c.provider === provider);
        if (exists !== -1) {
          const next = [...prev];
          next[exists] = connector;
          return next;
        }
        return [...prev, connector];
      });

      if (authUrl) {
        // En una app real, aquí usaríamos expo-web-browser o Linking
        console.log("Opening OAuth URL:", authUrl);
        Alert.alert("OAuth Redirection", "Simulando abrir la ventana de OAuth en el navegador...");
      }

      // Start polling the new connector
      setPollingConnectors(prev => new Set(prev).add(connector.id));

    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo iniciar la conexión.");
    }
  };

  const handleDisconnect = async (provider: IntegrationProvider) => {
    try {
      await apiClient.disconnectProvider(TEAM_ID, provider);
      await loadConnectors(); // Reload to get fresh state
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppShell title="Integraciones">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Aplicaciones Conectadas</Text>
          <Text style={styles.subtitle}>
            Conecta Milo con tus herramientas favoritas. Milo utilizará estas conexiones para interactuar con tu equipo.
          </Text>
        </View>

        <View style={styles.grid}>
          {AVAILABLE_PROVIDERS.map(p => {
            const connector = connectors.find(c => c.provider === p.provider);
            const status = connector ? connector.status : 'disconnected';

            return (
              <IntegrationCard
                key={p.provider}
                provider={p.provider}
                name={p.name}
                description={p.description}
                status={status}
                onConnect={() => {
                  if (p.provider === 'telegram') {
                    setTelegramModalVisible(true);
                  } else {
                    handleConnect(p.provider);
                  }
                }}
                onDisconnect={() => handleDisconnect(p.provider)}
              />
            );
          })}
        </View>
      </ScrollView>

      <TelegramTokenModal
        visible={telegramModalVisible}
        onClose={() => setTelegramModalVisible(false)}
        onSubmit={(token) => {
          setTelegramModalVisible(false);
          handleConnect('telegram', { token });
        }}
      />
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { marginBottom: theme.spacing.xl },
  title: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.size.md,
    color: theme.colors.text.secondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
});
