import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AcademicSubject } from '../model/academic-subject';

@Injectable({
  providedIn: 'root'
})
export class AcademicSubjectsService {

  private API_URL = environment.API_ACADEMIC_SUBJECT;

  constructor(private http: HttpClient) { }

  createAcademicSubject(data: AcademicSubject){
    return this.http.post(`${this.API_URL}`, data);
  }

  updateAcademicSubject(id: number, data: AcademicSubject){
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  getAcademicSubjectById(id: number): Observable<AcademicSubject>{
    return this.http.get<AcademicSubject>(`${this.API_URL}/${id}`);
  }

  getAcademicSubjectsByIdCourse(id: number): Observable<AcademicSubject[]>{
    return this.http.get<AcademicSubject[]>(`${this.API_URL}/course/${id}`);
   }

  getAllAcademicSubjects(): Observable<AcademicSubject[]>{
    return this.http.get<AcademicSubject[]>(`${this.API_URL}`);
  }
}
