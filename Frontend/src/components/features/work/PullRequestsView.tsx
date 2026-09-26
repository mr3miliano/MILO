import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { PullRequest } from '../../../mocks/pullRequests';
import { GitPullRequest, GitMerge, CheckCircle2 } from 'lucide-react-native';

interface PullRequestsViewProps {
  pullRequests: PullRequest[];
}

export const PullRequestsView = ({ pullRequests }: PullRequestsViewProps) => {
  const getIcon = (status: string) => {
    switch (status) {
      case 'merged': return <GitMerge size={20} color={theme.colors.primary} />;
      case 'approved': return <CheckCircle2 size={20} color={theme.colors.success} />;
      default: return <GitPullRequest size={20} color={theme.colors.warning} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'merged': return 'Mergeado';
      case 'approved': return 'Aprobado';
      case 'review': return 'Revisión pendiente';
      case 'open': return 'Abierto';
      default: return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'merged': return { bg: theme.colors.primaryLight, text: theme.colors.primary };
      case 'approved': return { bg: theme.colors.successLight, text: theme.colors.success };
      case 'review': return { bg: theme.colors.warningLight, text: theme.colors.warning };
      case 'open': return { bg: theme.colors.background, text: theme.colors.text.secondary };
      default: return { bg: theme.colors.background, text: theme.colors.text.secondary };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {pullRequests.map(pr => {
          const statusStyle = getStatusStyle(pr.status);
          return (
            <View key={pr.id} style={styles.item}>
              <View style={styles.left}>
                {getIcon(pr.status)}
                <View style={styles.info}>
                  <Text style={styles.title}>#{pr.number} {pr.title}</Text>
                  <Text style={styles.meta}>{pr.author} • {pr.createdAt}</Text>
                </View>
              </View>
              <View style={styles.right}>
                <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.badgeText, { color: statusStyle.text }]}>
                    {getStatusText(pr.status)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  list: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  info: {
    gap: 4,
  },
  title: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text.primary,
  },
  meta: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  right: {
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: theme.typography.weight.bold,
  }
});
