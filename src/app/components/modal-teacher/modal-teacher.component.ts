import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Teacher } from 'src/app/model/teacher';

@Component({
  selector: 'app-modal-teacher',
  templateUrl: './modal-teacher.component.html',
  styleUrls: ['./modal-teacher.component.scss']
})
export class ModalTeacherComponent implements OnInit {

  title!: string;
  teacherItem!: Teacher;
  academicSubjectsAssigned!: [];
  academicSubjectsUnassigned!: [];
  form!: FormGroup;
  isSubmit = false;
  genre!: string;

  constructor(public modalRef: MdbModalRef<ModalTeacherComponent>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm(this.teacherItem);
  }

  /**
   * create Form
   * 
   * @param data Teacher or undefined
   */
  createForm(data: Teacher | undefined){
    this.genre = data ? data.genre : 'M';
    this.form = this.fb.group({
      name: [data?.name, Validators.required],
      lastName: [data?.lastName, Validators.required],
      typeDocument: [data? data.typeDocument : 'Cédula de ciudadanía', Validators.required],
      document: [data?.document, Validators.required],
      genre: [data? data.genre : this.genre],
      address: [data?.address, Validators.required],
      academicLevel: [data?.academicLevel, Validators.required],
      academicSubjects:[]
    });
  }

  /**
   * change genre
   * 
   * @param value M or F
   */
  changeGenre(value: string){
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
  closeModal(obj: Teacher | null){
    this.modalRef.close(obj)
  }

  /**
   * submit data
   * 
   * @returns 
   */
  onSubmit(){
    let academicSubjects: any [] = [];
    this.academicSubjectsAssigned.forEach(element => {
      academicSubjects.push({
        id: element
      });
    })

    this.isSubmit = true;
    this.form.value.genre = this.genre;
    this.form.value.academicSubjects = academicSubjects;
    
    if (!this.form?.valid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.closeModal(this.form.value)
  }


}
