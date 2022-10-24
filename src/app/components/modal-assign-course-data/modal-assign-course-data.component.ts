import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModalCourseComponent } from '../modal-course/modal-course.component';

@Component({
  selector: 'app-modal-assign-course-data',
  templateUrl: './modal-assign-course-data.component.html',
  styleUrls: ['./modal-assign-course-data.component.scss']
})
export class ModalAssignCourseDataComponent implements OnInit {

  title: string  | undefined;
  items!: any[];
  isCheckAll = false;

  constructor(public modalRef: MdbModalRef<ModalCourseComponent>) {}

  ngOnInit(): void {
  }

  checkItem(id: number){
    this.items?.forEach(element => {
      if(element.id === id)
        element.isCheck = !element.isCheck;
    });

    this.isCheckAll = (this.items) ? this.items.every(item => item.isCheck) : false;
  }

  /**
   * select/unselect all check
   */
  checkAllItems(){
    this.isCheckAll = !this.isCheckAll;
    this.items?.forEach(element => {
      element.isCheck = this.isCheckAll;
    });
  }

  /**
   * save changes
   */
  saveChanges(){
    this.closeModal(this.items);
  }

  /**
   * close modal and response data
   * 
   * @param obj 
   */
   closeModal(obj: any[] | null){
    this.modalRef.close(obj)
  }

}
