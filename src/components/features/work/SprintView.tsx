import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Sprint } from '../../../mocks/sprints';

interface SprintViewProps {
  sprint: Sprint;
}

export const SprintView = ({ sprint }: SprintViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Sprint Actual</Text>
          <Text style={styles.name}>{sprint.name}</Text>
        </View>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{sprint.startDate} - {sprint.endDate}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progreso</Text>
          <Text style={styles.progressValue}>{sprint.progress}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${sprint.progress}%` }]} />
        </View>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Resumen</Text>
        <Text style={styles.summaryText}>{sprint.summary}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{sprint.completedTasks}</Text>
          <Text style={styles.statLabel}>Tareas Completadas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{sprint.pendingTasks}</Text>
          <Text style={styles.statLabel}>Tareas Pendientes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  name: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
  },
  dateBadge: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
  },
  dateText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weight.medium,
  },
  progressSection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  progressLabel: {
    fontSize: theme.typography.size.md,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weight.medium,
  },
  progressValue: {
    fontSize: theme.typography.size.md,
    color: theme.colors.primary,
    fontWeight: theme.typography.weight.bold,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.full,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
  },
  summarySection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  summaryText: {
    fontSize: theme.typography.size.md,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  statNumber: {
    fontSize: 48,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weight.medium,
  }
});
