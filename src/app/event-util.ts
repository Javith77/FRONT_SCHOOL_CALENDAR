import { EventInput } from '@fullcalendar/web-component';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  { id: '1', resourceId: 'b', start: '2022-10-30T08:03:00.539+00:00', end: '2022-10-30T12:03:00.539+00:00', title: 'event 1' },
      { id: '2', resourceId: 'c', start: '2022-10-27T05:00:00', end: '2022-10-27T22:00:00', title: 'event 2' },
      { id: '3', resourceId: 'd', start: '2022-10-26', end: '2022-10-26', title: 'event 3' },
      { id: '4', resourceId: 'e', start: '2022-10-28T03:00:00', end: '2022-10-28T08:00:00', title: 'event 4' },
      { id: '5', resourceId: 'f', start: '2022-10-28T00:30:00', end: '2022-10-28T02:30:00', title: 'event 5'  },
      {
        title:"Repeticion event",
        start: '10:00',
        end: '14:00',        
        dow: [ 1, 4 ] // Repetir Lunes y Jueves
    }
];

export function createEventId() {
  return String(eventGuid++);
}