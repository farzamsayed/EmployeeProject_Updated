import { DepartmentsService } from 'src/app/services/departments.service';
import { Department } from './../../../models/department.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
})
export class DepartmentsListComponent implements OnInit {
  departments: Department[] = [];

  constructor(
    private departmentsService: DepartmentsService,
    private router: Router
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

  deleteDepartment(id: string) {
    this.departmentsService.deleteDepartment(id).subscribe({
      next: (response) => {
        this.router.navigate(['departments']);
      },
    });
  }
  
}
