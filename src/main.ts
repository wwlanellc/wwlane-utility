import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { UncompiledAppModule } from './app/uncompiled-app.module';

if (environment.codeHandle === 'PRODUCTION') {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.log(err));


platformBrowserDynamic().bootstrapModule(UncompiledAppModule)
.catch(err => console.log(err));
