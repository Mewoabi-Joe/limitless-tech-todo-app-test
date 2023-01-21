import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { addDoc, Timestamp } from 'firebase/firestore';
import { Todo } from 'src/app/models/todo';
import { TodoFromForm } from 'src/app/models/todoWithTimeProp';
import { DataService } from 'src/app/services/data.service';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  returnedTodo?: Todo;

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  openCreateTodoDialog() {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      minWidth: '310px',
      maxWidth: '350px',
    });

    dialogRef.afterClosed().subscribe(async (result: TodoFromForm) => {
      console.log('The dialog was closed');
      console.log('result', result);
      let { time, ...rest } = result;
      this.returnedTodo = {
        ...rest,
        date: Timestamp.fromDate(this.setTime(result.date, result.time)),
      };

      // Add the returned todo to the todos in the firestore database
      try {
        await addDoc(this.dataService.getDbParams().colRef, this.returnedTodo);
      } catch (error) {
        console.log(error);
      }
    });
  }

  setTime(date: Date, time: string): Date {
    var parts = time.match(/(\d+):(\d+) (AM|PM)/);
    var hours = parseInt(parts![1]);
    var minutes = parseInt(parts![2]);
    if (parts![3] === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (parts![3] === 'AM' && hours === 12) {
      hours = 0;
    }
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }
}
