import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UtilService } from 'app/core/services/util.service';
import { environment } from 'environments/environment.dev';
import { MarkdownService } from 'ngx-markdown';
import { GuidesComponent } from '../../guides.component';

@Component({
    selector   : 'overview',
    templateUrl: './overview.html'
})
export class OverviewComponent implements OnInit
{
    public urlOverviewMd = '';
    public fileName: string = '';
    /**
     * Constructor
     */
    constructor(
        private _guidesComponent: GuidesComponent, 
        private markdownService: MarkdownService, 
        private utilService: UtilService,
        private _translocoService: TranslocoService        )
    {
    }

    ngOnInit(): void {
        
        const me = this;
        this._translocoService.langChanges$.subscribe(lang => {
            this.fileName = this.utilService.setLangMarkdown("overview");
            this.urlOverviewMd = `${environment.docs.portalDevelopers}${this.fileName}`;
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
