import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Modal } from 'react-native';
import { theme } from '../../../theme';
import { Send, X } from 'lucide-react-native';

interface TelegramTokenModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (token: string) => void;
}

export const TelegramTokenModal = ({ visible, onClose, onSubmit }: TelegramTokenModalProps) => {
  const [token, setToken] = useState('');

  const handleSubmit = () => {
    if (token.trim()) {
      onSubmit(token.trim());
      setToken('');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Send size={20} color={theme.colors.primary} />
              <Text style={styles.title}>Conectar Telegram</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={theme.colors.text.tertiary} />
            </Pressable>
          </View>
          
          <View style={styles.body}>
            <Text style={styles.description}>
              Ingresa el token de acceso de tu bot de Telegram proporcionado por BotFather.
            </Text>
            <Text style={styles.label}>Bot Token</Text>
            <TextInput
              style={styles.input}
              placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
              placeholderTextColor={theme.colors.text.tertiary}
              value={token}
              onChangeText={setToken}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
          </View>
          
          <View style={styles.footer}>
            <Pressable style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </Pressable>
            <Pressable 
              style={[styles.btnSubmit, !token.trim() && styles.btnSubmitDisabled]} 
              onPress={handleSubmit}
              disabled={!token.trim()}
            >
              <Text style={styles.btnSubmitText}>Conectar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  modal: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    width: '100%',
    maxWidth: 500,
    ...theme.shadows.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
  },
  closeBtn: {
    padding: theme.spacing.xs,
  },
  body: {
    padding: theme.spacing.xl,
  },
  description: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  label: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.size.md,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  btnCancel: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
  btnCancelText: {
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weight.medium,
  },
  btnSubmit: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
  btnSubmitDisabled: {
    opacity: 0.5,
  },
  btnSubmitText: {
    color: theme.colors.text.inverse,
    fontWeight: theme.typography.weight.medium,
  }
});
