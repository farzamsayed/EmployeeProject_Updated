import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { combineLatest } from 'rxjs';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];
  selectedDept: string = 'department';

  dataToSendToModal: Employee = {
    id: '',
    name: '',
    email: '',
    departmentId: '',
    departmentName: '',
  };

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private departmentService: DepartmentsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    combineLatest([
      this.employeesService.getAllEmployees(),
      this.departmentService.getAllDepartments(),
    ]).subscribe(([employees, departments]) => {
      this.employees = employees.map((employee) => ({
        ...employee,
        departmentName:
          departments.find((d) => d.id === employee.departmentId)?.deptName ??
          '',
      }));
      this.departments = departments;
    });
  }

  deleteEmployeeHelper(id: string) {
    this.employeesService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.router.navigate(['employees']);
      },
    });
  }

  deleteEmployee(id: string) {
    this.deleteEmployeeHelper(id);
    this.employees = this.employees.filter((e) => e.id != id);
  }

  getEmployeeDepartmentName(id: string, response: Employee): string {
    const department = this.departments.find(
      (dept) => dept.id === response.departmentId
    );
    if (department) return department.deptName;
    return '';
  }

  getEmployeeById(id: any): void {
    this.employeesService.getEmployee(id).subscribe({
      next: (response) => {
        this.dataToSendToModal.id = response.id;
        this.dataToSendToModal.name = response.name;
        this.dataToSendToModal.email = response.email;
        this.dataToSendToModal.departmentId = response.departmentId;
        this.dataToSendToModal.departmentName = this.getEmployeeDepartmentName(
          id,
          response
        );
      },
      error: (response) => console.log(response),
    });
  }

  openEmployeeAddModal() {
    const modalRef = this.modalService.open(AddEmployeeComponent, {
      size: 'md',
    });
  }

  openEmployeeEditModal(id: any) {
    this.getEmployeeById(id);
    const modalRef = this.modalService.open(EditEmployeeComponent, {
      size: 'md',
    });
    modalRef.componentInstance.dataFromParent = this.dataToSendToModal;
  }

  openEmployeeViewModal(id: any) {
    this.getEmployeeById(id);
    const modalRef = this.modalService.open(ViewEmployeeComponent, {
      size: 'md',
    });
    modalRef.componentInstance.dataFromParent = this.dataToSendToModal;
  }
}
