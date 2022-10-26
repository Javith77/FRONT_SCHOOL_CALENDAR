import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private API_URL = environment.API_STUDENT;

  constructor(private http: HttpClient) { }

  createStudent(data: Student){
    return this.http.post(`${this.API_URL}`, data);
  }

  updateStudent(id: number, data: Student){
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  updateCourseAssignmentsToStudents(idCourse: number, data: any){
    return this.http.put(`${this.API_URL}/course/assignments/${idCourse}`, data);
  }

  getStudentById(id: number): Observable<Student>{
    return this.http.get<Student>(`${this.API_URL}/${id}`);
  }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.API_URL}`);
  }

  getUnassignedStudentsInCourse(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.API_URL}/unassigned/course`);
  }

}
