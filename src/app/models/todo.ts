import { Timestamp } from 'firebase/firestore';

export interface Todo {
  id?: string;
  title: string;
  description: string;
  date: Timestamp;
  priority: string;
  isCompleted: boolean;
}
