import {AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TaskService} from "../../../../services/task/task.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskModel} from "../../../../models/task.model";

@Component({
    selector: 'app-create-update-task-dialog',
    standalone: false,
    templateUrl: './create-update-task-dialog.component.html',
    styleUrl: './create-update-task-dialog.component.scss'
})
export class CreateUpdateTaskDialogComponent implements OnInit, AfterContentChecked {

    statusOptions = [
        {label: 'Pendiente', value: 'CREADO'},
        {label: 'En Progreso', value: 'EN_CURSO'},
        {label: 'Completado', value: 'FINALIZADO'},
    ];

    display = false;
    form: FormGroup;
    edit = false;

    @Output()
    task = new EventEmitter<TaskModel>();

    @Output()
    editTask = new EventEmitter<TaskModel>();

    constructor(private cdref: ChangeDetectorRef,
                private fb: FormBuilder,) {
    }

    ngOnInit() {
        this.createForm();
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    createForm() {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required],
            fechaRegistro: ['', Validators.required],
            fechaCompromiso: ['', Validators.required],
            status: ['', Validators.required],
        })
    }

    loadForm(task: TaskModel) {
        this.form = this.fb.group({
            id: [task.id],
            nombre: [task.nombre, Validators.required],
            descripcion: [task.descripcion, Validators.required],
            fechaRegistro: [task.fechaRegistro, Validators.required],
            fechaCompromiso: [task.fechaCompromiso, Validators.required],
            status: [task.status, Validators.required],
        })
        this.edit = true;
    }

    onHide() {
        this.form.reset();
        this.edit = false;
        this.display = false;
    }

    onSubmit() {
        if (!this.edit) {
            this.task.emit(this.form.getRawValue());
        } else {
            this.editTask.emit(this.form.getRawValue());
        }
        this.onHide();
    }

}
