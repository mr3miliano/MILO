import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { AppShell } from '../components/layout/AppShell';
import { theme } from '../theme';
import { currentSprintDetail } from '../mocks/sprints';
import { tasksMock } from '../mocks/tasks';
import { documentsMock } from '../mocks/documents';
import { SprintView } from '../components/features/work/SprintView';
import { TasksView } from '../components/features/work/TasksView';
import { DocumentsView } from '../components/features/work/DocumentsView';

type TabType = 'sprint' | 'tasks' | 'documents';

export default function WorkScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('sprint');

  const renderContent = () => {
    switch (activeTab) {
      case 'sprint':
        return <SprintView sprint={currentSprintDetail} />;
      case 'tasks':
        return <TasksView tasks={tasksMock} />;
      case 'documents':
        return <DocumentsView documents={documentsMock} />;
      default:
        return null;
    }
  };

  return (
    <AppShell title="Trabajo">
      <View style={styles.container}>
        {/* Tabs Navigation */}
        <View style={styles.tabsContainer}>
          <Pressable 
            style={[styles.tab, activeTab === 'sprint' && styles.activeTab]}
            onPress={() => setActiveTab('sprint')}
          >
            <Text style={[styles.tabText, activeTab === 'sprint' && styles.activeTabText]}>
              Sprint
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.tab, activeTab === 'tasks' && styles.activeTab]}
            onPress={() => setActiveTab('tasks')}
          >
            <Text style={[styles.tabText, activeTab === 'tasks' && styles.activeTabText]}>
              Tareas
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.tab, activeTab === 'documents' && styles.activeTab]}
            onPress={() => setActiveTab('documents')}
          >
            <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>
              Documentos
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
  },
  tab: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text.secondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weight.semibold,
  },
  content: {
    flex: 1,
  }
});
