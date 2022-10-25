import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { firstValueFrom, Observable } from 'rxjs';
import { ModalTeacherComponent } from 'src/app/components/modal-teacher/modal-teacher.component';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/service/teacher.service';
import SwalAlertUtil from 'src/app/util/swal-alert-util';
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
  async openModalUpdateTeacher(id: number) {
    const data = await firstValueFrom(this.getTeacherById(id));
    this.config.data.title = 'Actualizar datos del docente';
    this.config.data.body = data;
    this.modalRef = this.modalService.open(ModalTeacherComponent, this.config);
    this.modalRef.onClose.subscribe((result) => {
      if(result !== null)
        this.updateTeachers(id, result);
    });
  }

  /**
   * find teacher
   * 
   * @param id 
   */
  getTeacherById(id: number): Observable<Teacher>{
    return this._teacherService.getByIdTeacher(id);
  }

  /**
   * get all teacher
   */
  private getAllTeachers(){
    this._teacherService.getAllTeachers().subscribe({
      next: response => {
        this.teachers = response
      }
    })
  }

  /**
   * create teacher
   * 
   * @param data Teacher
   */
  private createTeacher(data: Teacher){
    this._teacherService.createTeacher(data).subscribe({
      next: (response: any) => {
        if(response.statusCode === 201){
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllTeachers();
        }
      },
      error: (e) => {
        console.log(e)
        if(e?.status === 400)
        this.showValidationMessage(data, e.error.fieldErrors);
      },
    });
  }

  /**
   * update teacher
   * 
   * @param id 
   * @param data Teacher
   */
  private updateTeachers(id: number, data: Teacher){
    this._teacherService.updateTeacher(id, data).subscribe({
      next: (response: any) => {
        if(response.statusCode === 201){
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllTeachers();
        }
      },
      error: (e) => {
        console.log(e)
        if(e?.status === 400)
        this.showValidationMessage(data, e.error.fieldErrors);
      },
    });
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
