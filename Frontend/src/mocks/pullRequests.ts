export interface PullRequest {
  id: string;
  number: number;
  title: string;
  author: string;
  status: 'open' | 'review' | 'approved' | 'merged';
  createdAt: string;
}

export const pullRequestsMock: PullRequest[] = [
  {
    id: 'pr1',
    number: 24,
    title: 'Implement authentication',
    author: 'Daniel',
    status: 'review',
    createdAt: 'Hace 2 horas',
  },
  {
    id: 'pr2',
    number: 23,
    title: 'Fix sidebar navigation bug',
    author: 'Ana',
    status: 'approved',
    createdAt: 'Ayer',
  },
  {
    id: 'pr3',
    number: 22,
    title: 'Update canvas layout',
    author: 'Carlos',
    status: 'merged',
    createdAt: 'Hace 3 días',
  }
];
