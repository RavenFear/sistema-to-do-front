import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {TaskModel} from "../../models/task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) {
    }

    getListadoTareas(): Observable<TaskModel[]> {
        return this.http.get<TaskModel[]>(`${environment.apiUrl}/api/tasks/lista-tareas`).pipe(
            catchError((error) => {
                return throwError(() => error);
            }));
    }

    crearTarea(data: TaskModel): Observable<TaskModel> {
        return this.http.post<TaskModel>(`${environment.apiUrl}/api/tasks/crear-tarea`, data).pipe(
            catchError((error) => {
                return throwError(() => error);
            }));
    }

    editarTarea(data: TaskModel): Observable<TaskModel> {
        return this.http.put<TaskModel>(`${environment.apiUrl}/api/tasks/editar-tarea/${data.id}`, data).pipe(
            catchError((error) => {
                return throwError(() => error);
            }));
    }


    eliminarTarea(data: TaskModel): Observable<TaskModel> {
        return this.http.delete<TaskModel>(`${environment.apiUrl}/api/tasks/eliminar-tarea/${data.id}`).pipe(
            catchError((error) => {
                return throwError(() => error);
            }));
    }

}
