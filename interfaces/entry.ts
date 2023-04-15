export type EntryStatus = 'pending' | 'inProgress' | 'finished';

export interface Entry {
  _id: string;
  title: string;
  description: string;
  createdAt: number;
  status: EntryStatus;
}
