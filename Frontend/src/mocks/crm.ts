export interface CRMContact {
  id: string;
  name: string;
  company: string;
  email: string;
  status: 'lead' | 'customer' | 'churned';
  lastContact: string;
}

export interface CRMDeal {
  id: string;
  title: string;
  company: string;
  amount: number;
  stage: 'discovery' | 'proposal' | 'negotiation' | 'won' | 'lost';
  probability: number;
}

export const crmContactsMock: CRMContact[] = [
  { id: 'c1', name: 'Laura Gómez', company: 'TechNova', email: 'laura@technova.com', status: 'customer', lastContact: 'Hace 2 días' },
  { id: 'c2', name: 'Roberto Díaz', company: 'Global Corp', email: 'roberto@global.com', status: 'lead', lastContact: 'Ayer' },
  { id: 'c3', name: 'María Silva', company: 'StartUp Inc', email: 'maria@startup.com', status: 'lead', lastContact: 'Hoy' },
];

export const crmDealsMock: CRMDeal[] = [
  { id: 'd1', title: 'Renovación Licencias', company: 'TechNova', amount: 15000, stage: 'negotiation', probability: 80 },
  { id: 'd2', title: 'Plan Enterprise', company: 'Global Corp', amount: 45000, stage: 'proposal', probability: 50 },
  { id: 'd3', title: 'Piloto Inicial', company: 'StartUp Inc', amount: 5000, stage: 'discovery', probability: 20 },
];
