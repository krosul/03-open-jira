export type EntryStatus = "pending" | "inProgress" | "finished";


export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus;
}

