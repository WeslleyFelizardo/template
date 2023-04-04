import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, finalize, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { WebhookService, WebhookType } from 'app/core/services/webhook.service';
import { ActionRendererComponent } from 'app/shared/components/action-render.component';
import { MatDialog } from '@angular/material/dialog';
import { PayloadViewerComponent } from './payload-viewer/payload-viewer.compoent';



@Component({
    selector       : 'logs-webhooks',
    templateUrl    : './logs-webhooks.component.html',
    styleUrls: ['./logs-webhooks.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    //changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class LogsWebhooksComponent implements OnInit, OnDestroy, AfterViewInit
{
  // @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  public table: any;
  expanded: any = {};
  public filtroFormGroup: FormGroup;
  public webhookLogs = [] ;
  public loading = false;
  public filtrarExpanded = true;

  private gridApi: any;
  public overlayLoadingTemplate: any;
  public frameworkComponents: any;
  public context: any;
  public localeText: any;
  public columns: any = [];
  public columnDef: any = [];
  public rowsAprovacaoNotaCobranca: any[] = [];
  public selectedRowsAprovacaoNotaCobranca: any[] = [];
  public rowsCount = 0;
  public filteredCount = 0;
  public allRowsSelected: any;


  rowData = [
  ];

  /**
   * Constructor
   */
  constructor(
      private _changeDetectorRef: ChangeDetectorRef,
      private _fuseConfirmationService: FuseConfirmationService,
      private _formBuilder: UntypedFormBuilder,
      //private _inventoryService: InventoryService
      private webhookService: WebhookService,
      private _matDialog: MatDialog
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
    this.columnDef = {
      sortable: true,
      resizable: true,
      filter: true,
      filterParams: {
          clearButton: true
      }
      };

  this.context = { componentParent: this };

  this.frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  this.columns = [ // Define as colunas para exibição

      { field: 'webhookId', headerName: 'Id Webhook' },
      { field: 'statusCode', headerName: 'Status Code' },
      { field: 'webhookName', headerName: 'Nome do Webhook' },
      { field: 'sentAt', headerName: 'Enviado' },
      { field: 'detalhes', headerName: 'Detalhes', cellRenderer: 'actionRenderer', cellRendererParams: { icon: 'heroicons_solid:chevron-down', method: 'onActionDetailsFn' } },
    ];

    this.filtrar();
  }

  filtrar(){
    //let filterValues = this.filtroFormGroup.value;
    let queryObj = {} 
    this.webhookLogs = [];
    this.loading = true; 
    this.webhookService.logs(null, null, null, null)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe((logs: any) => {
        console.log(logs);
        this.loading = false;
      if(logs){
        this.rowData = logs;
      }
    })
  }

  onActionDetailsFn(params: any) {
    console.log('onActionDetailsFn', params.data);

    // Open the dialog
    const dialogRef = this._matDialog.open(PayloadViewerComponent, {
      height: "800px",
      width: "650px",
      data: {
        payloadContent: params.data
      },
    });

    dialogRef.afterClosed()
             .subscribe((result) => {
                 console.log('Compose dialog was closed!');
             });
  }
  /**
   * After view init
   */
  ngAfterViewInit(): void
  {
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle product details
   *
   * @param productId
   */
  toggleDetails(productId: string): void
  {
  }

  /**
   * Close the details
   */
  closeDetails(): void
  {
  }

  /**
   * Cycle through images of selected product
   */
  cycleImages(forward: boolean = true): void
  {
  }

  /**
   * Toggle the tags edit mode
   */
  toggleTagsEditMode(): void
  {
  }

  /**
   * Filter tags
   *
   * @param event
   */
  filterTags(event): void
  {
  }

  /**
   * Filter tags input key down event
   *
   * @param event
   */
  filterTagsInputKeyDown(event): void
  {
  }

  /**
   * Create a new tag
   *
   * @param title
   */
  createTag(title: string): void
  {
  }

  /**
   * Update the tag title
   *
   * @param tag
   * @param event
   */
  updateTagTitle(tag: InventoryTag, event): void
  {
  }

  /**
   * Delete the tag
   *
   * @param tag
   */
  deleteTag(tag: InventoryTag): void
  {
  }

  /**
   * Add tag to the product
   *
   * @param tag
   */
  addTagToProduct(tag: InventoryTag): void
  {
  }

  /**
   * Remove tag from the product
   *
   * @param tag
   */
  removeTagFromProduct(tag: InventoryTag): void
  {
  }

  /**
   * Toggle product tag
   *
   * @param tag
   * @param change
   */
  toggleProductTag(tag: InventoryTag, change: MatCheckboxChange): void
  {
  }


  /**
   * Create product
   */
  createProduct(): void
  {
  }

  /**
   * Update the selected product using the form data
   */
  updateSelectedProduct(): void
  {
  }

  /**
   * Delete the selected product using the form data
   */
  deleteSelectedProduct(): void
  {
      // Open the confirmation dialog
      const confirmation = this._fuseConfirmationService.open({
          title  : 'Delete product',
          message: 'Are you sure you want to remove this product? This action cannot be undone!',
          actions: {
              confirm: {
                  label: 'Delete'
              }
          }
      });

      // Subscribe to the confirmation dialog closed action
      confirmation.afterClosed().subscribe((result) => {

          // If the confirm button pressed...
          if ( result === 'confirmed' )
          {
          }
      });
  }

  /**
   * Show flash message
   */
  showFlashMessage(type: 'success' | 'error'): void
  {
    
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

}

export interface InventoryProduct
{
    id: string;
    category?: string;
    name: string;
    description?: string;
    tags?: string[];
    sku?: string | null;
    barcode?: string | null;
    brand?: string | null;
    vendor: string | null;
    stock: number;
    reserved: number;
    cost: number;
    basePrice: number;
    taxPercent: number;
    price: number;
    weight: number;
    thumbnail: string;
    images: string[];
    active: boolean;
}

export interface InventoryPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface InventoryCategory
{
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface InventoryBrand
{
    id: string;
    name: string;
    slug: string;
}

export interface InventoryTag
{
    id?: string;
    title?: string;
}

export interface InventoryVendor
{
    id: string;
    name: string;
    slug: string;
}
function MatPaginator(MatPaginator: any) {
  throw new Error('Function not implemented.');
}

