export interface Repository {
  id: string;
  name: string;
  provider: 'github';
  defaultBranch: string;
  lastCommit?: string;
  lastCommitAuthor?: string;
  updatedAt?: string;
  openPullRequests: number;
}

export const repositoriesMock: Repository[] = [
  {
    id: 'r1',
    name: 'Milo-GPT',
    provider: 'github',
    defaultBranch: 'main',
    lastCommit: 'feat: update dashboard',
    lastCommitAuthor: 'Daniel',
    updatedAt: 'Hace 12 minutos',
    openPullRequests: 3,
  }
];
