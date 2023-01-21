import { Todo } from './todo';

export interface TodoWithAction {
  id?: string;
  title: string;
  description: string;
  date: Date;
  priority: string;
  isCompleted: boolean;
  time?: any;
  action?: string;
}
