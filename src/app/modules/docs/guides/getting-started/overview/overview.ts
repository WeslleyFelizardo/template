import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UtilService } from 'app/core/services/util.service';
import { MarkdownService } from 'ngx-markdown';
import { GuidesComponent } from '../../guides.component';

@Component({
    selector   : 'overview',
    templateUrl: './overview.html'
})
export class OverviewComponent implements OnInit
{
    public urlOverviewMd = 'https://strgbtpapim.blob.core.windows.net/btp-docs/developer-portal/';
    /**
     * Constructor
     */
    constructor(
        private _guidesComponent: GuidesComponent, 
        private markdownService: MarkdownService, 
        private utilService: UtilService,
        private _translocoService: TranslocoService        )
    {
        this.urlOverviewMd = `${this.urlOverviewMd}${utilService.setLangMarkdown("overview")}`;
    }

    ngOnInit(): void {
        const me = this;
        this._translocoService.langChanges$.subscribe(lang => {
            console.log(lang);
           
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
