import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UtilService } from 'app/core/services/util.service';
import { GuidesComponent } from 'app/modules/admin/docs/guides/guides.component';
import { MarkdownService } from 'ngx-markdown';

@Component({
    selector   : 'overview',
    templateUrl: './overview.html'
})
export class OverviewComponent
{
    public urlOverviewMd = 'https://strgbtpapim.blob.core.windows.net/btp-docs/developer-portal/';
    /**
     * Constructor
     */
    constructor(
        private _guidesComponent: GuidesComponent, 
        private markdownService: MarkdownService, 
        private utilService: UtilService        )
    {
        this.urlOverviewMd = `${this.urlOverviewMd}${utilService.setLangMarkdown("overview")}`;
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
