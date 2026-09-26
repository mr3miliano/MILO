import { ConnectorStatus, IntegrationProvider, Connector } from '../types';
import { mockApi } from './mockApi';

const BASE_URL = 'http://localhost:8000/api/v1';

export const apiClient = {
  /**
   * Obtiene los conectores de un equipo desde el backend
   */
  async getTeamConnectors(teamId: string): Promise<Connector[]> {
    try {
      const response = await fetch(`${BASE_URL}/connectors/${teamId}`);
      if (!response.ok) throw new Error('Error al obtener conectores');
      const data = await response.json();
      
      // Adaptar el formato del backend (Integration) al frontend (Connector)
      return data.map((integration: any) => ({
        id: integration.id,
        provider: integration.provider as IntegrationProvider,
        status: 'connected' as ConnectorStatus,
        lastSync: integration.connected_at
      }));
    } catch (error) {
      console.warn('Backend no disponible, usando Mocks para conectores...', error);
      return mockApi.getTeamConnectors(teamId);
    }
  },

  /**
   * Conecta una nueva integración
   */
  async connectIntegration(teamId: string, provider: IntegrationProvider, token: string): Promise<Connector> {
    try {
      const response = await fetch(`${BASE_URL}/connectors/${teamId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: provider,
          display_label: token, // Enviamos el token al backend
        })
      });
      
      if (!response.ok) throw new Error('Error al conectar integración');
      const data = await response.json();
      return {
        id: data.id,
        provider: data.provider as IntegrationProvider,
        status: 'connected',
        lastSync: data.connected_at
      };
    } catch (error) {
      console.warn('Backend no disponible, usando Mocks para conectar...', error);
      await mockApi.connectIntegration(teamId, provider, token);
      return {
        id: Math.random().toString(),
        provider: provider,
        status: 'connected',
        lastSync: new Date().toISOString()
      };
    }
  }
};
