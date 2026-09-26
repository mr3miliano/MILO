import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

interface MiloSuggestionProps {
  text: string;
  onPress: (text: string) => void;
}

export const MiloSuggestion = ({ text, onPress }: MiloSuggestionProps) => {
  return (
    <Pressable 
      style={styles.container} 
      onPress={() => onPress(text)}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  text: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
  }
});
