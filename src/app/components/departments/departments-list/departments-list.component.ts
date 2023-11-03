import { DepartmentsService } from 'src/app/services/departments.service';
import { Department } from './../../../models/department.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { ViewDepartmentComponent } from '../view-department/view-department.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
})
export class DepartmentsListComponent implements OnInit {
  departments: Department[] = [];
  dataToSendToModal: Department = {
    id: '',
    deptName: '',
  };

  constructor(
    private departmentsService: DepartmentsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments(): void {
    this.departmentsService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (response) => console.error(response),
    });
  }

  getDepartmentById(id: string): void {
    this.departmentsService.getDepartment(id).subscribe({
      next: (department) => {
        this.dataToSendToModal.id = department.id;
        this.dataToSendToModal.deptName = department.deptName;
      },
      error: (response) => {
        console.error(response);
      },
    });
  }

  deleteDepartment(id: string) {
    this.departmentsService.deleteDepartment(id).subscribe({
      next: (response) => {
        location.reload();
      },
    });
  }

  openDepartmentAddModal() {
    const modalRef = this.modalService.open(AddDepartmentComponent, {
      size: 'md',
    });
  }

  openDepartmentEditModal(id: any) {
    this.getDepartmentById(id);
    const modalRef = this.modalService.open(EditDepartmentComponent, {
      size: 'md',
    });
    modalRef.componentInstance.dataFromParent = this.dataToSendToModal;
  }

  openDepartmentViewModal(id: any) {
    this.getDepartmentById(id);
    const modalRef = this.modalService.open(ViewDepartmentComponent, {
      size: 'md',
    });
    modalRef.componentInstance.dataFromParent = this.dataToSendToModal;
  }
}
