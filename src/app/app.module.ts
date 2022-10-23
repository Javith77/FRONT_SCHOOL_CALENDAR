import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//compoenents
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TeachersComponent } from './page/teachers/teachers.component';
import { StudentComponents } from './page/students/students.component';
import { ScheduleComponent } from './page/schedule/schedule.component';
import { HomeComponent } from './page/home/home.component';
import { ModalTeacherComponent } from './components/modal-teacher/modal-teacher.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesComponent } from './page/courses/courses.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    NavbarComponent,
    TeachersComponent,
    StudentComponents,
    ScheduleComponent,
    HomeComponent,
    ModalTeacherComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MdbFormsModule,
    MdbModalModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MdbValidationModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
