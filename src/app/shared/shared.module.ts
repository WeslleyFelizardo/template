import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AgGridModule } from 'ag-grid-angular';
import { ActionRendererComponent } from './components/action-render.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ActionRendererComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatIconModule

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        AgGridModule,
        ActionRendererComponent
    ]
})
export class SharedModule
{
}
