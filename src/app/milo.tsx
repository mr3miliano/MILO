import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppShell } from '../components/layout/AppShell';
import { theme } from '../theme';
import { miloChatHistory, miloInitialSuggestions, MiloMessage as IMiloMessage } from '../mocks/milo';
import { MiloMessage } from '../components/features/milo/MiloMessage';
import { MiloInput } from '../components/features/milo/MiloInput';
import { MiloSuggestion } from '../components/features/milo/MiloSuggestion';

export default function MiloScreen() {
  const [messages, setMessages] = useState<IMiloMessage[]>(miloChatHistory);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = (text: string) => {
    const newMessage: IMiloMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Simular respuesta de Milo
    setTimeout(() => {
      const miloResponse: IMiloMessage = {
        id: (Date.now() + 1).toString(),
        role: 'milo',
        text: `He recibido tu mensaje: "${text}". Aún estoy aprendiendo a responder a nuevas consultas, ¡pero pronto podré ayudarte con esto!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        resultType: 'none'
      };
      setMessages(prev => [...prev, miloResponse]);
    }, 1000);
  };

  return (
    <AppShell title="Milo">
      <View style={styles.container}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatArea} 
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(msg => (
            <MiloMessage key={msg.id} message={msg} />
          ))}
        </ScrollView>

        <View style={styles.bottomArea}>
          {messages.length <= 5 && (
            <View style={styles.suggestionsContainer}>
              {miloInitialSuggestions.map((suggestion, index) => (
                <MiloSuggestion 
                  key={index} 
                  text={suggestion} 
                  onPress={handleSend} 
                />
              ))}
            </View>
          )}
          
          <MiloInput onSend={handleSend} />
        </View>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    height: '100%',
  },
  chatArea: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  chatContent: {
    paddingBottom: theme.spacing.xl,
  },
  bottomArea: {
    padding: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  }
});
