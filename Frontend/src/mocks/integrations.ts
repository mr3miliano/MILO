export interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  iconName: string;
}

export const integrationsMock: Integration[] = [
  { id: 'i1', name: 'Google Drive', description: 'Accede y busca en todos los documentos de tu equipo.', connected: true, iconName: 'hard-drive' },
  { id: 'i2', name: 'GitHub', description: 'Conecta repositorios para ver commits y PRs en el activity feed.', connected: true, iconName: 'github' },
  { id: 'i3', name: 'Slack', description: 'Recibe notificaciones y envía mensajes desde Milo.', connected: false, iconName: 'message-circle' },
  { id: 'i4', name: 'Microsoft Teams', description: 'Integra tus canales de comunicación.', connected: false, iconName: 'users' },
  { id: 'i5', name: 'WhatsApp', description: 'Comunícate con clientes directamente desde el CRM.', connected: false, iconName: 'phone' },
];
