import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import {
  onSnapshot,
  Timestamp,
  where,
  query,
  orderBy,
} from 'firebase/firestore';
import { Todo } from './models/todo';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo-app';
  notCompletedTodos: Todo[] = [];
  completedTodos: Todo[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const colRef = this.dataService.getDbParams().colRef;
    // queries

    //non completed todos
    const q1 = query(
      this.dataService.colRef,
      where('isCompleted', '==', false),
      orderBy('date')
    );

    //completed todos
    const q2 = query(
      this.dataService.colRef,
      where('isCompleted', '==', true),
      orderBy('date')
    );

    //get realtime nonCompleted todos
    onSnapshot(q1, (snapshot) => {
      this.notCompletedTodos = [];
      snapshot.docs.forEach((doc) => {
        this.notCompletedTodos.push({
          ...doc.data(),
          id: doc.id,
        });
        console.log('this.notCompletedTodos', this.notCompletedTodos);
      });
    });

    //get realtime completed todos
    onSnapshot(q2, (snapshot) => {
      this.completedTodos = [];
      snapshot.docs.forEach((doc) => {
        this.completedTodos.push({
          ...doc.data(),
          id: doc.id,
        });
      });
    });
  }
}
