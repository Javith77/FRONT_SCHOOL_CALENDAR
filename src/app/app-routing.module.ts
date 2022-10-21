import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ScheduleComponent } from './page/schedule/schedule.component';
import { StudentComponent } from './page/student/student.component';
import { TeacherComponent } from './page/teacher/teacher.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'teacher', component: TeacherComponent},
  { path: 'student', component: StudentComponent},
  { path: 'schedule', component: ScheduleComponent},
  { path: '**', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
