import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Repository } from '../../../mocks/repositories';
import { GitBranch, GitCommit, GitPullRequest, Clock } from 'lucide-react-native';

interface RepositoryViewProps {
  repository: Repository;
}

export const RepositoryView = ({ repository }: RepositoryViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <GitBranch size={24} color={theme.colors.text.primary} />
            <Text style={styles.title}>{repository.name}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{repository.defaultBranch}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <GitCommit size={16} color={theme.colors.text.secondary} />
              <Text style={styles.infoLabel}>Último commit</Text>
            </View>
            <Text style={styles.infoValue}>{repository.lastCommit}</Text>
            <Text style={styles.infoSubtext}>por {repository.lastCommitAuthor}</Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Clock size={16} color={theme.colors.text.secondary} />
              <Text style={styles.infoLabel}>Actualizado</Text>
            </View>
            <Text style={styles.infoValue}>{repository.updatedAt}</Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <GitPullRequest size={16} color={theme.colors.text.secondary} />
              <Text style={styles.infoLabel}>PR abiertos</Text>
            </View>
            <Text style={styles.infoValueLarge}>{repository.openPullRequests}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Ver repositorio</Text>
          </View>
          <View style={[styles.actionButton, styles.actionButtonSecondary]}>
            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>Ver Pull Requests</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
  },
  badge: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badgeText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weight.medium,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  infoBox: {
    flex: 1,
    minWidth: 200,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: theme.spacing.sm,
  },
  infoLabel: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weight.medium,
  },
  infoValue: {
    fontSize: theme.typography.size.md,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weight.semibold,
    marginBottom: 2,
  },
  infoValueLarge: {
    fontSize: theme.typography.size.xl,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weight.bold,
  },
  infoSubtext: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
  actionButtonText: {
    color: theme.colors.text.inverse,
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.sm,
  },
  actionButtonSecondary: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionButtonTextSecondary: {
    color: theme.colors.text.primary,
  }
});
