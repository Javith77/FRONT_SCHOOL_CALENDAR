import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalAssignCourseDataComponent } from 'src/app/components/modal-assign-course-data/modal-assign-course-data.component';
import { ModalCourseComponent } from 'src/app/components/modal-course/modal-course.component';
import { Course } from 'src/app/model/course';

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
  course: Course = {
    id: 0,
    description: '',
    students: [],
    academicSubjects: [],
    maxNumberStudents: 0
  }

  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
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
  openModalUpdateCourse(id: number) {
    this.getCourseById(id);
    this.config.data.title = 'Actualizar datos del curso';
    this.config.data.body = this.course;
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
  openModalAssignDataStudents(idCourse: number) {
    this.getStudentsByIdCourse(idCourse);
    const title  = 'Asignar estudiantes';
    const items = [{
      id: 1,
      description: 'Estudiante 1',
      isCheck: false
    },
    {
      id: 2,
      description: 'Estudiante 2',
      isCheck: false
    }];
    
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
  openModalAssignDataSubjects(idCourse: number) {
    this.getAcademicSubjectsByIdCourse(idCourse);
    const title  = 'Asignar asignaturas académicas';
    const items = [{
      id: 1,
      description: 'Materia 1',
      isCheck: false
    },
    {
      id: 2,
      description: 'Materia 2',
      isCheck: true
    }];

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


  private getCourseById(id: number){

  }

  private getStudentsByIdCourse(id: number){

  }

  private getAcademicSubjectsByIdCourse(id: number){

  }

  private createCourse(data: Course){

  }

  private updateCourse(id: number, data: Course){

  }

}
