import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { timeInterval } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoWithAction } from 'src/app/models/todoWithAction';
import { TodoFromForm } from 'src/app/models/todoWithTimeProp';

@Component({
  selector: 'app-todo-detail-dialog',
  templateUrl: './todo-detail-dialog.component.html',
  styleUrls: ['./todo-detail-dialog.component.css'],
})
export class TodoDetailDialogComponent {
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: 'white',
      buttonColor: '#4758B8',
    },
    dial: {
      dialBackgroundColor: '#4758B8',
    },
    clockFace: {
      clockFaceBackgroundColor: '#ccc',
      clockHandColor: '#4758B8',
      clockFaceTimeInactiveColor: 'white',
    },
  };

  todo: TodoWithAction = {
    title: '',
    description: '',
    date: new Date(),
    priority: 'low',
    isCompleted: false,
    action: 'delete',
  };

  isDisabled = true;

  constructor(
    public dialogRef: MatDialogRef<TodoDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {
    this.todo = {
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date.toDate(),
      priority: data.priority,
      isCompleted: data.isCompleted,
      time: this.getTimeString(data.date.toDate()),
    };
    console.log('this.todo', this.todo);
  }

  getTimeString(date: Date): string {
    let options = { hour: 'numeric', minute: 'numeric', hour12: true };
    let timeString = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
    return timeString;
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onEditClick() {
    this.isDisabled = !this.isDisabled;
    this.todo.action = 'update';
  }
}
