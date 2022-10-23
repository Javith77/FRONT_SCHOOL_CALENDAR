import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './page/courses/courses.component';
import { HomeComponent } from './page/home/home.component';
import { ScheduleComponent } from './page/schedule/schedule.component';
import { StudentComponents } from './page/students/students.component';
import { TeachersComponent } from './page/teachers/teachers.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'teachers', component: TeachersComponent},
  { path: 'students', component: StudentComponents},
  { path: 'schedule', component: ScheduleComponent},
  { path: '**', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
