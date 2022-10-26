import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private API_URL = environment.API_COURSE;

  constructor(private http: HttpClient) { }

  createCourse(data: Course){
    return this.http.post(`${this.API_URL}`, data);
  }

  updateCourse(id: number, data: Course){
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  updateCourseAssignmentsToAcademicSubjects(idCourse: number, data: any): Observable<any>{
    return this.http.put(`${this.API_URL}/academic-subjects/assignments/${idCourse}`, data);
  }

  getCourseById(id: number): Observable<Course>{
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }

  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.API_URL}`);
  }

}
