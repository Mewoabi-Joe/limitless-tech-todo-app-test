import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-todo-dialog',
  templateUrl: './delete-todo-dialog.component.html',
  styleUrls: ['./delete-todo-dialog.component.css'],
})
export class DeleteTodoDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteTodoDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
