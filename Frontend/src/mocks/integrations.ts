export interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  iconName: string;
  category: 'productividad' | 'desarrollo' | 'comunicacion';
}

export const integrationsMock: Integration[] = [
  { id: 'i1', name: 'Google Drive', description: 'Accede y busca en todos los documentos de tu equipo.', connected: true, iconName: 'hard-drive', category: 'productividad' },
  { id: 'i6', name: 'Google Workspace', description: 'Conecta tu calendario y correos.', connected: false, iconName: 'calendar', category: 'productividad' },
  { id: 'i2', name: 'GitHub', description: 'Conecta repositorios para consultar información de desarrollo.', connected: true, iconName: 'github', category: 'desarrollo' },
  { id: 'i3', name: 'Slack', description: 'Permite que Milo consulte información de comunicación.', connected: false, iconName: 'message-circle', category: 'comunicacion' },
  { id: 'i4', name: 'Microsoft Teams', description: 'Integra tus canales de comunicación corporativa.', connected: false, iconName: 'users', category: 'comunicacion' },
  { id: 'i5', name: 'WhatsApp', description: 'Comunícate directamente desde el CRM.', connected: false, iconName: 'phone', category: 'comunicacion' },
  { id: 'i7', name: 'Telegram', description: 'Alertas y mensajes rápidos del equipo.', connected: false, iconName: 'send', category: 'comunicacion' },
];
