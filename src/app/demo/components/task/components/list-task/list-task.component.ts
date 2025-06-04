import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskModel} from "../../../../models/task.model";
import {Table, TableLazyLoadEvent} from "primeng/table";
import {TaskService} from "../../../../services/task/task.service";
import {CreateUpdateTaskDialogComponent} from "../create-update-task-dialog/create-update-task-dialog.component";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-list-task',
    standalone: false,
    templateUrl: './list-task.component.html',
    styleUrl: './list-task.component.scss'
})
export class ListTaskComponent implements OnInit {

    @ViewChild('dt', {static: false}) dt: Table;


    @ViewChild('cutd', {static: true}) cutd: CreateUpdateTaskDialogComponent;

    actividades: TaskModel[] = []

    totalRegistros = 0;

    loading = true;

    ngOnInit() {
        this.getActividadesLazy();
    }

    constructor(private taskService: TaskService,
                private messageService: MessageService,) {
    }

    getActividadesLazy() {
        this.loading = true;
        this.taskService.getListadoTareas().subscribe({
            next: response => {
                this.actividades = response;
                this.totalRegistros = response.length;
                this.loading = false;
            },
            error: (error: Error) => {
                console.log(error);
                this.actividades = [];
                this.loading = false;
            }
        })
    }

    onShowNuevaTarea() {
        this.cutd.display = true;
    }

    onShowEditarTarea(actividad: TaskModel) {
        this.cutd.display = true;
        this.cutd.loadForm(actividad);
    }

    onSubmit(actividad: TaskModel) {
        this.taskService.crearTarea(actividad).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'OK',
                    detail: `Se ha registrado la actividad  ${response.id}`,
                });
                this.getActividadesLazy();
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Error al registrar ${error.message}`,
                });
                console.log(error);
            }
        })


    }

    onEditarActividad(actividad: TaskModel) {
        this.taskService.editarTarea(actividad).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'OK',
                    detail: `Se ha actualizado la actividad  ${response.id}`,
                });
                this.getActividadesLazy();
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Error al actualizar ${error.message}`,
                });
                console.log(error);
            }
        })
    }

    onEliminarActividad(actividad: TaskModel) {
        this.taskService.eliminarTarea(actividad).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'OK',
                    detail: `Se ha eliminado la actividad`,
                });
                this.getActividadesLazy();
            },
            error: (error: Error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Error al eliminar ${error.message}`,
                });
                console.log(error);
            }
        })
    }


}
