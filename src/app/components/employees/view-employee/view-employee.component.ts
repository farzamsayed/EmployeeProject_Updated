import { DepartmentsService } from 'src/app/services/departments.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { Location } from '@angular/common';
import { Department } from 'src/app/models/department.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  @Input() dataFromParent: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private location: Location,
    private departmentService: DepartmentsService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.activeModal.close();
  }
}
