import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from 'app/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { ErrorsHandler } from './handlers/errorhandler';
import { ServicesModule } from './services/services.module';

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        TranslocoCoreModule,
        ServicesModule
    ],
    exports: [ServicesModule],
    providers: [

    ]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
