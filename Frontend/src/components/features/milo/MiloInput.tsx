import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { theme } from '../../../theme';
import { ArrowUp, Mic, MicOff } from 'lucide-react-native';

interface MiloInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
}

export const MiloInput = ({ onSend, placeholder = "Env√≠ale un mensaje a Milo..." }: MiloInputProps) => {
  const [value, setValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const reco = new SpeechRecognition();
        reco.continuous = false;
        reco.interimResults = true;
        reco.lang = 'es-ES';

        reco.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setValue(currentTranscript);
        };

        reco.onend = () => {
          setIsRecording(false);
        };

        reco.onerror = (event: any) => {
          alert("El dictado por voz fallÛ (" + event.error + "). Usa Google Chrome y permite el micrÛfono, o escribe tu mensaje manualmente.");
          setIsRecording(false);
        };

        setRecognition(reco);
      }
    }
  }, []);

  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue('');
    }
  };

  const toggleRecording = () => {
    if (!recognition) {
      alert("El reconocimiento de voz no est√° soportado en este navegador.");
      return;
    }
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setValue('');
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.micButton, isRecording && styles.micButtonActive]} 
        onPress={toggleRecording}
      >
        {isRecording ? (
          <MicOff size={20} color={theme.colors.danger} />
        ) : (
          <Mic size={20} color={theme.colors.text.tertiary} />
        )}
      </Pressable>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={isRecording ? "Escuchando..." : placeholder}
        placeholderTextColor={isRecording ? theme.colors.danger : theme.colors.text.tertiary}
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
  micButton: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  micButtonActive: {
    backgroundColor: theme.colors.danger + '20',
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
