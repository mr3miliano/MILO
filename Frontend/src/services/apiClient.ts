import { ConnectorStatus, IntegrationProvider, Connector } from '../types';
import { mockApi } from './mockApi';

const BASE_URL = 'http://localhost:8000/api/v1';

export const apiClient = {
  async getTeamConnectors(teamId: string): Promise<Connector[]> {
    try {
      const response = await fetch(`${BASE_URL}/connectors/${teamId}`);
      if (!response.ok) throw new Error('Error al obtener conectores');
      const data = await response.json();
      
      return data.map((integration: any) => ({
        id: integration.id,
        provider: integration.provider as IntegrationProvider,
        status: 'connected' as ConnectorStatus,
        teamId: teamId,
        updatedAt: integration.connected_at
      }));
    } catch (error) {
      console.warn('Backend no disponible, usando Mocks para conectores...', error);
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
      
      if (!response.ok) throw new Error('Error al conectar integración');
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
      // In a real scenario we would fetch status from API. 
      // For now we mock the polling if backend isn't real.
      return mockApi.getConnectorStatus(id);
    } catch (error) {
      return mockApi.getConnectorStatus(id);
    }
  },

  async disconnectProvider(teamId: string, provider: IntegrationProvider): Promise<void> {
    try {
      // API call to DELETE /connectors/{teamId}/{provider} would go here
      return mockApi.disconnectProvider(teamId, provider);
    } catch (error) {
      return mockApi.disconnectProvider(teamId, provider);
    }
  }
};
