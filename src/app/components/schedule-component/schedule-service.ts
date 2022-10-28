import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http
      .get('seed.json')
      .toPromise()
      .then(res => <any[]>res)
      .then(data => {
        return data;
      });


  }
}
