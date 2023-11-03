import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  addDepartment() {
    this.departmentService.addDepartment(this.addDepartmentRequest).subscribe({
      next: (department: Department) => {
        this.closeModal();
        location.reload();
      },
    });
  }

  closeModal() {
    this.activeModal.close();
  }
}
