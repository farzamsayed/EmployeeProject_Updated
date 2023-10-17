import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css'],
})
export class ViewDepartmentComponent implements OnInit {
  departmentDetails: Department = {
    id: '',
    deptName: '',
  };

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDepartmentById();
  }

  getDepartmentById(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.departmentService.getDepartment(id).subscribe({
            next: (response) => {
              this.departmentDetails = response;
            },
            error: (response) => console.log(response),
          });
        }
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
