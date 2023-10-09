import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent implements OnInit {
  departmentDetails: Department = {
    id: '',
    deptName: '',
  };

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  deleteDepartment(id: string) {
    this.departmentService.deleteDepartment(id).subscribe({
      next: (response) => {
        this.router.navigate(['departments']);
      },
    });
  }

  updateDepartment() {
    this.departmentService
      .updateDepartment(this.departmentDetails.id, this.departmentDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['departments']);
        },
      });
  }
}
