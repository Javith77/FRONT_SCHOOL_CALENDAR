import { Component, OnInit } from '@angular/core';
import { defineFullCalendarElement, CalendarOptions, EventClickArg, EventApi, DateSelectArg } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
// a premium plugin
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import adaptivePlugin from '@fullcalendar/adaptive'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import esLocale from '@fullcalendar/core/locales/es'
import { createEventId, INITIAL_EVENTS } from 'src/app/event-util';

// make the <full-calendar> element globally available by calling this function at the top-level
defineFullCalendarElement();

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, resourceTimelinePlugin, bootstrap5Plugin],
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    // weekends: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay,resourceTimelineDay,resourceTimelineTenDay,listWeek'
    },
    resources: [
      {
        id: 'A',
        title: 'Resource A',
        type1: 10,
        type2: 55
      },
      {
        id: 'B',
        title: 'Resource B',
        type1: 12,
        type2: 60
      },
      {
        id: 'C',
        title: 'Resource C',
        type1: 12,
        type2: 50
      }
    ],
    // themeSystem: 'bootstrap5',
    initialView: 'resourceTimeline',
    scrollTime: '08:00',
    timeZone: 'UTC',
    aspectRatio: 1.8,
    locale: esLocale,
    // initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  constructor() { }

  ngOnInit(): void {
  }

  currentEvents: EventApi[] = [];

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }


}
