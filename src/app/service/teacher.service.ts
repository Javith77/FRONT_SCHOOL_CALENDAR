import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from '../model/teacher';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private API_URL = environment.API_TEACHER;

  constructor(private http: HttpClient) { }

  createTeacher(data: any){
    return this.http.post(`${this.API_URL}`, data);
  }

  updateTeacher(id: number, data: any){
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  getByIdTeacher(id: number): Observable<Teacher>{
    return this.http.get<Teacher>(`${this.API_URL}/${id}`);
   }

  getAllTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${this.API_URL}`);
  }

}
