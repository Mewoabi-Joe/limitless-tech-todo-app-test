import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailDialogComponent } from './todo-detail-dialog.component';

describe('TodoDetailDialogComponent', () => {
  let component: TodoDetailDialogComponent;
  let fixture: ComponentFixture<TodoDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
