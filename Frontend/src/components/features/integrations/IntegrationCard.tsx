import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { theme } from '../../../theme';
import { ConnectorStatus, IntegrationProvider } from '../../../types';
import { Mail, HardDrive, GitBranch, FileText, Triangle, Send, AlertCircle, CheckCircle2, Circle } from 'lucide-react-native';

interface IntegrationCardProps {
  provider: IntegrationProvider;
  name: string;
  description: string;
  status: ConnectorStatus;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const IntegrationCard = ({ provider, name, description, status, onConnect, onDisconnect }: IntegrationCardProps) => {
  const getIcon = () => {
    const props = { size: 24, color: theme.colors.text.primary };
    switch (provider) {
      case 'gmail':
      case 'gmail_mcp': return <Mail {...props} />;
      case 'drive': return <HardDrive {...props} />;
      case 'github':
      case 'github_pat': return <GitBranch {...props} />;
      case 'notion': return <FileText {...props} />;
      case 'vercel': return <Triangle {...props} />;
      case 'telegram': return <Send {...props} />;
      default: return <Circle {...props} />;
    }
  };

  const getStatusDisplay = () => {
    switch (status) {
      case 'connected':
        return (
          <View style={styles.statusRow}>
            <CheckCircle2 size={16} color={theme.colors.success} />
            <Text style={[styles.statusText, { color: theme.colors.success }]}>Conectado</Text>
          </View>
        );
      case 'pending':
        return (
          <View style={styles.statusRow}>
            <ActivityIndicator size="small" color={theme.colors.warning} />
            <Text style={[styles.statusText, { color: theme.colors.warning }]}>Conectando...</Text>
          </View>
        );
      case 'error':
        return (
          <View style={styles.statusRow}>
            <AlertCircle size={16} color={theme.colors.danger} />
            <Text style={[styles.statusText, { color: theme.colors.danger }]}>Error</Text>
          </View>
        );
      case 'disconnected':
      default:
        return (
          <View style={styles.statusRow}>
            <Circle size={16} color={theme.colors.text.tertiary} />
            <Text style={[styles.statusText, { color: theme.colors.text.tertiary }]}>No conectado</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          {getIcon()}
        </View>
        {getStatusDisplay()}
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.footer}>
        {status === 'connected' ? (
          <Pressable style={[styles.button, styles.buttonDisconnect]} onPress={onDisconnect}>
            <Text style={styles.buttonTextDisconnect}>Desconectar</Text>
          </Pressable>
        ) : status === 'pending' ? (
          <Pressable style={[styles.button, styles.buttonDisabled]} disabled>
            <Text style={styles.buttonTextDisabled}>En proceso...</Text>
          </Pressable>
        ) : status === 'error' ? (
          <Pressable style={[styles.button, styles.buttonConnect]} onPress={onConnect}>
            <Text style={styles.buttonTextConnect}>Reintentar conexión</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.button, styles.buttonConnect]} onPress={onConnect}>
            <Text style={styles.buttonTextConnect}>Conectar</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    width: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  statusText: {
    fontSize: 12,
    fontWeight: theme.typography.weight.medium,
  },
  body: {
    flex: 1,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  footer: {
    marginTop: 'auto',
  },
  button: {
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonConnect: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  buttonDisconnect: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
  },
  buttonTextConnect: {
    color: theme.colors.text.inverse,
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.sm,
  },
  buttonTextDisconnect: {
    color: theme.colors.danger,
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.sm,
  },
  buttonTextDisabled: {
    color: theme.colors.text.tertiary,
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.sm,
  }
});
