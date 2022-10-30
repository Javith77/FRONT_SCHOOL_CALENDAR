import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Student } from 'src/app/model/student';

@Component({
  selector: 'app-modal-student',
  templateUrl: './modal-student.component.html',
  styleUrls: ['./modal-student.component.scss']
})
export class ModalStudentComponent implements OnInit {

  title!: string;
  studentData!: Student;
  form!: FormGroup;
  isSubmit = false;
  genre!: string;

  constructor(public modalRef: MdbModalRef<ModalStudentComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(this.studentData);
  }


  /**
   * create Form
   * 
   * @param data Teacher or undefined
   */
  createForm(data: Student | undefined) {
    this.genre = data ? data.genre : 'M';
    this.form = this.fb.group({
      name: [data?.name, Validators.required],
      lastName: [data?.lastName, Validators.required],
      typeDocument: [data ? data.typeDocument : 'Tarjeta de identidad', Validators.required],
      document: [data?.document, Validators.required],
      genre: [data ? data.genre : this.genre],
      address: [data?.address, Validators.required],
    });
  }

  /**
  * change genre
  * 
  * @param value M or F
  */
  changeGenre(value: string) {
    this.genre = value;
  }

   /**
   * validate genre
   * 
   * @param value M or F
   * @returns boolean
   */
    getGenre(value: string){
      return this.genre ===  value;
    }

  /**
 * close modal and response data
 * 
 * @param obj Teacher or null
 */
  closeModal(obj: Student | null) {
    this.modalRef.close(obj)
  }

  /**
   * submit data
   * 
   * @returns 
   */
  onSubmit() {
    this.isSubmit = true;
    this.form.value.genre = this.genre;
    if (!this.form?.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.closeModal(this.form.value)
  }

}
