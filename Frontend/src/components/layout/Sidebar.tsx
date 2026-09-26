import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { theme } from '../../theme';
import { 
  Home, 
  MessageSquare, 
  Briefcase, 
  Users, 
  BarChart2, 
  Zap, 
  Settings, 
  User 
} from 'lucide-react-native';

const NAV_ITEMS = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Milo', path: '/milo', icon: MessageSquare },
  { name: 'Trabajo', path: '/work', icon: Briefcase },
  { name: 'Equipo', path: '/team', icon: Users },
  { name: 'Negocios', path: '/business', icon: BarChart2 },
  { name: 'Integraciones', path: '/integrations', icon: Zap },
];

const BOTTOM_ITEMS = [
  { name: 'Configuración', path: '/settings', icon: Settings },
  { name: 'Perfil', path: '/profile', icon: User },
];

export const Sidebar = () => {
  const pathname = usePathname();

  const renderItem = (item: any) => {
    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
    const Icon = item.icon;
    const color = isActive ? theme.colors.sidebar.textActive : theme.colors.sidebar.text;

    return (
      <Link href={item.path as any} key={item.path} asChild>
        <Pressable style={StyleSheet.flatten([styles.navItem, isActive && styles.navItemActive])}>
          <Icon size={20} color={color} strokeWidth={isActive ? 2.5 : 2} />
          <Text style={[styles.navText, isActive && styles.navTextActive]}>
            {item.name}
          </Text>
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>Milo GPT</Text>
        </View>
      </View>
      
      <View style={styles.navContainer}>
        {NAV_ITEMS.map(renderItem)}
      </View>

      <View style={styles.bottomContainer}>
        {BOTTOM_ITEMS.map(renderItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: theme.colors.sidebar.background,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    height: '100%',
  },
  header: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.sm,
  },
  logoPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primary,
  },
  navContainer: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  bottomContainer: {
    gap: theme.spacing.xs,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.md,
    gap: theme.spacing.md,
  },
  navItemActive: {
    backgroundColor: theme.colors.sidebar.active,
  },
  navText: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.sidebar.text,
  },
  navTextActive: {
    color: theme.colors.sidebar.textActive,
    fontWeight: theme.typography.weight.bold,
  },
});
