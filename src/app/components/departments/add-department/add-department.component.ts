import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentDto } from 'src/app/DTO/departmentdto.model';
import { Department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  addDepartmentRequest: DepartmentDto = {
    deptName: '',
  };

  constructor(
    private departmentService: DepartmentsService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  addDepartment() {
    this.departmentService.addDepartment(this.addDepartmentRequest).subscribe({
      next: (department: Department) => {
        this.router.navigate(['departments']);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
