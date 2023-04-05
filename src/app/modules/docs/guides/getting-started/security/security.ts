import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UtilService } from 'app/core/services/util.service';
import { environment } from 'environments/environment';
import { GuidesComponent } from '../../guides.component';

@Component({
    selector   : 'security',
    templateUrl: './security.html'
})
export class SecurityComponent implements OnInit
{
    public urlSecurityMd = '';
    private fileName: string = '';
    /**
     * Constructor
     */
    constructor(
        private _guidesComponent: GuidesComponent,
        private utilService: UtilService,
        private _translocoService: TranslocoService)
    {
    }
    ngOnInit(): void {
        const me = this;
        this._translocoService.langChanges$.subscribe(lang => {
            this.fileName = this.utilService.setLangMarkdown("security");
            this.urlSecurityMd = `${environment.docs.portalDevelopers}${this.fileName}`;
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void
    {
        // Toggle the drawer
        this._guidesComponent.matDrawer.toggle();
    }
}
