import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeDto } from 'src/app/DTO/employeedto.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeRequest: EmployeeDto = {
    name: '',
    email: '',
    departmentId: 0,
  };

  constructor(
    private employeeService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addEmployee() {
    this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employee: Employee) => {
        console.log(employee);
        this.router.navigate(['employees']);
      },
    });
  }
}
