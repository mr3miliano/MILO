import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../../theme';
import { mockApi } from '../../../services/mockApi';
import { Team, User } from '../../../types';
import { Users, Plus, ChevronRight, LogOut } from 'lucide-react-native';

export default function TeamsScreen() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      mockApi.getCurrentUser(),
      mockApi.getTeams()
    ]).then(([u, t]) => {
      setUser(u);
      setTeams(t);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.avatar}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
        <Pressable style={styles.logoutBtn}>
          <LogOut size={20} color={theme.colors.text.secondary} />
        </Pressable>
      </View>

      <Text style={styles.title}>Tus equipos</Text>
      <Text style={styles.subtitle}>Selecciona un equipo para entrar al workspace.</Text>

      <View style={styles.teamList}>
        {teams.map(team => (
          <Pressable 
            key={team.id} 
            style={styles.teamCard}
            onPress={() => router.push(`/t/${team.id}`)}
          >
            <View style={styles.teamIcon}>
              <Text style={styles.teamIconText}>{team.name.charAt(0)}</Text>
            </View>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{team.name}</Text>
              <Text style={styles.teamMeta}>1 Miembro</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.text.tertiary} />
          </Pressable>
        ))}

        <Pressable style={styles.newTeamCard}>
          <View style={[styles.teamIcon, styles.newTeamIcon]}>
            <Plus size={24} color={theme.colors.primary} />
          </View>
          <Text style={styles.newTeamText}>Crear nuevo equipo</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.xl,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 60,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: theme.colors.surface,
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
  },
  userName: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
  },
  userEmail: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  logoutBtn: {
    padding: theme.spacing.sm,
  },
  title: {
    fontSize: 32,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.size.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xxl,
  },
  teamList: {
    gap: theme.spacing.md,
  },
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  teamIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  teamIconText: {
    fontSize: 20,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primary,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  },
  teamMeta: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  newTeamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  newTeamIcon: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  newTeamText: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.primary,
  }
});
