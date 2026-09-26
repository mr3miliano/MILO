import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { AppShell } from '../components/layout/AppShell';
import { theme } from '../theme';
import { teamMembersMock } from '../mocks/teams';
import { Mail, MoreHorizontal, UserPlus } from 'lucide-react-native';

export default function TeamScreen() {
  const [showInviteMock, setShowInviteMock] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return theme.colors.success;
      case 'busy': return theme.colors.danger;
      case 'offline': return theme.colors.text.tertiary;
      default: return theme.colors.text.tertiary;
    }
  };

  return (
    <AppShell title="Equipo">
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Miembros del Equipo</Text>
            <Text style={styles.subtitle}>{teamMembersMock.length} miembros en total</Text>
          </View>
          <Pressable 
            style={styles.inviteButton}
            onPress={() => setShowInviteMock(true)}
          >
            <UserPlus size={18} color={theme.colors.text.inverse} />
            <Text style={styles.inviteButtonText}>Invitar miembro</Text>
          </Pressable>
        </View>

        {showInviteMock && (
          <View style={styles.inviteMockBanner}>
            <Text style={styles.inviteMockText}>Simulación: Se abrió el modal de invitación.</Text>
            <Pressable onPress={() => setShowInviteMock(false)}>
              <Text style={styles.inviteMockClose}>Cerrar</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.listContainer}>
          {teamMembersMock.map(member => (
            <View key={member.id} style={styles.memberItem}>
              <View style={styles.memberLeft}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{member.avatar}</Text>
                  </View>
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(member.status) }]} />
                </View>
                
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
              </View>

              <View style={styles.memberRight}>
                {Platform.OS === 'web' && <Text style={styles.memberEmail}>{member.email}</Text>}
                <View style={styles.actions}>
                  <Pressable style={styles.iconButton}>
                    <Mail size={18} color={theme.colors.text.secondary} />
                  </Pressable>
                  <Pressable style={styles.iconButton}>
                    <MoreHorizontal size={18} color={theme.colors.text.secondary} />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    gap: theme.spacing.sm,
  },
  inviteButtonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.semibold,
  },
  inviteMockBanner: {
    backgroundColor: theme.colors.successLight,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  inviteMockText: {
    color: theme.colors.success,
    fontWeight: theme.typography.weight.medium,
  },
  inviteMockClose: {
    color: theme.colors.success,
    fontWeight: theme.typography.weight.bold,
  },
  listContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  memberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primary,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  memberInfo: {
    gap: 4,
  },
  memberName: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  },
  memberRole: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  memberRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  memberEmail: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
