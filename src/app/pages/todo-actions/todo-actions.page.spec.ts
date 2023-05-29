import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoActionsPage } from './todo-actions.page';

describe('TodoActionsPage', () => {
  let component: TodoActionsPage;
  let fixture: ComponentFixture<TodoActionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodoActionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
