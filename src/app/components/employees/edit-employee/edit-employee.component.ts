import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    departmentId: '',
    departmentName: '',
  };

  @Input() dataFromParent: Employee;

  depts: Department[] = [];

  nameFormControl = new FormControl('', [Validators.required]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private activeModal: NgbActiveModal,
    private departmentService: DepartmentsService
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

  getDeptIdByDeptName(deptName: string): string {
    const departmentDetails = this.depts.find(
      (dept) => dept.deptName === deptName
    );
    if (departmentDetails) return departmentDetails.id;
    return '';
  }

  updateEmployee() {
    this.dataFromParent.departmentId = this.getDeptIdByDeptName(
      this.dataFromParent.departmentName
    );
    this.employeeService
      .updateEmployee(this.dataFromParent.id, this.dataFromParent)
      .subscribe({
        next: (response) => {
          this.closeModal();
          window.location.reload();
        },
      });
  }

  closeModal() {
    this.activeModal.close();
  }
}
