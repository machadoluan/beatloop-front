import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthCallbackComponent } from './auth-callback.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SamplesPacksComponent } from './pages/samples-packs/samples-packs.component';
import { OneShotsComponent } from './pages/one-shots/one-shots.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
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
    path: 'one-shots',
    component: OneShotsComponent
  },
  {
    path: 'signup',
    component: CadastroComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
