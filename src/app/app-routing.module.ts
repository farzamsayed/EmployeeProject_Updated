import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { DepartmentsListComponent } from './components/departments/departments-list/departments-list.component';
import { AddDepartmentComponent } from './components/departments/add-department/add-department.component';
import { EditDepartmentComponent } from './components/departments/edit-department/edit-department.component';
import { NoComponentComponent } from './components/no-component/no-component.component';
import { ViewEmployeeComponent } from './components/employees/view-employee/view-employee.component';
import { ViewDepartmentComponent } from './components/departments/view-department/view-department.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesListComponent,
  },

  {
    path: 'employees',
    component: EmployeesListComponent,
  },

  {
    path: 'departments',
    component: DepartmentsListComponent,
  },

  {
    path: 'departments/add',
    component: AddDepartmentComponent,
  },

  {
    path: 'departments/view/:id',
    component: ViewDepartmentComponent,
  },

  {
    path: 'departments/edit/:id',
    component: EditDepartmentComponent,
  },

  {
    path: '**',
    component: NoComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
