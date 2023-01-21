import { Component, Input } from '@angular/core';
import {
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { Todo } from 'src/app/models/todo';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TodoDetailDialogComponent } from '../todo-detail-dialog/todo-detail-dialog.component';
import { TodoFromForm } from 'src/app/models/todoWithTimeProp';
import { TodoWithAction } from 'src/app/models/todoWithAction';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo?: Todo;
  @Input() isCompleted?: boolean;

  returnedTodo?: Todo;
  isClickable = false;

  constructor(
    public dialog: MatDialog,
    public confirmDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  openCreateTodoDialog() {
    const dialogRef = this.dialog.open(TodoDetailDialogComponent, {
      minWidth: '310px',
      maxWidth: '350px',
      data: this.todo,
    });
    dialogRef.afterClosed().subscribe(async (result: TodoWithAction) => {
      console.log('The dialog was closed');
      console.log('result', result);
      let { time, action, ...rest } = result;
      this.returnedTodo = {
        ...rest,
        date: Timestamp.fromDate(this.setTime(result.date, result.time)),
      };

      let docRef = doc(
        this.dataService.getDbParams().db,
        this.dataService.getDbParams().colName,
        this.returnedTodo.id!
      );

      if (action == 'update') {
        let { id, ...todoToUpdate } = this.returnedTodo;
        // Add the returned todo to the todos in the firestore database
        try {
          await updateDoc(docRef, todoToUpdate);
          this._snackBar.open(`The todo has been updated`, undefined, {
            duration: 3000,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.openConfirmDialog(docRef);
      }
    });
  }

  openConfirmDialog(docRef: any): void {
    const dialogRef = this.confirmDialog.open(DeleteTodoDialogComponent);

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await deleteDoc(docRef);
          this._snackBar.open(`The todo has been deleted`, undefined, {
            duration: 3000,
          });
        } catch (error) {
          console.log(error);
        }
      }
      // this.animal = result;
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

  onCardClick() {
    this.openCreateTodoDialog();
  }

  setBackgroundColor() {
    this.isClickable = true;
  }

  setBackgroundColorBack() {
    this.isClickable = false;
  }

  async onCheckboxChange(checked: boolean) {
    let docRef = doc(
      this.dataService.getDbParams().db,
      this.dataService.getDbParams().colName,
      this.todo?.id!
    );

    // update the todo's checked property
    try {
      await updateDoc(docRef, {
        isCompleted: checked,
      });

      //Display a snackbar on the ui
      checked
        ? this._snackBar.open(
            `The todo has been marked as Completed`,
            undefined,
            {
              duration: 3000,
            }
          )
        : this._snackBar.open(
            `The todo has been marked as not completed`,
            undefined,
            {
              duration: 3000,
            }
          );
    } catch (error) {
      console.log('error', error);
    }
  }
}
