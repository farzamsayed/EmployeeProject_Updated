import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private activeModal: NgbActiveModal,
    private departmentService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.getDepartmentsDetails();
    this.getEmployeeById();
  }

  getDepartmentsDetails(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (departments: Department[]) => {
        this.depts = departments;
      },
    });
  }

  getEmployeeById(): void {
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
