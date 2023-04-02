import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { AnalyticsService } from 'app/modules/admin/dashboards/analytics/analytics.service';
import { ColDef } from 'ag-grid-community';
import { ActionRendererComponent } from 'app/shared/components/action-render.component';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
    selector       : 'analytics',
    templateUrl    : './analytics.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements OnInit, OnDestroy
{
    // Declaração de atributos da tabela
  // Declaração de atributos da tabela Siscoserv
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
        { status: 200, nome: 'VoyageChange', id: '32323232323', enviadoEm: Date.now() },
        { status: 200, nome: 'VoyageChange', id: '32323232323', enviadoEm: Date.now() },
        { status: 200, nome: 'VoyageChange', id: '32323232323', enviadoEm: Date.now() },
    ];

    searchForm: UntypedFormGroup;
    searchFormDefaults: any = {
        keywords  : '',
        type      : 'any',
        isTrashed : false,
        isArchived: false,
        isStarred : false
    };
    queryParams: Params;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    )
    {
        // Prepare the search form with defaults
        this.searchForm = this._formBuilder.group({
            keywords  : [this.searchFormDefaults.keywords],
            type      : [this.searchFormDefaults.type],
            isTrashed : [this.searchFormDefaults.isTrashed],
            isArchived: [this.searchFormDefaults.isArchived],
            isStarred : [this.searchFormDefaults.isStarred]
        });
    }
    ngOnInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset the search form using the default
     */
    reset(): void
    {
        this.searchForm.reset(this.searchFormDefaults);
    }

    /**
     * Perform the search
     */
    search(): void
    {
        // Add query params using the router
        this._router.navigate(['./'], {
            queryParams: this.searchForm.value,
            relativeTo : this._activatedRoute
        });
    }

    webHooksForm(): void {
        //this.localeText = agGridi18n;

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

        { field: 'id', headerName: 'Id Webhook' },
        { field: 'status', headerName: 'Status Code' },
        { field: 'nome', headerName: 'Nome do Webhook' },
        { field: 'enviadoEm', headerName: 'Enviado' },
        { field: 'detalhes', headerName: 'Detalhes', cellRenderer: 'actionRenderer', cellRendererParams: { icon: 'get_app', method: 'onActionDetailsFn' } },
      ];

      this._changeDetectorRef.detectChanges();

    }

    onActionDetailsFn(params: any) {
        console.log('detalhes')
    }
   
}
