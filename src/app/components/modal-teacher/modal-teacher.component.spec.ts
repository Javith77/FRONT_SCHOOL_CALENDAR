import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTeacherComponent } from './modal-teacher.component';

describe('ModalTeacherComponent', () => {
  let component: ModalTeacherComponent;
  let fixture: ComponentFixture<ModalTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
