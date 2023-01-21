import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo';

interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @Input() notCompletedTodos: Todo[] = [];
  @Input() completedTodos: Todo[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.notCompletedTodos);
    }, 3000);
  }
}
