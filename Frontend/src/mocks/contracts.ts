export interface Contract {
  id: string;
  name: string;
  company: string;
  status: 'active' | 'pending' | 'expired';
  date: string;
  responsible: string;
}

export const contractsMock: Contract[] = [
  { id: 'ct1', name: 'Contrato de Servicios Anual', company: 'TechNova', status: 'active', date: '2023-01-15', responsible: 'Ana' },
  { id: 'ct2', name: 'Acuerdo de Confidencialidad', company: 'Global Corp', status: 'pending', date: '2023-11-20', responsible: 'Daniel' },
  { id: 'ct3', name: 'Contrato de Soporte', company: 'Acme LLC', status: 'expired', date: '2022-10-01', responsible: 'Carlos' },
];
