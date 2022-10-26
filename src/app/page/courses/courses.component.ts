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
import swal from 'sweetalert2';

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

  constructor(
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
      if (data !== null)
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
      if (data !== null)
        this.updateCourse(id, data);
    });
  }

  /**
   * open modal to assign students
   * 
   * @param course Course
   */
  async openModalAssignDataStudents(course: Course) {
    const title = 'Asignar estudiantes';
    let items: any[] = [];

    //add students assigned to the course
    course.students.forEach(element => {
      items.push({ id: element.id, description: `${element.name} ${element.lastName}`, check: true });
    });

    //add students unassigned in the course
    (await firstValueFrom(this.getUnassignedStudentsInCourse())).forEach(element => {
      items.push({ id: element.id, description: `${element.name} ${element.lastName}`, check: false });
    });

    this.modalRef = this.modalService.open(ModalAssignCourseDataComponent, {
      data: { title, items, type: 'S' },
      ignoreBackdropClick: true,
    });
    this.modalRef.onClose.subscribe((data) => {
      if (data !== null) {
        console.log(data);
        this.updateCourseAssignmentsToStudents(course.id, data);
      }
    });
  }


  /**
   * open modal to assign subjects
   * 
   * @param data Course
   */
  async openModalAssignDataSubjects(course: Course) {
    //const items = await firstValueFrom(this.getAcademicSubjectsByIdCourse(idCourse));
    const title = 'Asignar asignaturas académicas';
    let items: any[] = [];

    //check elements assigned to the course
    (await firstValueFrom(this.getAllAcademicSubjects())).forEach(element => {
      let itemFound = course.academicSubjects.find(item => item.id === element.id);
      items.push({ id: element.id, description: element.description, check: itemFound !== undefined });
    });

    this.modalRef = this.modalService.open(ModalAssignCourseDataComponent, {
      data: { title, items, type: 'A' },
      ignoreBackdropClick: true,
    });
    this.modalRef.onClose.subscribe((data) => {
      if (data !== null) {
        this.updateCourseAssignmentsToAcademicSubjects(course.id, data);
      }
    });
  }

  /**
   * get course by id
   * 
   * @param id 
   * @returns 
   */
  private getCourseById(id: number): Observable<Course> {
    return this._courseService.getCourseById(id);
  }

  /**
   * get all courses
   */
  private getAllCourses() {
    this._courseService.getAllCourses().subscribe({
      next: response => {
        this.courses = response;
        this.courses.forEach(element => {
          element.numberStudents = element.students.length;
        })
      }
    });
  }

  /**
   * get unassigned students in courses
   */
  private getUnassignedStudentsInCourse(): Observable<Student[]> {
    return this._studentService.getUnassignedStudentsInCourse();
  }

  /**
   * get all academic subjects
   */
  private getAllAcademicSubjects(): Observable<AcademicSubject[]> {
    return this._academicSubjectService.getAllAcademicSubjects();
  }

  /**
   * create course
   * 
   * @param data Course
   */
  private createCourse(data: Course) {
    this._courseService.createCourse(data).subscribe({
      next: (response: any) => {
        if (response.statusCode === 201) {
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllCourses();
        }
      },
      error: (e) => {
        console.log(e)
        if (e?.status === 400)
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
  private updateCourse(id: number, data: Course) {
    this._courseService.updateCourse(id, data).subscribe({
      next: (response: any) => {
        if (response.statusCode === 201) {
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllCourses();
        }
      },
      error: (e) => {
        console.log(e)
        if (e?.status === 400)
          this.showValidationMessage(data, e.error.fieldErrors);
      },
    });
  }

  /**
   * assign selected students
   * unassign unselected students
   * 
   * @param data 
   */
  private updateCourseAssignmentsToStudents(idCourse: number, data: any) {
    this._studentService.updateCourseAssignmentsToStudents(idCourse, data).subscribe({
      next: (response: any) => {
        if (response.statusCode === 201) {
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllCourses();
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

   /**
   * assign selected academic subjects
   * unassign unselected academic subjects
   * 
   * @param data 
   */
    private updateCourseAssignmentsToAcademicSubjects(idCourse: number, data: any) {
      this._courseService.updateCourseAssignmentsToAcademicSubjects(idCourse, data).subscribe({
        next: (response: any) => {
          if (response.statusCode === 201) {
            SwalAlertUtil.showSuccessMessage(response.message)
            this.getAllCourses();
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

  /**
  * show error message
  * 
  * @param fieldErrors 
  */
  private showValidationMessage(data: Course, fieldErrors: any[]) {
    let text = '';
    fieldErrors.forEach(element => {
      text += `<p>${element.field}: ${element.message}<p>`
    });

    swal.fire({ icon: 'error', title: 'Mala petición', html: text, backdrop: false })
      .then((result) => {
        if (result.isConfirmed)
          this.openModalCreateCourse(data);
      })
  }
}
