import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private departmentService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeesService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (response) => console.error(response),
    });

    this.departmentService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;

      this.employees.forEach((employee) => {
        const department = this.departments.find(
          (dept) => dept.id === employee.departmentId
        );
        if (department) {
          employee.departmentName = department.deptName;
        }
      });
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
}
