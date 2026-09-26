import { Team, User, Connector, IntegrationProvider } from '../types';

// Initial Mock Data
let currentUser: User = { id: 'u1', name: 'Daniel Flores', email: 'daniel@example.com', avatar: 'D', role: 'owner' };
let teams: Team[] = [
  { id: 't1', name: 'Milo Workspace', createdAt: new Date().toISOString() },
  { id: 't2', name: 'Innovathon Team', createdAt: new Date().toISOString() }
];

let connectors: Connector[] = [
  { id: 'c1', provider: 'telegram', status: 'connected', teamId: 't1', updatedAt: new Date().toISOString() },
  { id: 'c2', provider: 'gmail', status: 'disconnected', teamId: 't1', updatedAt: new Date().toISOString() },
  { id: 'c3', provider: 'drive', status: 'pending', teamId: 't1', updatedAt: new Date().toISOString() },
  { id: 'c4', provider: 'github', status: 'connected', teamId: 't1', updatedAt: new Date().toISOString() },
  { id: 'c5', provider: 'notion', status: 'error', teamId: 't1', updatedAt: new Date().toISOString() },
  { id: 'c6', provider: 'vercel', status: 'disconnected', teamId: 't1', updatedAt: new Date().toISOString() },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getCurrentUser: async (): Promise<User> => {
    await delay(300);
    return currentUser;
  },

  getTeams: async (): Promise<Team[]> => {
    await delay(300);
    return teams;
  },

  getTeamConnectors: async (teamId: string): Promise<Connector[]> => {
    await delay(500);
    return connectors.filter(c => c.teamId === teamId);
  },

  connectProvider: async (teamId: string, provider: IntegrationProvider, payload?: any): Promise<{ authUrl?: string, connector: Connector }> => {
    await delay(600);
    
    // Si ya existe, actualizamos estado
    let connector = connectors.find(c => c.teamId === teamId && c.provider === provider);
    if (!connector) {
      connector = { id: `c_${Date.now()}`, provider, status: 'pending', teamId, updatedAt: new Date().toISOString() };
      connectors.push(connector);
    } else {
      connector.status = 'pending';
    }

    if (provider === 'telegram') {
      // Telegram solo requiere payload (token), no authUrl
      return { connector };
    }

    // Otros providers requieren OAuth URL
    return {
      authUrl: `https://mock-oauth.com/auth?provider=${provider}&teamId=${teamId}`,
      connector
    };
  },

  getConnectorStatus: async (id: string): Promise<Connector> => {
    await delay(300);
    const connector = connectors.find(c => c.id === id);
    if (!connector) throw new Error("Connector not found");

    // Simulador de polling: si está en pending, 50% de probabilidad de pasar a connected (solo para simular el proceso de polling)
    if (connector.status === 'pending') {
      if (Math.random() > 0.5) {
        connector.status = 'connected';
      }
    }
    
    return connector;
  },

  disconnectProvider: async (teamId: string, provider: IntegrationProvider): Promise<void> => {
    await delay(600);
    const index = connectors.findIndex(c => c.teamId === teamId && c.provider === provider);
    if (index !== -1) {
      connectors[index].status = 'disconnected';
    }
  }
};
