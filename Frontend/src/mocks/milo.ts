import { currentSprintDetail, Sprint } from './sprints';
import { Task } from './tasks';
import { PullRequest, pullRequestsMock } from './pullRequests';
import { Repository, repositoriesMock } from './repositories';

export type MessageRole = 'user' | 'milo';

export type MiloContent = 
  | { type: 'text'; content: string }
  | { type: 'tasks'; content: Task[] }
  | { type: 'sprint'; content: Sprint }
  | { type: 'documents'; content: any[] }
  | { type: 'repository'; content: Repository }
  | { type: 'pull_requests'; content: PullRequest[] }
  | { type: 'crm'; content: any[] }
  | { type: 'contracts'; content: any[] };

export interface MiloMessage {
  id: string;
  role: MessageRole;
  text: string;
  responseContent?: MiloContent;
  timestamp: string;
}

export const miloInitialSuggestions = [
  "¿Cómo va nuestro sprint?",
  "¿Qué tareas tengo pendientes?",
  "¿Qué Pull Requests están pendientes?",
  "¿Cuál es el último commit?"
];

export const miloChatHistory: MiloMessage[] = [
  {
    id: 'm1',
    role: 'milo',
    text: '¡Hola Daniel! Soy Milo, el asistente de tu equipo. ¿En qué te puedo ayudar hoy?',
    timestamp: '09:00',
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
    text: `El sprint "${currentSprintDetail.name}" está al ${currentSprintDetail.progress}% de progreso. Hemos completado ${currentSprintDetail.completedTasks} tareas y quedan ${currentSprintDetail.pendingTasks} pendientes.`,
    timestamp: '09:05',
    responseContent: { type: 'sprint', content: currentSprintDetail }
  },
  {
    id: 'm4',
    role: 'user',
    text: '¿Qué Pull Requests están pendientes?',
    timestamp: '09:06'
  },
  {
    id: 'm5',
    role: 'milo',
    text: 'Aquí tienes los Pull Requests que requieren atención:',
    timestamp: '09:06',
    responseContent: { type: 'pull_requests', content: pullRequestsMock.filter(pr => pr.status !== 'merged') }
  }
];
