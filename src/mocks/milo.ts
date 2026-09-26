import { currentSprint, recentTasks } from './home';

export type MessageRole = 'user' | 'milo';
export type ResultCardType = 'sprint' | 'task' | 'document' | 'crm' | 'integration' | 'none';

export interface MiloMessage {
  id: string;
  role: MessageRole;
  text: string;
  resultType?: ResultCardType;
  resultData?: any;
  timestamp: string;
}

export const miloInitialSuggestions = [
  "¿Cómo va nuestro sprint?",
  "¿Qué tareas tengo pendientes?",
  "Busca el contrato de ACME",
  "¿Qué pasó esta semana?"
];

export const miloChatHistory: MiloMessage[] = [
  {
    id: 'm1',
    role: 'milo',
    text: '¡Hola Daniel! Soy Milo, el asistente de tu equipo. ¿En qué te puedo ayudar hoy?',
    timestamp: '09:00',
    resultType: 'none'
  },
  {
    id: 'm2',
    role: 'user',
    text: '¿Cómo va nuestro sprint?',
    timestamp: '09:05'
  },
  {
    id: 'm3',
    role: 'milo',
    text: `El sprint "${currentSprint.name}" está al ${currentSprint.progress}% de progreso. Hemos completado ${currentSprint.completedTasks} tareas y quedan ${currentSprint.pendingTasks} pendientes.`,
    timestamp: '09:05',
    resultType: 'sprint',
    resultData: currentSprint
  },
  {
    id: 'm4',
    role: 'user',
    text: '¿Qué tareas tengo pendientes?',
    timestamp: '09:06'
  },
  {
    id: 'm5',
    role: 'milo',
    text: 'Tienes las siguientes tareas pendientes para este sprint:',
    timestamp: '09:06',
    resultType: 'task',
    resultData: recentTasks.filter(t => t.status === 'pending')
  }
];
