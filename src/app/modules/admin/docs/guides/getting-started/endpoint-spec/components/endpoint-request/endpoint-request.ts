import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Operation, Representation } from "app/core/services/apim.model";
import { ApimService } from "app/core/services/apim.service";
import { UtilService } from "app/core/services/util.service";
import _ from "lodash";
import { BehaviorSubject } from "rxjs";

@Component({
    selector   : 'endpoint-request',
    templateUrl: './endpoint-request.html'
})
export class EndpointRequestComponent implements OnInit, OnDestroy
{
    _selectedOperation: Operation;
    _selectedOperation$: BehaviorSubject<Operation> = new BehaviorSubject<Operation>(undefined);
    public panelQueryOpenState = true;
    panelResponsesOpenState = true;
    _cdr: ChangeDetectorRef;
    _ = _;
    public treeData = [];
    private _bodyDetails: any;
    _representation: any[];
    private _selectedEndpoint: any;
    private _selectedData: any;
    private _apiList: any;
    operationProperties: any;
    expandedResponse = true;

    @Input()
    set selectedEndpointData(data: any) {
        if (!data) { return; }

        console.log('set selectedEndpointData')
        this._selectedOperation$.next(data);
    }
    get selectedEndpointData() {
        return this._selectedOperation;
    }
    @Input()
    set apiData(data: any) {
        console.log('set selectedEndpointData')

        this._selectedData = data;

    }
    get apiData() {
        return this._selectedData;
    }
    @Input()
    set selectedEndpoint(data: any) {
        console.log('set selectedEndpointData')

        this._selectedEndpoint = data;
    }

    @Input()
    set apiList(data: any) {
        if (!data) { return; }
        this._apiList = data;

    }
    get apiList() {
        return this._apiList;
    }

    get selectedEndpoint() {
        return this._selectedEndpoint;
    }
    constructor(private cdr: ChangeDetectorRef, public servico: ApimService,
        // public dialog: MatDialog,
        matIconRegistry: MatIconRegistry, 
        //private clipboard: ClipboardService,
        //private _snackBar: MatSnackBar,
        public utilService: UtilService,
        domSanitizer: DomSanitizer) {
        //registerIcons(matIconRegistry, domSanitizer);
        this._cdr = cdr;
        

    }
    // openDialogRef(property): void {
    //     const schema = this.selectedEndpoint.properties._schema;
    //     const dialogRef = this.dialog.open(ModalTyperefComponent, {
    //     width: '40%',
    //     height: '50%',
    //     data: { property: property, schema: schema }
    //     });
    //     dialogRef.afterClosed().subscribe(res => {
    //     // console.log(res);
    //     });
    // }
    getMarkdown() {
        return `${JSON.stringify(this.selectedEndpointData)}`;
    }
    ngOnInit(): void {
        this._selectedOperation$.subscribe(operation => {
            console.log('endpoint-request', operation)
        this._selectedOperation = this.parseOperationProperties(operation);
        });

        // console.log(this.apiData());
        // console.log(this.apiList());
        // console.log(this.selectedEndpoint());
    }

    parseOperationProperties(op) {
        const operation = _.cloneDeep(op);
        if (!!operation && !!operation?.properties) {
        const responses = operation?.properties?.responses;
        if (responses.length <= 0) {
            return;
        }
        for (let iResponses = 0; iResponses <= responses.length - 1; iResponses++) {
            const response = responses[iResponses];
            if (Array.isArray(response.representations)) {
            for (let iRep = 0; iRep <= response.representations.length - 1; iRep++) {
                let representation = response.representations[iRep];
                representation = this.mapRepresentationDetail(representation, operation);
                response.representations[iRep] = representation;
            }
            }

            operation.properties.responses[iResponses] = response;
        }
        return operation;
        }
    }
    mapRepresentationDetail(representation: Representation, operation: Operation): any {
        if (!representation || !representation['typeName']) {
        return;
        }
        const api = _.find(this.apiList, { operations: [{ name: operation.name }] });
        const schemas = api.schemas;
        representation.typeSchema = schemas[representation.typeName];
        const representationSchema = representation.typeSchema;
        if (representationSchema.type === 'array') {
        const refItemName = _.last(representationSchema.items.$ref.split('/'));
        representationSchema.items.$refName = refItemName;
        representationSchema.items.$refSchema = schemas[`${refItemName}`];
        }
        const mapedRepresentationDetail = { ...representation };
        return [mapedRepresentationDetail];
    }

    getRefName(ref: string) {
        const paths = ref.split('/');
        return paths[paths.length - 1];
    }
    getKeyName(mapRepresentationDetail, propertyKey) {
        return mapRepresentationDetail?.items$RefSchema?.properties[propertyKey];
    }
    setProp(pro) {
        pro.value.isCollapsed = !pro.value.isCollapsed;
    }

    copyContent(event, content) {
    this.utilService.copyContent(content);
    }
    ngOnDestroy(): void {
    }
    
}