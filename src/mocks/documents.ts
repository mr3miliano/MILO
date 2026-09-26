export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'sheet' | 'slide';
  date: string;
  author: string;
  status: 'draft' | 'final' | 'archived';
}

export const documentsMock: Document[] = [
  {
    id: 'd1',
    name: 'Contrato ACME v2',
    type: 'pdf',
    date: '2023-11-10',
    author: 'Ana',
    status: 'final',
  },
  {
    id: 'd2',
    name: 'Proyecciones Financieras Q4',
    type: 'sheet',
    date: '2023-11-08',
    author: 'Carlos',
    status: 'draft',
  },
  {
    id: 'd3',
    name: 'Pitch Deck Inversionistas',
    type: 'slide',
    date: '2023-11-05',
    author: 'Daniel',
    status: 'final',
  },
  {
    id: 'd4',
    name: 'Requerimientos de Producto (PRD)',
    type: 'doc',
    date: '2023-10-25',
    author: 'Ana',
    status: 'final',
  }
];
