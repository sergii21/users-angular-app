import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducer } from './features/users/store/users.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './features/users/store/users.effects';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      users: reducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideToastr(),
    provideEffects([UsersEffects]),
    provideAnimations(),
  ],
};

