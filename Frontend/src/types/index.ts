export type IntegrationProvider =
  | 'gmail'
  | 'gmail_mcp'
  | 'drive'
  | 'github'
  | 'github_pat'
  | 'notion'
  | 'vercel'
  | 'telegram';

export type ConnectorStatus =
  | 'disconnected'
  | 'pending'
  | 'connected'
  | 'error';

export interface Connector {
  id: string;
  provider: IntegrationProvider;
  status: ConnectorStatus;
  teamId: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member';
}

export interface Team {
  id: string;
  name: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'owner' | 'admin' | 'member';
  user: User;
}
