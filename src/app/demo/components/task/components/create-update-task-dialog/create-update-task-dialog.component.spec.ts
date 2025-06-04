import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTaskDialogComponent } from './create-update-task-dialog.component';

describe('CreateUpdateTaskDialogComponent', () => {
  let component: CreateUpdateTaskDialogComponent;
  let fixture: ComponentFixture<CreateUpdateTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateTaskDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
