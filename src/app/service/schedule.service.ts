import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private API_URL = environment.API_SCHEDULE;

  constructor(private http: HttpClient) { }

  createCourse(data: Schedule){
    return this.http.post(`${this.API_URL}`, data);
  }

  getAllByIdCourse(idCourse: number): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${this.API_URL}/course/${idCourse}`);
  }
}
