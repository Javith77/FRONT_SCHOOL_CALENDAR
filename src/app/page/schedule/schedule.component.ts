import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { defineFullCalendarElement, CalendarOptions, EventClickArg, EventApi, DateSelectArg, EventInput } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
// a premium plugin
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import adaptivePlugin from '@fullcalendar/adaptive'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import esLocale from '@fullcalendar/core/locales/es'
import { createEventId, INITIAL_EVENTS } from 'src/app/event-util';
import { CourseService } from 'src/app/service/course.service';
import { Course } from 'src/app/model/course';
import { AcademicSubjectsService } from 'src/app/service/academic-subjects.service';
import { firstValueFrom, Observable } from 'rxjs';
import { AcademicSubject } from 'src/app/model/academic-subject';
import { ModalScheduleComponent } from 'src/app/components/modal-schedule/modal-schedule.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Schedule } from 'src/app/model/schedule';
import { ScheduleService } from 'src/app/service/schedule.service';
import SwalAlertUtil from 'src/app/util/swal-alert-util';
import { Calendar } from '@fullcalendar/core';
declare var $: any;

// make the <full-calendar> element globally available by calling this function at the top-level
defineFullCalendarElement();

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent implements OnInit {

  modalRef: MdbModalRef<ModalScheduleComponent> | null = null;
  course!: Course;
  courses!: Course[];
  academicSubjects!: AcademicSubject[];

  calendarOptions!: CalendarOptions;
  @ViewChild('mycal', { read: ElementRef }) calendar!: ElementRef;

  constructor(
    private _courseService: CourseService,
    private _scheduleService: ScheduleService,
    private _academicSubjectService: AcademicSubjectsService,
    private modalService: MdbModalService
  ) { }


  ngOnInit(): void {
    this.getAllCoursesWithtAcademicSubjectAssign();
    this.initCalendar([]);
    // this.initDraggable();
  }


  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event);
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }

  handleDateClick(arg: any) {
    console.log(arg);
  }

  handleEventDragStop(arg: any) {
    console.log("handleEventDragStop");
  }

  /**
   * change course selected
   * @param value 
   */
  changeCourse(course: any) {
    this.course = course;
    if (course === undefined) {
      this.academicSubjects = [];
      this.initCalendar([]);
      return;
    }

    this.getAcademicSubjectByCourseId(course.id);
    this.getAllScheduleByCourse(course.id);
  }

  /**
   * add academic subject to schedule
   */
  addAcademicSubjectToSchedule(item: AcademicSubject) {
    const title = `Asignar horario a ${item.description}`;

    this.modalRef = this.modalService.open(ModalScheduleComponent, {
      data: { title, item, type: 'S' },
      ignoreBackdropClick: true,
    });
    this.modalRef.onClose.subscribe((response: any) => {
      if (response !== null) {
        console.log(response);
        const schedule: Schedule = {
          id: 0,
          idAcademicSubject: item.id,
          idCourse: this.course.id,
          start: response.start,
          end: response.end,
        }
        this.createSchedule(schedule);
      }
    });
  }

  /**
   * get all schedule by course
   * @param idCourse 
   */
  private async getAllScheduleByCourse(idCourse: number) {
    let events: EventInput[] = [];
    this._scheduleService.getAllByIdCourse(idCourse).subscribe({
      next: (response) => {
        response.forEach(arg => {
          const academicSubject = this.academicSubjects.find(item => item.id === arg.idAcademicSubject);
          // const academic: AcademicSubject = await firstValueFrom(this.getAcademicSubjectById(arg.idAcademicSubject));
          events.push(
            { id: arg.id.toString(), start: arg.start, end: arg.end, title: academicSubject?.description },
          );
        });

        this.initCalendar(events);
      },
      error: e => console.log(e),
    })
  }

  /**
   * get academic subject by id
   * 
   * @param id 
   * @returns 
   */
  private getAcademicSubjectById(id: number): Observable<AcademicSubject> {
    return this._academicSubjectService.getAcademicSubjectById(id);
  }

  private getAllCoursesWithtAcademicSubjectAssign() {
    this._courseService.getAllCoursesWithtAcademicSubjectAssign().subscribe({
      next: response => {
        this.courses = response;
      }
    });
  }

  private getAcademicSubjectByCourseId(idCourse: number) {
    this._academicSubjectService.getAllAcademicSubjectByIdCourse(idCourse).subscribe({
      next: response => {
        this.academicSubjects = response;
      }
    });
  }

  /**
   * create course
   * 
   * @param schedule 
   */
  private createSchedule(schedule: Schedule) {
    this._scheduleService.createSchedule(schedule).subscribe({
      next: (response: any) => {
        if (response.statusCode === 201) {
          console.log(response);
          SwalAlertUtil.showSuccessMessage(response.message)
          this.getAllScheduleByCourse(schedule.idCourse);
        }
      },
      error: (e) => {
        console.log(e)
        if (e?.status === 400) { }
          SwalAlertUtil.showErrorsMessage(e.message)
      },
    })
  }

  /**
   * init calendar 
   * 
   * @param events 
   */
  private initCalendar(events: any[]) {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, resourceTimelinePlugin, bootstrap5Plugin],
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      // weekends: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      },
      initialView: 'timeGridWeek',
      scrollTime: '07:00:00', // undo default 6am scrollTime
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      },
      eventColor: '#b23cfd',
      eventBackgroundColor: '#b23cfd',
      // timeZone: 'UTC',
      aspectRatio: 2,
      locale: esLocale,
      events: events,
      eventClick: this.handleEventClick.bind(this),
    };
  }

}
