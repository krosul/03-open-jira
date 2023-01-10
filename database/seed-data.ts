interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'En progreso',
      status: 'inProgress',
      createdAt: Date.now(),
    },
    {
      description: 'finalizadas',
      status: 'finished',
      createdAt: Date.now(),
    },
  ],
};
