import { ConnectorStatus, IntegrationProvider, Connector } from '../types';
import { mockApi } from './mockApi';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = {
  async sendAgentMessage(message: string, teamId: string, userId: string = '00000000-0000-0000-0000-000000000002'): Promise<string> {
    try {
      const response = await fetch(`${BASE_URL}/agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, team_id: teamId, user_id: userId, channel: 'web' })
      });
      if (!response.ok) throw new Error('Error en Milo Agent');
      const data = await response.json();
      return data.output || data.response || data.message || JSON.stringify(data);
    } catch (error) {
      console.warn('Backend fallo, usando Mocks para Milo Agent...', error);
      return `Milo (Mock): Recibi tu mensaje: '${message}'. Conecta el backend para ver la respo~esta real.`;
    }
  },

  async getTeamConnectors(teamId: string): Promise<Connector[]> {
    try {
      const response = await fetch(`${BASE_URL}/connectors/${teamId}`);
      if (!response.ok) throw new Error('Error al obtener connectores');
      const data = await response.json();
      
      return data.map((integration: any) => ({
        id: integration.id,
        provider: integration.provider as IntegrationProvider,
        status: 'connected' as ConnectorStatus,
        teamId: teamId,
        updatedAt: integration.connected_at
      }));
    } catch (error) {
      console.warn('Backend no disponible, usando Mocks para connectores...', error);
      return mockApi.getTeamConnectors(teamId);
    }
  },


  async connectProvider(teamId: string, provider: IntegrationProvider, payload?: any): Promise<{ authUrl?: string, connector: Connector }> {
    try {
      const response = await fetch(`${BASE_URL}/connectors/${teamId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: provider,
          display_label: payload?.token || 'oauth_pending',
        })
      });
      
      if (!response.ok) throw new Error('Error al conectar integracion');
      const data = await response.json();
      const connector: Connector = {
        id: data.id,
        provider: data.provider as IntegrationProvider,
        status: 'connected',
        teamId: teamId,
        updatedAt: data.connected_at
      };
      
      if (provider === 'telegram') {
        return { connector };
      }
      return { authUrl: `https://mock-oauth.com/auth?provider=${provider}&teamId=${teamId}`, connector };
    } catch (error) {
      console.warn('Backend no disponible, usando Mocks para conectar...', error);
      return mockApi.connectProvider(teamId, provider, payload);
    }
  },

  async getConnectorStatus(id: string): Promise<Connector> {
    try {
      return mockApi.getConnectorStatus(id);
    } catch (error) {
      return mockApi.getConnectorStatus(id);
    }
  },

  async disconnectProvider(teamId: string, provider: IntegrationProvider): Promise<void> {
    try {
      return mockApi.disconnectProvider(teamId, provider);
    } catch (error) {
      return mockApi.disconnectProvider(teamId, provider);
    }
  }
};
