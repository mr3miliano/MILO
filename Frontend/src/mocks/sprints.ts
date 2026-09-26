export interface Sprint {
  id: string;
  name: string;
  progress: number;
  startDate: string;
  endDate: string;
  summary: string;
  completedTasks: number;
  pendingTasks: number;
}

export const sprintsMock: Sprint[] = [
  {
    id: 's1',
    name: 'Sprint 24: Lanzamiento Beta',
    progress: 72,
    startDate: '2023-11-01',
    endDate: '2023-11-15',
    summary: 'El objetivo principal de este sprint es estabilizar las funcionalidades core del MVP, resolver los bugs de alta prioridad encontrados por los beta testers y preparar el entorno de producción para el primer release.',
    completedTasks: 18,
    pendingTasks: 7,
  }
];

export const currentSprintDetail = sprintsMock[0];
