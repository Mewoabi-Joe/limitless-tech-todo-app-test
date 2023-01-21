import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Todo } from 'src/app/models/todo';
import { TodoFromForm } from 'src/app/models/todoWithTimeProp';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.css'],
})
export class CreateTodoDialogComponent {
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

  todoFormFields: TodoFromForm = {
    title: '',
    description: '',
    date: new Date(),
    priority: 'low',
    isCompleted: false,
  };

  constructor(
    public dialogRef: MatDialogRef<CreateTodoDialogComponent> // private datePipe: DatePipe
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }

  onSave() {}
}
