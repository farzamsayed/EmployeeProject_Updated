import { DepartmentsService } from 'src/app/services/departments.service';
import { Department } from './../../../models/department.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
})
export class DepartmentsListComponent implements OnInit {
  departments: Department[] = [];

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    this.departmentsService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (response) => console.error(response),
    });
  }
}
