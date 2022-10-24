import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-modal-course',
  templateUrl: './modal-course.component.html',
  styleUrls: ['./modal-course.component.scss']
})
export class ModalCourseComponent implements OnInit {

  title: string  | undefined;
  body: Course  | undefined;
  form!: FormGroup;
  isSubmit = false;

  constructor(public modalRef: MdbModalRef<ModalCourseComponent>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm(this.body);
  }

   /**
   * create Form
   * 
   * @param data Teacher or undefined
   */
    createForm(data: Course | undefined){
      this.form = this.fb.group({
        description: [data?.description, Validators.required],
      });
    }

  /**
   * submit data
   * 
   * @return
   */
  onSubmit(){
    this.isSubmit = true;
    if (!this.form?.valid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.closeModal(this.form.value)
  }

    
  /**
   * close modal and response data
   * 
   * @param obj Teacher or null
   */
  closeModal(obj: Course | null){
    this.modalRef.close(obj)
  }

}
