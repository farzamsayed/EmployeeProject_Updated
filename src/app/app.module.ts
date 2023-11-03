import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { DepartmentsListComponent } from './components/departments/departments-list/departments-list.component';
import { AddDepartmentComponent } from './components/departments/add-department/add-department.component';
import { EditDepartmentComponent } from './components/departments/edit-department/edit-department.component';
import { NoComponentComponent } from './components/no-component/no-component.component';
import { ViewEmployeeComponent } from './components/employees/view-employee/view-employee.component';
import { ViewDepartmentComponent } from './components/departments/view-department/view-department.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { eyeFill, pencilSquare, trash3Fill } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const icons = {
  eyeFill,
  pencilSquare,
  trash3Fill,
};

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    DepartmentsListComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    NoComponentComponent,
    ViewEmployeeComponent,
    ViewDepartmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(icons),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
