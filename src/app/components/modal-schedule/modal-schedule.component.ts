import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AcademicSubject } from 'src/app/model/academic-subject';

@Component({
  selector: 'app-modal-schedule',
  templateUrl: './modal-schedule.component.html',
  styleUrls: ['./modal-schedule.component.scss']
})
export class ModalScheduleComponent implements OnInit {

  title!: string;
  form!: FormGroup;
  item!: AcademicSubject[];
  isSubmit = false;
  dateSelected: any;

  constructor(public modalRef: MdbModalRef<ModalScheduleComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(this.item);
  }

  /**
   * create Form
   * 
   * @param data Schedule
   */
  createForm(data: any) {
    const startDate = new Date();
    const endDate = this.addHoursToDate(1, startDate);
    const event = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDay(), 0, 0, 0));
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.form = this.fb.group({
      // date: [event.toLocaleDateString(undefined, options)],
      // startDate: [1, Validators.required],
      // endDate: [1, Validators.required],
      day: ['Lunes', Validators.required],
      hours: [1, Validators.required],
      time: [null, Validators.required],
    });
  }

  /**
   * submit data
   * 
   * @return
   */
  onSubmit() {
    this.isSubmit = true;
    if (!this.form?.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const arrayTime = this.form.value.time.split(':');
    const hours = arrayTime[0];
    const minute = arrayTime[1];
    const seconds = 0;

    const startDate = this.getStartDate(this.form.value.day);
    startDate?.setHours(hours, minute, seconds);
    const endDate = this.addHoursToDate(this.form.value.hours, startDate!);

    let response = {
      data: this.item,
      start: startDate,
      end: endDate,
    }

    this.closeModal(response)
  }

  private getStartDate(daySelected: string) {
    let isFound = false;
    const date = new Date();
    while (!isFound) {
      const dayFound = date.getDay();
      if (this.dayStringToDayNumber(daySelected) === dayFound) {
        isFound = true;
      } else {
        // add a day
        date.setDate(date.getDate() + 1);
      }
    }
    return date;
  }
  /**
   * add hours to current date
   * 
   * @param date 
   * @returns 
   */
  private addHoursToDate(hours: number, date: Date): Date {
    let numberOfMlSeconds = date.getTime();
    let addMlSeconds = (hours * 60) * 60000;
    let newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    return newDateObj;
  }

  private dayStringToDayNumber(day: String) {
    switch (day) {
      case 'Lunes':
        return 0;
      case 'Martes':
        return 1;
      case 'Miercoles':
        return 2;
      case 'Jueves':
        return 3;
      case 'Viernes':
        return 4;
      case 'Sabado':
        return 5;
      default:
        return 6;
    }
  }

  /**
   * close modal and response data
   * 
   * @param obj Schedule or null
   */
  closeModal(obj: any | null) {
    this.modalRef.close(obj)
  }

}
