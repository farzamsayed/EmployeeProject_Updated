import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent implements OnInit {
  departmentDetails: Department = {
    id: '',
    deptName: '',
  };

  @Input() dataFromParent: Department;

  constructor(
    private departmentService: DepartmentsService,
    private router: Router,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  updateDepartment() {
    this.departmentService
      .updateDepartment(this.departmentDetails.id, this.departmentDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['departments']);
        },
      });
  }

  closeModal() {
    this.activeModal.close();
  }
}
