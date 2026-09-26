import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { theme } from '../../theme';
import { Bell, Search, GitPullRequest, CheckCircle2, MessageCircle, Clock, FileText } from 'lucide-react-native';
import { notificationsMock, Notification } from '../../mocks/notifications';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(notificationsMock);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'pull_request': return <GitPullRequest size={16} color={theme.colors.warning} />;
      case 'task': return <CheckCircle2 size={16} color={theme.colors.success} />;
      case 'message': return <MessageCircle size={16} color={theme.colors.primary} />;
      case 'sprint': return <Clock size={16} color={theme.colors.secondary} />;
      case 'document': return <FileText size={16} color={theme.colors.danger} />;
      default: return <Bell size={16} color={theme.colors.text.secondary} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>
        <Pressable style={styles.iconButton}>
          <Search size={20} color={theme.colors.text.secondary} />
        </Pressable>
        
        <View style={{ position: 'relative' }}>
          <Pressable 
            style={styles.iconButton}
            onPress={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} color={theme.colors.text.secondary} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </Pressable>

          {showNotifications && (
            <View style={styles.popover}>
              <View style={styles.popoverHeader}>
                <Text style={styles.popoverTitle}>Notificaciones</Text>
              </View>
              {notifications.map(notif => (
                <Pressable 
                  key={notif.id} 
                  style={[styles.notifItem, !notif.read && styles.notifItemUnread]}
                  onPress={() => markAsRead(notif.id)}
                >
                  <View style={styles.notifIcon}>
                    {getNotificationIcon(notif.type)}
                  </View>
                  <View style={styles.notifContent}>
                    <Text style={styles.notifTitle}>{notif.title}</Text>
                    <Text style={styles.notifDesc}>{notif.description}</Text>
                    <Text style={styles.notifTime}>{notif.createdAt}</Text>
                  </View>
                  {!notif.read && <View style={styles.unreadDot} />}
                </Pressable>
              ))}
              {notifications.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No tienes notificaciones nuevas.</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>D</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    zIndex: 50,
  },
  left: { flex: 1 },
  title: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.danger,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  badgeText: {
    color: theme.colors.text.inverse,
    fontSize: 10,
    fontWeight: theme.typography.weight.bold,
  },
  popover: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 320,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
    zIndex: 100,
  },
  popoverHeader: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  popoverTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
  },
  notifItem: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    alignItems: 'flex-start',
  },
  notifItemUnread: {
    backgroundColor: theme.colors.background,
  },
  notifIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  notifDesc: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  notifTime: {
    fontSize: 11,
    color: theme.colors.text.tertiary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginLeft: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  emptyState: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.size.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
  avatarText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
  },
});
