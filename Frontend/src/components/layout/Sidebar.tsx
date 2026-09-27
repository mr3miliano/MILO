import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Image } from 'react-native';
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

const BOTTOM_ITEMS = [
  { name: 'Configuración', path: '/settings', icon: Settings },
  { name: 'Perfil', path: '/profile', icon: User },
];

export const Sidebar = () => {
  const pathname = usePathname();
  
  const pathParts = pathname.split('/');
  const teamId = pathParts[1] === 't' ? pathParts[2] : '00000000-0000-0000-0000-000000000001';
  const basePath = `/t/${teamId}`;

  const NAV_ITEMS = [
    { name: 'Inicio', path: `${basePath}`, icon: Home },
    { name: 'Milo', path: `${basePath}/milo`, icon: MessageSquare },
    { name: 'Trabajo', path: `${basePath}/work`, icon: Briefcase },
    { name: 'Equipo', path: `${basePath}/team`, icon: Users },
    { name: 'Negocios', path: `${basePath}/business`, icon: BarChart2 },
    { name: 'Integraciones', path: `${basePath}/integrations`, icon: Zap },
  ];

  const renderItem = (item: any) => {
    // If it's the root of the team
    let isActive = false;
    if (item.path === basePath) {
       isActive = pathname === basePath || pathname === `${basePath}/`;
    } else {
       isActive = pathname.startsWith(item.path);
    }
    
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
      {/* Logo Area */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/images/logo.png')} 
          style={styles.logoImage} 
          resizeMode="contain" 
        />
      </View>

      {/* Main Navigation */}
      <View style={styles.navSection}>
        {NAV_ITEMS.map(renderItem)}
      </View>

      <View style={styles.spacer} />

      {/* Bottom Navigation */}
      <View style={styles.bottomSection}>
        {BOTTOM_ITEMS.map(item => (
          <Pressable key={item.path} style={styles.navItem}>
            <item.icon size={20} color={theme.colors.sidebar.text} />
            <Text style={styles.navText}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: '100%',
    backgroundColor: theme.colors.sidebar.background,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    paddingVertical: theme.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
  },
  logoContainer: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 140,
    height: 40,
  },
  navSection: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    gap: theme.spacing.md,
  },
  navItemActive: {
    backgroundColor: theme.colors.sidebar.active,
  },
  navText: {
    fontSize: theme.typography.size.md,
    color: theme.colors.sidebar.text,
    fontWeight: theme.typography.weight.medium,
  },
  navTextActive: {
    color: theme.colors.sidebar.textActive,
    fontWeight: theme.typography.weight.semibold,
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xs,
  }
});
