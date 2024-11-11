import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthCallbackComponent } from './auth-callback.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SamplesPacksComponent } from './pages/samples-packs/samples-packs.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth/callback',
    component: AuthCallbackComponent
  },
  {
    path: 'browse',
    component: BrowseComponent
  },
  {
    path: 'packs',
    component: SamplesPacksComponent
  },
  {
    path: 'signup',
    component: CadastroComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
