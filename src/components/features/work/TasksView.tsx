import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Task } from '../../../mocks/tasks';
import { CheckCircle2, Circle, Clock } from 'lucide-react-native';

interface TasksViewProps {
  tasks: Task[];
}

export const TasksView = ({ tasks }: TasksViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskItem}>
            <View style={styles.taskLeft}>
              {task.status === 'completed' ? (
                <CheckCircle2 size={24} color={theme.colors.success} />
              ) : task.status === 'in_progress' ? (
                <Clock size={24} color={theme.colors.warning} />
              ) : (
                <Circle size={24} color={theme.colors.text.tertiary} />
              )}
              <View style={styles.taskInfo}>
                <Text style={[styles.taskTitle, task.status === 'completed' && styles.taskTitleCompleted]}>
                  {task.title}
                </Text>
                <View style={styles.taskMeta}>
                  <Text style={styles.taskMetaText}>Responsable: {task.assignee}</Text>
                  <Text style={styles.taskMetaText}>•</Text>
                  <Text style={styles.taskMetaText}>Vence: {task.dueDate}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.taskRight}>
              <View style={[styles.badge, styles[`priority_${task.priority}` as keyof typeof styles] as any]}>
                <Text style={[styles.badgeText, styles[`priorityText_${task.priority}` as keyof typeof styles] as any]}>
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                </Text>
              </View>
            </View>
          </View>
        ))}
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
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  taskInfo: {
    gap: 4,
  },
  taskTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text.primary,
  },
  taskTitleCompleted: {
    color: theme.colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  taskMeta: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  taskMetaText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  taskRight: {
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: theme.typography.weight.bold,
  },
  priority_high: {
    backgroundColor: theme.colors.danger + '20', // 20% opacity approx
  },
  priorityText_high: {
    color: theme.colors.danger,
  },
  priority_medium: {
    backgroundColor: theme.colors.warningLight,
  },
  priorityText_medium: {
    color: theme.colors.warning,
  },
  priority_low: {
    backgroundColor: theme.colors.successLight,
  },
  priorityText_low: {
    color: theme.colors.success,
  }
});
