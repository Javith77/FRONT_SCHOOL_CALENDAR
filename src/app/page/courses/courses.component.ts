import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { firstValueFrom, Observable } from 'rxjs';
import { ModalAssignCourseDataComponent } from 'src/app/components/modal-assign-course-data/modal-assign-course-data.component';
import { ModalCourseComponent } from 'src/app/components/modal-course/modal-course.component';
import { AcademicSubject } from 'src/app/model/academic-subject';
import { Course } from 'src/app/model/course';
import { Student } from 'src/app/model/student';
import { AcademicSubjectsService } from 'src/app/service/academic-subjects.service';
import { CourseService } from 'src/app/service/course.service';
import { StudentService } from 'src/app/service/student.service';
import SwalAlertUtil from 'src/app/util/swal-alert-util';
import swal from'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  modalRef: MdbModalRef<ModalCourseComponent> | null = null;
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
  courses!: Course[];

  constructor (
    private _courseService: CourseService,
    private _studentService: StudentService,
    private _academicSubjectService: AcademicSubjectsService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  /**
   * open modal for create course
   */
   openModalCreateCourse(data: Course | {}) {
    this.config.data.title = 'Guardar datos del curso';
    this.config.data.body = data;
    this.modalRef = this.modalService.open(ModalCourseComponent, this.config);
    this.modalRef.onClose.subscribe(data => {
      if(data !== null)
        this.createCourse(data);
    });
  }

  /**
   * open modal for update course
   * 
   * @param data Course
   */
   async openModalUpdateCourse(id: number) {
    const data = await firstValueFrom(this.getCourseById(id));
    this.config.data.title = 'Actualizar datos del curso';
    this.config.data.body = data;
    this.modalRef = this.modalService.open(ModalCourseComponent, this.config);
    this.modalRef.onClose.subscribe((data) => {
      if(data !== null)
        this.updateCourse(id, data);
    });
  }

  /**
   * open modal to assign students
   * 
   * @param data Course
   */
  async openModalAssignDataStudents(idCourse: number) {
    const items = await firstValueFrom(this.getStudentsByIdCourse(idCourse));
    const title  = 'Asignar estudiantes';
    this.modalRef = this.modalService.open(ModalAssignCourseDataComponent, {
      data: {title, items},
      ignoreBackdropClick: true,
    });
    this.modalRef.onClose.subscribe((data) => {
      if(data !== null){
        console.log(data);
      }
    });
  }


  /**
   * open modal to assign subjects
   * 
   * @param data Course
   */
   async openModalAssignDataSubjects(idCourse: number) {
    const items = await firstValueFrom(this.getAcademicSubjectsByIdCourse(idCourse));
    const title  = 'Asignar asignaturas académicas';
    this.modalRef = this.modalService.open(ModalAssignCourseDataComponent, {
      data: {title, items},
      ignoreBackdropClick: true,
    });
    this.modalRef.onClose.subscribe((data) => {
      if(data !== null){
        console.log(data);
      }
    });
  }

  /**
   * get course by id
   * 
   * @param id 
   * @returns 
   */
  private getCourseById(id: number): Observable<Course>{
    return this._courseService.getCourseById(id);
  }

  /**
   * get all courses
   */
  private getAllCourses(){
    this._courseService.getAllCourses().subscribe({
      next: response => {
        this.courses = response
      }
    });
  }

  /**
   * get all students by id course
   * 
   * @param id
   */
  private getStudentsByIdCourse(id: number): Observable<Student[]>{
    return this._studentService.getStudentsByIdCourse(id);
  }

  /**
   * get all academic subjects by id course
   * 
   * @param id 
   */
  private getAcademicSubjectsByIdCourse(id: number): Observable<AcademicSubject[]>{
    return this._academicSubjectService.getAcademicSubjectsByIdCourse(id);
  }

  /**
   * create course
   * 
   * @param data Course
   */
  private createCourse(data: Course){
    this._courseService.createCourse(data).subscribe({
      next: (response: any) => {
        if(response.statusCode === 201){
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllCourses();
        }
      },
      error: (e) => {
        console.log(e)
        if(e?.status === 400)
        this.showValidationMessage(data, e.error.fieldErrors);
      },
    })
  }

  /**
   * update course
   * 
   * @param id 
   * @param data 
   */
  private updateCourse(id: number, data: Course){
    this._courseService.updateCourse(id, data).subscribe({
      next: (response: any) => {
        if(response.statusCode === 201){
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllCourses();
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
    private showValidationMessage(data: Course, fieldErrors: any[]){
      let text = '';
      fieldErrors.forEach(element => {
        text += `<p>${element.field}: ${element.message}<p>`
      });
  
      swal.fire({icon: 'error', title: 'Mala petición', html: text, backdrop: false})
      .then((result) => {
        if (result.isConfirmed) 
          this.openModalCreateCourse(data);
      })
    }
}
