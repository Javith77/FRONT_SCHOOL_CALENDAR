import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { firstValueFrom, Observable } from 'rxjs';
import { ModalTeacherComponent } from 'src/app/components/modal-teacher/modal-teacher.component';
import { AcademicSubject } from 'src/app/model/academic-subject';
import { Teacher } from 'src/app/model/teacher';
import { AcademicSubjectsService } from 'src/app/service/academic-subjects.service';
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
  teachers: Teacher[] = [];

  constructor(
    private _academicSubjectService: AcademicSubjectsService,
    private _teacherService: TeacherService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  /**
   * open modal for create teacher
   */
  async openModalCreateTeacher(data?: Teacher) {
    const title = 'Guardar datos del docente';
    let academicSubjectsAssigned = data ? data.academicSubjects.map(element => element.id) : [];
    //get all academic subjects
    let academicSubjectsUnassigned = await firstValueFrom(this.getAllAcademicSubjects());

    this.modalRef = this.modalService.open(ModalTeacherComponent, {
      ignoreBackdropClick: true,
      data: {
        title,
        teacherItem: data,
        academicSubjectsAssigned,
        academicSubjectsUnassigned,
      }
    });
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
    const title = 'Actualizar datos del docente';
    let data = await firstValueFrom(this.getTeacherById(id));
    
    let academicSubjectsAssigned = data ? data.academicSubjects.map(element => element.id) : [];
    //get all academic subjects
    let academicSubjectsUnassigned = await await firstValueFrom(this.getAllAcademicSubjects());

    // this.config.data.body = data;
    this.modalRef = this.modalService.open(ModalTeacherComponent, {
      ignoreBackdropClick: true,
      data: {
        title,
        teacherItem: data,
        academicSubjectsAssigned,
        academicSubjectsUnassigned,
      }
    });
    this.modalRef.onClose.subscribe((result) => {
      if(result !== null)
        this.updateTeachers(id, result);
    });
  }

  /**
   * get style class badge
   * 
   * @returns 
   */
  getStyleClass(index: number): string{
    console.log(index)
    const styleClass = ['primary','secundary','success','warning','Info'];
    if(index <= styleClass.length -1){
      return styleClass[index];
    }

    return styleClass[0];
  }

  /**
   * find teacher
   * 
   * @param id 
   */
  private getTeacherById(id: number): Observable<Teacher>{
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
   * get all academic subjects
   */
   private getAllAcademicSubjects(): Observable<AcademicSubject[]> {
    return this._academicSubjectService.getAllAcademicSubjects();
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
        if(e?.status === 400){
          data.id == id;
          this.showValidationMessage(data, e.error.fieldErrors);
        }
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
          console.log(data.id)
        if(data.id === undefined){
          this.openModalCreateTeacher(data);
        }else{
          this.openModalUpdateTeacher(data.id);
        }
    })
  }

}
