export const currentUser = {
  id: 'u1',
  name: 'Daniel',
  email: 'daniel@example.com',
  avatar: 'D',
};

export const currentSprint = {
  id: 's1',
  name: 'Sprint 24: Lanzamiento Beta',
  progress: 72,
  completedTasks: 18,
  pendingTasks: 7,
  endDate: '2023-11-15',
};

export const recentTasks = [
  { id: 't1', title: 'Revisar flujos de onboarding', status: 'pending' },
  { id: 't2', title: 'Aprobar copy de landing page', status: 'completed' },
  { id: 't3', title: 'Reunión de sincronización de equipo', status: 'pending' },
];

export const recentActivity = [
  { id: 'a1', description: 'Ana aprobó el Pull Request #24', time: 'Hace 5 minutos' },
  { id: 'a2', description: 'Se conectó la integración con GitHub', time: 'Hace 1 hora' },
  { id: 'a3', description: 'Carlos completó la tarea "Diseño de base de datos"', time: 'Hace 4 horas' },
  { id: 'a4', description: 'Milo actualizó el resumen del sprint', time: 'Ayer' },
];
