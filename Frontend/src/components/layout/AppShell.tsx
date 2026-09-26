import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { theme } from '../../theme';
import { Menu, X } from 'lucide-react-native';

interface AppShellProps {
  children: React.ReactNode;
  title: string;
}

export const AppShell = ({ children, title }: AppShellProps) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showSidebar = isDesktop || (isTablet && !mobileMenuOpen) || mobileMenuOpen;
  
  return (
    <View style={styles.container}>
      {showSidebar && (
        <View style={[
          styles.sidebarWrapper, 
          !isDesktop && styles.sidebarWrapperMobile,
          mobileMenuOpen && styles.sidebarMobileOpen
        ]}>
          <Sidebar />
          {!isDesktop && mobileMenuOpen && (
             <Pressable style={styles.closeMenuBtn} onPress={() => setMobileMenuOpen(false)}>
               <X size={24} color={theme.colors.text.primary} />
             </Pressable>
          )}
        </View>
      )}

      {/* Backdrop for mobile */}
      {!isDesktop && mobileMenuOpen && (
        <Pressable 
          style={styles.backdrop} 
          onPress={() => setMobileMenuOpen(false)} 
        />
      )}

      <View style={styles.main}>
        <View style={styles.headerContainer}>
           {!isDesktop && (
             <Pressable style={styles.menuBtn} onPress={() => setMobileMenuOpen(true)}>
               <Menu size={24} color={theme.colors.text.primary} />
             </Pressable>
           )}
           <View style={{ flex: 1 }}>
             <Header title={title} />
           </View>
        </View>
        <View style={styles.content}>
          <View style={styles.contentInner}>
            {children}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
  },
  sidebarWrapper: {
    zIndex: 100,
  },
  sidebarWrapperMobile: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    transform: [{ translateX: -300 }], // visually hide by default, handled by logic
  },
  sidebarMobileOpen: {
    transform: [{ translateX: 0 }],
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  backdrop: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 90,
  },
  closeMenuBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 101,
  },
  menuBtn: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  contentInner: {
    flex: 1,
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    padding: theme.spacing.xl,
  },
});
