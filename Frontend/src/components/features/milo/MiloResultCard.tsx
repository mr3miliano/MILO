import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { CheckCircle2, Circle } from 'lucide-react-native';
import { ResultCardType } from '../../../mocks/milo';

interface MiloResultCardProps {
  type: ResultCardType;
  data: any;
}

export const MiloResultCard = ({ type, data }: MiloResultCardProps) => {
  if (type === 'none' || !data) return null;

  if (type === 'sprint') {
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

  if (type === 'task') {
    return (
      <View style={styles.card}>
        {data.map((task: any) => (
          <View key={task.id} style={styles.taskItem}>
            {task.status === 'completed' ? (
              <CheckCircle2 size={16} color={theme.colors.success} />
            ) : (
              <Circle size={16} color={theme.colors.text.tertiary} />
            )}
            <Text style={styles.taskText}>{task.title}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Resultado no soportado visualmente aún</Text>
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
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  taskText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.primary,
  }
});
