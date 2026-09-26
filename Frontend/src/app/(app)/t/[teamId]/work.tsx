import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { AppShell } from '../../../../components/layout/AppShell';
import { theme } from '../../../../theme';
import { currentSprintDetail } from '../../../../mocks/sprints';
import { tasksMock } from '../../../../mocks/tasks';
import { documentsMock } from '../../../../mocks/documents';
import { repositoriesMock } from '../../../../mocks/repositories';
import { pullRequestsMock } from '../../../../mocks/pullRequests';
import { SprintView } from '../../../../components/features/work/SprintView';
import { TasksView } from '../../../../components/features/work/TasksView';
import { DocumentsView } from '../../../../components/features/work/DocumentsView';
import { RepositoryView } from '../../../../components/features/work/RepositoryView';
import { PullRequestsView } from '../../../../components/features/work/PullRequestsView';

type TabType = 'sprint' | 'tasks' | 'documents' | 'repository' | 'pull_requests';

export default function WorkScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('sprint');

  const renderContent = () => {
    switch (activeTab) {
      case 'sprint': return <SprintView sprint={currentSprintDetail} />;
      case 'tasks': return <TasksView tasks={tasksMock} />;
      case 'documents': return <DocumentsView documents={documentsMock} />;
      case 'repository': return <RepositoryView repository={repositoriesMock[0]} />;
      case 'pull_requests': return <PullRequestsView pullRequests={pullRequestsMock} />;
      default: return null;
    }
  };

  const tabs: { id: TabType, label: string }[] = [
    { id: 'sprint', label: 'Sprint' },
    { id: 'tasks', label: 'Tareas' },
    { id: 'documents', label: 'Documentos' },
    { id: 'repository', label: 'Repositorio' },
    { id: 'pull_requests', label: 'Pull Requests' },
  ];

  return (
    <AppShell title="Trabajo">
      <View style={styles.container}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsContainer}
        >
          {tabs.map(tab => (
            <Pressable 
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

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
  tabsScroll: {
    flexGrow: 0,
    marginBottom: theme.spacing.xl,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
    whiteSpace: 'nowrap',
  } as any,
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weight.semibold,
  },
  content: {
    flex: 1,
  }
});
