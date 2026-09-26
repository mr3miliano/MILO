import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { CheckCircle2, Circle, GitPullRequest, GitMerge, GitCommit } from 'lucide-react-native';
import { MiloContent } from '../../../mocks/milo';

interface MiloResultCardProps {
  responseContent: MiloContent;
}

export const MiloResultCard = ({ responseContent }: MiloResultCardProps) => {
  if (responseContent.type === 'text') return null;

  if (responseContent.type === 'sprint') {
    const data = responseContent.content;
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{data.name}</Text>
        <View style={styles.sprintRow}>
          <Text style={styles.sprintText}>Progreso: {data.progress}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${data.progress}%` }]} />
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statItem}>{data.completedTasks} completadas</Text>
          <Text style={styles.statItem}>{data.pendingTasks} pendientes</Text>
        </View>
      </View>
    );
  }

  if (responseContent.type === 'tasks') {
    const data = responseContent.content;
    return (
      <View style={styles.card}>
        {data.map((task: any) => (
          <View key={task.id} style={styles.itemRow}>
            {task.status === 'completed' ? (
              <CheckCircle2 size={16} color={theme.colors.success} />
            ) : (
              <Circle size={16} color={theme.colors.text.tertiary} />
            )}
            <Text style={styles.itemText}>{task.title}</Text>
          </View>
        ))}
      </View>
    );
  }

  if (responseContent.type === 'pull_requests') {
    const data = responseContent.content;
    return (
      <View style={styles.card}>
        {data.map((pr: any) => (
          <View key={pr.id} style={styles.itemRow}>
            {pr.status === 'merged' ? (
              <GitMerge size={16} color={theme.colors.primary} />
            ) : pr.status === 'approved' ? (
              <CheckCircle2 size={16} color={theme.colors.success} />
            ) : (
              <GitPullRequest size={16} color={theme.colors.warning} />
            )}
            <View>
              <Text style={styles.itemText}>#{pr.number} {pr.title}</Text>
              <Text style={styles.itemSubText}>{pr.author} • {pr.status}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (responseContent.type === 'repository') {
    const data = responseContent.content;
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{data.name}</Text>
        <View style={styles.itemRow}>
          <GitCommit size={16} color={theme.colors.text.secondary} />
          <Text style={styles.itemText}>{data.lastCommit} ({data.lastCommitAuthor})</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Resultado visual no soportado aún</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  cardTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  sprintRow: {
    marginBottom: theme.spacing.xs,
  },
  sprintText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.full,
    marginBottom: theme.spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statItem: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.tertiary,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  itemText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.primary,
  },
  itemSubText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  }
});
