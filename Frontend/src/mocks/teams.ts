export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
  avatar: string;
  email: string;
}

export const teamMembersMock: TeamMember[] = [
  {
    id: 'u1',
    name: 'Daniel',
    role: 'Product Manager',
    status: 'online',
    avatar: 'D',
    email: 'daniel@example.com',
  },
  {
    id: 'u2',
    name: 'Ana',
    role: 'Lead Designer',
    status: 'busy',
    avatar: 'A',
    email: 'ana@example.com',
  },
  {
    id: 'u3',
    name: 'Carlos',
    role: 'Senior Developer',
    status: 'online',
    avatar: 'C',
    email: 'carlos@example.com',
  },
  {
    id: 'u4',
    name: 'Sofía',
    role: 'Marketing Specialist',
    status: 'offline',
    avatar: 'S',
    email: 'sofia@example.com',
  }
];
