import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { firstValueFrom, Observable } from 'rxjs';
import { ModalStudentComponent } from 'src/app/components/modal-student/modal-student.component';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import SwalAlertUtil from 'src/app/util/swal-alert-util';
import swal from'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentComponents implements OnInit {

  modalRef: MdbModalRef<ModalStudentComponent> | null = null;
  students: Student[] = [];

  constructor(
    private _studentService: StudentService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  /**
   * open modal for create Student
   */
  async openModalCreateStudent(data?: Student) {
    const title = 'Guardar datos del estudiante';
    this.modalRef = this.modalService.open(ModalStudentComponent, {
      ignoreBackdropClick: true,
      data: {
        title,
        studentData: data,
      }
    });
    this.modalRef.onClose.subscribe(data => {
      if(data !== null)
        this.createStudent(data);
    });
  }

  /**
   * open modal for update Student
   * @param data Student
   */
  async openModalUpdateStudent(id: number) {
    const title = 'Actualizar datos del estudiante²³³¤¤€';
    let data = await firstValueFrom(this.getStudentById(id));
    this.modalRef = this.modalService.open(ModalStudentComponent, {
      ignoreBackdropClick: true,
      data: {
        title,
        studentData: data,
      }
    });
    this.modalRef.onClose.subscribe((result) => {
      if(result !== null)
        this.updateStudents(id, result);
    });
  }

  /**
   * get style class badge
   * 
   * @returns 
   */
  getStyleClass(index: number): string{
    const styleClass = ['primary','secundary','success','warning','Info'];
    if(index <= styleClass.length -1){
      return styleClass[index];
    }

    return styleClass[0];
  }

  /**
   * find Student
   * 
   * @param id 
   */
  private getStudentById(id: number): Observable<Student>{
    return this._studentService.getStudentById(id);
  }

  /**
   * get all Student
   */
  private getAllStudents(){
    this._studentService.getAllStudents().subscribe({
      next: response => {
        this.students = response
      }
    })
  }


  /**
   * create Student
   * 
   * @param data Student
   */
  private createStudent(data: Student){
    this._studentService.createStudent(data).subscribe({
      next: (response: any) => {
        if(response.statusCode === 201){
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllStudents();
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
   * update Student
   * 
   * @param id 
   * @param data Student
   */
  private updateStudents(id: number, data: Student){
    this._studentService.updateStudent(id, data).subscribe({
      next: (response: any) => {
        if(response.statusCode === 201){
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllStudents();
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
  private showValidationMessage(data: Student, fieldErrors: any[]){
    let text = '';
    fieldErrors.forEach(element => {
      text += `<p>${element.field}: ${element.message}<p>`
    });

    swal.fire({icon: 'error', title: 'Mala petición', html: text, backdrop: false})
    .then((result) => {
      if (result.isConfirmed) 
          console.log(data.id)
        if(data.id === undefined){
          this.openModalCreateStudent(data);
        }else{
          this.openModalUpdateStudent(data.id);
        }
    })
  }

}
