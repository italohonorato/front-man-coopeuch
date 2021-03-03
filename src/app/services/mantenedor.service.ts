import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class MantenedorService {

  constructor(private httpClient: HttpClient) { }

  public listTasks(): Observable<Tarea[]> {

    return this.httpClient.get<Tarea[]>(`${environment.apiURL}${apiEndpoints.listTasks}`);
  }

  public saveTask(task: Tarea): Observable<Tarea> {

    return this.httpClient.post<Tarea>(`${environment.apiURL}${apiEndpoints.addTask}`, task);
  }

  public deleteTask(idTask: number): Observable<any> {

    return this.httpClient.delete<any>(`${environment.apiURL}${apiEndpoints.removeTask}${idTask}`);
  }

  public editTask(task: Tarea): Observable<Tarea> {

    return this.httpClient.put<Tarea>(`${environment.apiURL}${apiEndpoints.editTask}${task.id}`, task);
  }
}
