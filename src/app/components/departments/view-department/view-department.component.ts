import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css'],
})
export class ViewDepartmentComponent implements OnInit {
  departmentDetails: Department = {
    id: '',
    deptName: '',
  };

  @Input() dataFromParent: Department = {
    id: '',
    deptName: '',
  };

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentsService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.activeModal.close();
  }
}
