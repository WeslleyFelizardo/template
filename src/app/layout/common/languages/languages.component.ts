import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FuseHorizontalNavigationComponent, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { MarkdownService } from 'ngx-markdown';

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
        private _translocoService: TranslocoService,
        private markdownService: MarkdownService
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
            // Get the active lang
            this.activeLang = activeLang;
            console.log(activeLang)
            // Update the navigation
            this._updateNavigation(activeLang);

            this.markdownService.reload();

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
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponentVertical = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
        const navComponentHorizontal = this._fuseNavigationService.getComponent<FuseHorizontalNavigationComponent>('mainNavigation');

        const navComponentVerticalDocs = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('docs-guides-navigation');
        // Return if the navigation component does not exist
        if ( !navComponentHorizontal )
        {
            console.log('atualizando menu', navComponentHorizontal)

            return null;
        }

        // Get the flat navigation data
        const navigation = navComponentHorizontal.navigation;
        const navigationDocs = navComponentVerticalDocs?.navigation;

        if (navigationDocs)
        {
            const getttingStartedItem = this._fuseNavigationService.getItem('markdown.comecando', navigationDocs);
            if ( getttingStartedItem )
            {
                this._translocoService.selectTranslate('markdown.comecando').pipe(take(1))
                    .subscribe((translation) => {
                        // Set the title
                        getttingStartedItem.title = translation;

                        // Refresh the navigation component
                        navComponentVerticalDocs.refresh();

                    });
            }

            const introductionItem = this._fuseNavigationService.getItem('markdown.introducao', navigationDocs);
            if ( introductionItem )
            {
                this._translocoService.selectTranslate('markdown.introducao').pipe(take(1))
                    .subscribe((translation) => {
                        // Set the title
                        introductionItem.title = translation;

                        // Refresh the navigation component
                        navComponentVerticalDocs.refresh();

                    });
            }

            const securityItem = this._fuseNavigationService.getItem('markdown.seguranca', navigationDocs);
            if ( introductionItem )
            {
                this._translocoService.selectTranslate('markdown.seguranca').pipe(take(1))
                    .subscribe((translation) => {

                        // Set the title
                        securityItem.title = translation;

                        // Refresh the navigation component
                        navComponentVerticalDocs.refresh();

                    });
            }
        }

        const homeItem = this._fuseNavigationService.getItem('menu.inicio', navigation);

        if ( homeItem )
        {
            this._translocoService.selectTranslate('menu.inicio').pipe(take(1))
                .subscribe((translation) => {

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

                    // Set the title
                    pricingItem.title = translation;

                    // Refresh the navigation component
                    navComponentHorizontal.refresh();

                });
        }

        const documentationItem = this._fuseNavigationService.getItem('menu.documentacao', navigation);

        if ( documentationItem )
        {
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
