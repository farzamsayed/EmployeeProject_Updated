import { DepartmentsService } from 'src/app/services/departments.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { Location } from '@angular/common';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit {
  departments: Department[] = [];

  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    departmentId: '',
    departmentName: '',
  };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private location: Location,
    private departmentService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  getEmployeeDetails(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (response) => {
              this.employeeDetails = response;
            },
            error: (response) => console.log(response),
          });
        }
      },
    });

    this.departmentService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;
      const department = this.departments.find(
        (dept) => dept.id === this.employeeDetails.departmentId
      );
      if (department) {
        this.employeeDetails.departmentName = department.deptName;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
