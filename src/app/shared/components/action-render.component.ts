import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btp-action-render',
  template: `<div fxLayout="row">
             <div *ngIf="!multiValue">
                <mat-icon class="icon-size-5" *ngIf="!iconVisibleOnlyWithLabel || (iconVisibleOnlyWithLabel && label && label !== '' && label.length > 0)"
                        style="font-size:18px; cursor:pointer; color: rgba(0, 0, 0, 0.54) !important"
                        [inline]='true' (click)='invokeParentMethod()' svgIcon="{{icon}}"></mat-icon>{{label}}
              </div>

              <div *ngIf="multiValue && labels.length > 0">
              <mat-icon style="font-size:18px; cursor:pointer; color: rgba(0, 0, 0, 0.54) !important" [inline]='true' (click)='invokeParentMethod()'>
                    {{icon}}
                  </mat-icon>
                <span *ngFor="let l of labels">
                  {{ labels.indexOf(l) == labels.length - 1 ? l : l + ', '}}
                </span>
              </div>
             </div>`
})



export class ActionRendererComponent implements ICellRendererAngularComp {
  private params: any;
  public icon: string;
  public label = '';
  public labels = [];
  private actionMethod: string;
  public iconVisibleOnlyWithLabel = false;
  public multiValue = false;

  agInit(params: any): void {
      console.log('custom')
    this.params = params;
    if (this.params.colDef.cellRendererParams) {
      this.iconVisibleOnlyWithLabel = this.params.colDef.cellRendererParams.iconVisibleOnlyWithLabel;
      this.icon = this.params.colDef.cellRendererParams.icon ? this.params.colDef.cellRendererParams.icon : '';
      this.actionMethod = this.params.colDef.cellRendererParams.method;
      this.multiValue = this.params.colDef.cellRendererParams.multiValue ? this.params.colDef.cellRendererParams.multiValue : false;


    //   if (this.params.colDef.cellRendererParams.formatBefore && this.params.colDef.cellRendererParams.formatAfter && params.value !== null) { 
    //     const date = moment(params.value, this.params.colDef.cellRendererParams.formatBefore);

    //     if (moment('0001-01-01').format(this.params.colDef.cellRendererParams.formatAfter) != moment.utc(date).format(this.params.colDef.cellRendererParams.formatAfter)) {
    //       this.params.value = date.isValid() ? date.format(this.params.colDef.cellRendererParams.formatAfter) : ' - ';
    //     }
    //  }

      if (this.multiValue && this.params.colDef.cellRendererParams.withLabel) {
        if (!Array.isArray(this.params.value))
          this.labels = [this.params.value];
        else
          this.labels = this.params.value

      } else
        this.label = this.params.colDef.cellRendererParams.withLabel ? this.params.value : '';


    }
  }

  public invokeParentMethod() {
    this.params.context.componentParent[this.actionMethod](this.params);
  }

  refresh(): boolean {
    return false;
  }
}
