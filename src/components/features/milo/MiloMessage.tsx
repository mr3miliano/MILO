import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { MiloResultCard } from './MiloResultCard';
import { MiloMessage as IMiloMessage } from '../../../mocks/milo';

interface MiloMessageProps {
  message: IMiloMessage;
}

export const MiloMessage = ({ message }: MiloMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.containerUser : styles.containerMilo]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>
      )}
      
      <View style={[styles.content, isUser ? styles.contentUser : styles.contentMilo]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textMilo]}>
          {message.text}
        </Text>
        
        {message.resultType && message.resultType !== 'none' && (
          <MiloResultCard type={message.resultType} data={message.resultData} />
        )}
      </View>

      {isUser && (
        <View style={[styles.avatar, styles.avatarUser]}>
          <Text style={styles.avatarText}>D</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
    maxWidth: '85%',
  },
  containerUser: {
    alignSelf: 'flex-end',
  },
  containerMilo: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  avatarUser: {
    backgroundColor: theme.colors.secondary,
    marginLeft: theme.spacing.sm,
  },
  avatarText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
  },
  content: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  contentUser: {
    marginLeft: 0,
    alignItems: 'flex-end',
  },
  contentMilo: {
    alignItems: 'flex-start',
  },
  text: {
    fontSize: theme.typography.size.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    lineHeight: 24,
  },
  textUser: {
    backgroundColor: theme.colors.background,
    color: theme.colors.text.primary,
    borderBottomRightRadius: 4,
  },
  textMilo: {
    backgroundColor: theme.colors.primaryLight,
    color: theme.colors.primary,
    borderBottomLeftRadius: 4,
  }
});
