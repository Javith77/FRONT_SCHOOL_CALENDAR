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
    this.form = this.fb.group({
      day: [null, Validators.required],
      hours: [1, Validators.required],
      time: ['07:00', Validators.required],
    });
  }

  /**
   * submit data
   * 
   * @return
   */
  onSubmit() {
    this.isSubmit = true;
    console.log(this.form.valid)
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

    this.closeModal({
      data: this.item,
      start: startDate,
      end: endDate,
    });
  }

  private getStartDate(daySelected: string) {
    let isFound = false;
    const date = new Date();

    const dayFound = date.getDay();
    //if current day is selected
    if (parseInt(daySelected) === dayFound) {
      return date;
    }

    while (!isFound) {
      date.setDate(date.getDate() + 1);
      const dayFound = date.getDay();
      if (parseInt(daySelected) === dayFound) {
        isFound = true;
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
