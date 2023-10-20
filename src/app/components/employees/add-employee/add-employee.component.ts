import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeDto } from 'src/app/DTO/employeedto.model';
import { Location } from '@angular/common';
import { DepartmentsService } from 'src/app/services/departments.service';
import { Department } from 'src/app/models/department.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeRequest: EmployeeDto = {
    name: '',
    email: '',
    departmentId: '',
  };

  depts: Department[] = [];
  selectedDept: string = 'department';

  constructor(
    private employeeService: EmployeesService,
    private departmentService: DepartmentsService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getDepartmentsDetails();
  }

  getDepartmentsDetails(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (departments: Department[]) => {
        this.depts = departments;
      },
    });
  }

  addEmployeeHelper() {
    const departmentDetails = this.depts.find(
      (dept) => dept.deptName === this.selectedDept
    );
    if (departmentDetails)
      this.addEmployeeRequest.departmentId = departmentDetails.id;
  }

  async addEmployee() {
    this.addEmployeeHelper();
    this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employee: Employee) => {
        this.closeModal();
        location.reload();
      },
    });
  }

  closeModal() {
    this.activeModal.close();
  }
}
