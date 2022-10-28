import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
@Component({
  selector: 'app-schedule-component',
  templateUrl: './schedule-component.component.html',
  styleUrls: ['./schedule-component.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponentComponent implements OnInit {

  events!: any[];

  options: any;
  theCheckbox: boolean = false;
  constructor() {}

  ngOnInit() {
    let draggableEl:any = document.getElementById('external-events');
    var self = this;

    new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: function(eventEl: any) {
        console.log(eventEl);
        if (self.theCheckbox) {
          eventEl.parentNode.removeChild(eventEl);
        }
        return {
          title: eventEl.innerText
        };
      }
    });

    this.events = [
      {
        id: 1,
        title: 'All Day Event',
        start: '2017-02-01'
      },
      {
        id: 2,
        title: 'Long Event',
        start: '2017-02-07',
        end: '2017-02-10'
      },
      {
        id: 3,
        title: 'Repeating Event',
        start: '2017-02-09T16:00:00'
      }
    ];

    // this.scheduleService.getEvents().then(events => {
    //   this.events = events;
    // });

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2017-02-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true
    };
  }

}
