export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

export const tasksMock: Task[] = [
  {
    id: 't1',
    title: 'Revisar flujos de onboarding',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Daniel',
    dueDate: '2023-11-12',
  },
  {
    id: 't2',
    title: 'Aprobar copy de landing page',
    status: 'completed',
    priority: 'medium',
    assignee: 'Ana',
    dueDate: '2023-11-10',
  },
  {
    id: 't3',
    title: 'Reunión de sincronización de equipo',
    status: 'pending',
    priority: 'medium',
    assignee: 'Todos',
    dueDate: '2023-11-14',
  },
  {
    id: 't4',
    title: 'Diseño de base de datos para usuarios',
    status: 'completed',
    priority: 'high',
    assignee: 'Carlos',
    dueDate: '2023-11-05',
  },
  {
    id: 't5',
    title: 'Implementar autenticación con Google',
    status: 'pending',
    priority: 'high',
    assignee: 'Daniel',
    dueDate: '2023-11-15',
  }
];
