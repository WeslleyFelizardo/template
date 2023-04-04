import { Component } from '@angular/core';
import { UtilService } from 'app/core/services/util.service';
import { GuidesComponent } from '../../guides.component';

@Component({
    selector   : 'security',
    templateUrl: './security.html'
})
export class SecurityComponent
{
    public urlSecurityMd = 'https://strgbtpapim.blob.core.windows.net/btp-docs/developer-portal/';

    /**
     * Constructor
     */
    constructor(
        private _guidesComponent: GuidesComponent,
        private utilService: UtilService )
    {
        this.urlSecurityMd = `${this.urlSecurityMd}${utilService.setLangMarkdown("security")}`;
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
