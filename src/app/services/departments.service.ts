import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import { DepartmentDto } from '../DTO/departmentdto.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseApiUrl + '/api/departments');
  }

  addDepartment(addDepartmentRequest: DepartmentDto): Observable<Department> {
    return this.http.post<Department>(
      this.baseApiUrl + '/api/departments',
      addDepartmentRequest
    );
  }

  getDepartment(id: string): Observable<Department> {
    return this.http.get<Department>(
      this.baseApiUrl + '/api/departments/' + id
    );
  }

  deleteDepartment(id: string): Observable<Department> {
    return this.http.delete<Department>(
      this.baseApiUrl + '/api/departments/' + id
    );
  }

  updateDepartment(
    id: string,
    updateDepartmentRequest: Department
  ): Observable<Department> {
    return this.http.put<Department>(
      this.baseApiUrl + '/api/departments/' + id,
      updateDepartmentRequest
    );
  }
}
