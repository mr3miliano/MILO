import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AppShell } from '../components/layout/AppShell';
import { theme } from '../theme';
import { integrationsMock, Integration } from '../mocks/integrations';
import { HardDrive, GitBranch, MessageCircle, Users, Phone } from 'lucide-react-native';

export default function IntegrationsScreen() {
  const [integrations, setIntegrations] = useState<Integration[]>(integrationsMock);

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(int => 
      int.id === id ? { ...int, connected: !int.connected } : int
    ));
  };

  const getIcon = (iconName: string) => {
    const props = { size: 24, color: theme.colors.text.secondary };
    switch (iconName) {
      case 'hard-drive': return <HardDrive {...props} />;
      case 'github': return <GitBranch {...props} />;
      case 'message-circle': return <MessageCircle {...props} />;
      case 'users': return <Users {...props} />;
      case 'phone': return <Phone {...props} />;
      default: return <HardDrive {...props} />;
    }
  };

  return (
    <AppShell title="Integraciones">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Aplicaciones Conectadas</Text>
          <Text style={styles.subtitle}>
            Conecta Milo con tus herramientas favoritas para centralizar tu trabajo.
          </Text>
        </View>

        <View style={styles.grid}>
          {integrations.map(integration => (
            <View key={integration.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  {getIcon(integration.iconName)}
                </View>
                <View style={[
                  styles.statusBadge, 
                  integration.connected ? styles.statusConnected : styles.statusDisconnected
                ]}>
                  <Text style={[
                    styles.statusText, 
                    integration.connected ? styles.statusTextConnected : styles.statusTextDisconnected
                  ]}>
                    {integration.connected ? 'Conectado' : 'No conectado'}
                  </Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.integrationName}>{integration.name}</Text>
                <Text style={styles.integrationDesc}>{integration.description}</Text>
              </View>

              <View style={styles.cardFooter}>
                <Pressable 
                  style={[
                    styles.actionButton, 
                    integration.connected ? styles.actionButtonDisconnect : styles.actionButtonConnect
                  ]}
                  onPress={() => toggleConnection(integration.id)}
                >
                  <Text style={[
                    styles.actionButtonText,
                    integration.connected ? styles.actionTextDisconnect : styles.actionTextConnect
                  ]}>
                    {integration.connected ? 'Desconectar' : 'Conectar'}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
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
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    width: 300,
    ...theme.shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
  },
  statusConnected: {
    backgroundColor: theme.colors.successLight,
  },
  statusDisconnected: {
    backgroundColor: theme.colors.background,
  },
  statusText: {
    fontSize: 12,
    fontWeight: theme.typography.weight.medium,
  },
  statusTextConnected: {
    color: theme.colors.success,
  },
  statusTextDisconnected: {
    color: theme.colors.text.secondary,
  },
  cardBody: {
    marginBottom: theme.spacing.lg,
    flex: 1,
  },
  integrationName: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  integrationDesc: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  cardFooter: {
    marginTop: 'auto',
  },
  actionButton: {
    width: '100%',
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionButtonConnect: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  actionButtonDisconnect: {
    backgroundColor: theme.colors.background,
    borderColor: 'transparent',
  },
  actionButtonText: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.semibold,
  },
  actionTextConnect: {
    color: theme.colors.text.primary,
  },
  actionTextDisconnect: {
    color: theme.colors.danger,
  }
});
