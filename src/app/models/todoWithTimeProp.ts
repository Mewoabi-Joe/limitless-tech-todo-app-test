import { Todo } from './todo';

export interface TodoFromForm {
  id?: string;
  title: string;
  description: string;
  date: Date;
  priority: string;
  isCompleted: boolean;
  time?: any;
}
