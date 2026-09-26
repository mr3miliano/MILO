import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { ArrowUp } from 'lucide-react-native';

interface MiloInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
}

export const MiloInput = ({ onSend, placeholder = "Envíale un mensaje a Milo..." }: MiloInputProps) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.tertiary}
        onSubmitEditing={handleSend}
        multiline={false}
      />
      <Pressable 
        style={[styles.sendButton, !value.trim() && styles.sendButtonDisabled]} 
        onPress={handleSend}
        disabled={!value.trim()}
      >
        <ArrowUp size={20} color={theme.colors.text.inverse} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    fontSize: theme.typography.size.md,
    color: theme.colors.text.primary,
    outlineStyle: 'none' as any,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.border,
  }
});
