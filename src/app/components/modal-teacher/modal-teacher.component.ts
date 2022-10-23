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

  title: string  | undefined;
  body: Teacher  | undefined;
  typeDocument: string | undefined;
  form!: FormGroup;
  isSubmit = false;
  genre: string = 'M';

  @Output() eventSaveData = new EventEmitter<string>();

  constructor(public modalRef: MdbModalRef<ModalTeacherComponent>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm(this.body);
  }

  /**
   * create Form
   * 
   * @param data Teacher or undefined
   */
  createForm(data: Teacher | undefined){
    this.form = this.fb.group({
      name: [data?.name, Validators.required],
      lastName: [data?.lastName, Validators.required],
      typeDocument: [data? data.typeDocument : 'Cédula de ciudadanía', Validators.required],
      document: [data?.document, Validators.required],
      genre: [data? data.genre : this.genre],
      address: [data?.address, Validators.required],
      academicLevel: [data?.academicLevel, Validators.required],
      dateOfBirth: [new Date('1997-10-26T00:00:00Z') , Validators.required],
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
    this.isSubmit = true;
    this.form.value.genre = this.genre;
    console.log(this.form)
    
    if (!this.form?.valid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.closeModal(this.form.value)
  }


}
