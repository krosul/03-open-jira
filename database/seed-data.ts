interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  title: string;
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      title: 'Primera tarea',
      description: 'Pendiente',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      title: 'Segunda tarea',
      description: 'En progreso',
      status: 'inProgress',
      createdAt: Date.now(),
    },
    {
      title: 'Tercera tarea',
      description: 'finalizadas',
      status: 'finished',
      createdAt: Date.now(),
    },
  ],
};
