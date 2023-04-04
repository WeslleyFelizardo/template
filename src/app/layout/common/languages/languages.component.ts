import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FuseHorizontalNavigationComponent, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';

@Component({
    selector       : 'languages',
    templateUrl    : './languages.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy
{
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService
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
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {
            console.log('translate', activeLang);
            // Get the active lang
            this.activeLang = activeLang;

            // Update the navigation
            this._updateNavigation(activeLang);
        });


        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'en': 'us',
            'pt': 'br'
        };
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
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void
    {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void
    {
        console.log('_updateNavigation');
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponentHorizontal = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
        const navComponentHorizontal2 = this._fuseNavigationService.getComponent<FuseHorizontalNavigationComponent>('mainNavigation');

        console.log('navComponent', navComponentHorizontal);
        console.log('navComponent', navComponentHorizontal2)

        // Return if the navigation component does not exist
        if ( !navComponentHorizontal )
        {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponentHorizontal.navigation;

        const homeItem = this._fuseNavigationService.getItem('menu.inicio', navigation);

        if ( homeItem )
        {
            console.log(homeItem);
            this._translocoService.selectTranslate('menu.inicio').pipe(take(1))
                .subscribe((translation) => {
                    console.log(translation);

                    // Set the title
                    homeItem.title = translation;

                    // Refresh the navigation component
                    navComponentHorizontal.refresh();

                });
        }

        const pricingItem = this._fuseNavigationService.getItem('menu.preco', navigation);

        if ( pricingItem )
        {
            this._translocoService.selectTranslate('menu.preco').pipe(take(1))
                .subscribe((translation) => {
                    console.log(translation);

                    // Set the title
                    pricingItem.title = translation;

                    // Refresh the navigation component
                    navComponentHorizontal.refresh();

                });
        }

        const documentationItem = this._fuseNavigationService.getItem('menu.documentacao', navigation);

        if ( documentationItem )
        {
            console.log(documentationItem);
            this._translocoService.selectTranslate('menu.documentacao').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    documentationItem.title = translation;

                    // Refresh the navigation component
                    navComponentHorizontal.refresh();

                });
        }

        
        const catalogItem = this._fuseNavigationService.getItem('menu.catalogo', navigation);

        if ( catalogItem )
        {
            console.log(catalogItem);
            this._translocoService.selectTranslate('menu.catalogo').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    catalogItem.title = translation;

                    // Refresh the navigation component
                    navComponentHorizontal.refresh();

                });
        }

        const monitoringItem = this._fuseNavigationService.getItem('menu.monitoramento', navigation);

        if ( monitoringItem )
        {
            console.log(monitoringItem);
            this._translocoService.selectTranslate('menu.monitoramento').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    monitoringItem.title = translation;

                    // Refresh the navigation component
                    navComponentHorizontal.refresh();

                });
        }
    }
}
