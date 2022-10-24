import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalTeacherComponent } from 'src/app/components/modal-teacher/modal-teacher.component';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/service/teacher.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  modalRef: MdbModalRef<ModalTeacherComponent> | null = null;
  config = {
    animation: true,
    backdrop: true,
    data: {
      title: '',
      body: {}
    },
    ignoreBackdropClick: true,
    keyboard: true,
    modalClass: 'modal-top-center'
  }
  teachers: Teacher[] = [];
  teacher: Teacher = {
    id: 0,
    name: '',
    lastName: '',
    typeDocument: '',
    document: '',
    genre: '',
    address: '',
    academicLevel: '',
    dateOfBirth: ''
  };

  constructor(private _teacherService: TeacherService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  /**
   * open modal for create teacher
   */
  openModalCreateTeacher(data: Teacher | {}) {
    this.config.data.title = 'Guardar datos del docente';
    this.config.data.body = data;
    this.modalRef = this.modalService.open(ModalTeacherComponent, this.config);
    this.modalRef.onClose.subscribe(data => {
      if(data !== null)
        this.createTeacher(data);
    });
  }

  /**
   * open modal for update teacher
   * @param data Teacher
   */
  openModalUpdateTeacher(id: number) {
    this.getTeacherById(id);
    this.config.data.title = 'Actualizar datos del docente';
    this.config.data.body = this.teacher;
    this.modalRef = this.modalService.open(ModalTeacherComponent, this.config);
    this.modalRef.onClose.subscribe((data) => {
      if(data !== null)
        this.updateTeachers(id, data);
    });
  }

  /**
   * find teacher
   * 
   * @param id 
   */
   getTeacherById(id: number){
    this._teacherService.getByIdTeacher(id).subscribe((response: Teacher) => {
      this.teacher = response;
    })
  }

  /**
   * get all teacher
   */
  private getAllTeachers(){
    this._teacherService.getAllTeachers().subscribe((response: Teacher[]) => {
      this.teachers = response;
    })
  }

  /**
   * create teacher
   * 
   * @param data Teacher
   */
  private createTeacher(data: Teacher){
    this._teacherService.createTeacher(data).subscribe((response: any) => {
      if(response.statusCode === 201){
        this.showSuccessMessage(response.message)
        this.getAllTeachers();
      }
    }, errResponse => {
      console.log(errResponse)
      if(errResponse?.status === 400)
        this.showValidationMessage(data, errResponse.error.fieldErrors);
    })
  }

  /**
   * update teacher
   * 
   * @param id 
   * @param data Teacher
   */
  private updateTeachers(id: number, data: Teacher){
    this._teacherService.updateTeacher(id, data).subscribe((response: any) => {
      if(response.statusCode === 201){
        this.showSuccessMessage(response.message)
        this.getAllTeachers();
      }
    }, errResponse => {
      console.log(errResponse)
      if(errResponse?.status === 400)
        this.showValidationMessage(data, errResponse.error.fieldErrors);
    })
  }

  /**
   * show successful message
   * @param message 
   */
  private showSuccessMessage(message: string){
    swal.fire({position: 'top-end', icon: 'success', title: message, showConfirmButton: false, timer: 1500})
  }

  /**
   * show error message
   * 
   * @param fieldErrors 
   */
  private showValidationMessage(data: Teacher, fieldErrors: any[]){
    let text = '';
    fieldErrors.forEach(element => {
      text += `<p>${element.field}: ${element.message}<p>`
    });

    swal.fire({icon: 'error', title: 'Mala petición', html: text, backdrop: false})
    .then((result) => {
      if (result.isConfirmed) 
        this.openModalCreateTeacher(data);
    })
  }

}
