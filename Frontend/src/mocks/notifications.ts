export interface Notification {
  id: string;
  type: 'task' | 'pull_request' | 'message' | 'sprint' | 'document';
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
}

export const notificationsMock: Notification[] = [
  {
    id: 'n1',
    type: 'pull_request',
    title: 'Nuevo Pull Request',
    description: 'Daniel creó PR #24',
    read: false,
    createdAt: 'Hace 5 min',
  },
  {
    id: 'n2',
    type: 'task',
    title: 'Nueva tarea',
    description: 'Te asignaron "Actualizar documentación"',
    read: false,
    createdAt: 'Hace 1 hora',
  },
  {
    id: 'n3',
    type: 'sprint',
    title: 'Sprint',
    description: 'El sprint termina en 2 días',
    read: true,
    createdAt: 'Ayer',
  }
];
