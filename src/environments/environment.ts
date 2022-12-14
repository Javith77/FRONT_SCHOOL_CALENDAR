// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_TEACHER: 'http://localhost:8080/api/teachers',
  API_STUDENT: 'http://localhost:8080/api/students',
  API_COURSE: 'http://localhost:8080/api/courses',
  API_ACADEMIC_SUBJECT: 'http://localhost:8080/api/academic-subjects',
  API_SCHEDULE: 'http://localhost:8080/api/schedule',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
