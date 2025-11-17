import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {TaskModel} from '../../models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private STORAGE_KEY = 'pedidos_localstorage';

    seedPedidos: TaskModel[] = [
        {
            id: 1,
            nombre: '4', // cantidad de productos o unidades
            descripcion: 'Pedido estándar con entrega en Bogotá.',
            fechaRegistro: new Date('2025-11-10'),
            fechaCompromiso: new Date('2025-11-13'),
            status: 'CREADO',
            clienteNombre: 'Carlos López',
            clienteTelefono: '3125001122',
            clienteEmail: 'carlos.lopez@email.com',
            direccionEnvio: 'Calle 19 #7-21, Bogotá',
            productos: 'Aceite CBD - 2 unidades, Vape - 2 unidades'
        },
        {
            id: 2,
            nombre: '1',
            descripcion: 'Pedido de prueba para Medellín.',
            fechaRegistro: new Date('2025-11-11'),
            fechaCompromiso: new Date('2025-11-15'),
            status: 'EN_CURSO',
            clienteNombre: 'Ana Muñoz',
            clienteTelefono: '3018895544',
            clienteEmail: 'ana.munoz@email.com',
            direccionEnvio: 'Cra 45 #63-20, Medellín',
            productos: 'Gel analgésico - 1 unidad'
        },
        {
            id: 3,
            nombre: '3',
            descripcion: 'Pedido urgente, envío express.',
            fechaRegistro: new Date('2025-11-12'),
            fechaCompromiso: new Date('2025-11-12'),
            status: 'FINALIZADO',
            clienteNombre: 'Luis Torres',
            clienteTelefono: '3102205555',
            clienteEmail: 'luis.torres@email.com',
            direccionEnvio: 'Av. Sur #44-89, Cali',
            productos: 'Tintura 1000mg - 2 unidades, Parche - 1 unidad'
        }
    ];


    constructor() {

    }

    clearStorage() {
        localStorage.removeItem('pedidos_localstorage');
    }


    getListadoTareas(): Observable<TaskModel[]> {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            // Fuerza eliminar datos anteriores y cargar iniciales (p.ej. en desarrollo)
            if (!data) {
                this.clearStorage();
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.seedPedidos));
                return of(this.seedPedidos);
            }

            const tareas = JSON.parse(data);
            return of(tareas);
        } catch (error) {
            return throwError(() => error);
        }
    }


    crearTarea(data: TaskModel): Observable<TaskModel> {
        try {
            const tareas: TaskModel[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
            data.id = new Date().getTime(); // Generar un id único de forma simple
            tareas.push(data);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tareas));
            return of(data);
        } catch (error) {
            return throwError(() => error);
        }
    }

    editarTarea(data: TaskModel): Observable<TaskModel> {
        try {
            const tareas: TaskModel[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
            const index = tareas.findIndex(t => t.id === data.id);
            if (index !== -1) {
                tareas[index] = data;
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tareas));
                return of(data);
            } else {
                return throwError(() => new Error('Tarea no encontrada'));
            }
        } catch (error) {
            return throwError(() => error);
        }
    }

    eliminarTarea(data: TaskModel): Observable<TaskModel> {
        try {
            let tareas: TaskModel[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
            tareas = tareas.filter(t => t.id !== data.id);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tareas));
            return of(data);
        } catch (error) {
            return throwError(() => error);
        }
    }
}
