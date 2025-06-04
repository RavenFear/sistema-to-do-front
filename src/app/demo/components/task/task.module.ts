import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TaskRoutingModule} from './task-routing.module';
import {ListTaskComponent} from "./components/list-task/list-task.component";
import {
    CreateUpdateTaskDialogComponent
} from "./components/create-update-task-dialog/create-update-task-dialog.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TagModule} from "primeng/tag";


@NgModule({
    declarations: [ListTaskComponent, CreateUpdateTaskDialogComponent],
    exports: [
        ListTaskComponent,
        CreateUpdateTaskDialogComponent
    ],
    imports: [
        CommonModule,
        TaskRoutingModule,
        TableModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DialogModule,
        ReactiveFormsModule,
        DropdownModule,
        InputTextareaModule,
        TagModule
    ]
})
export class TaskModule {
}
