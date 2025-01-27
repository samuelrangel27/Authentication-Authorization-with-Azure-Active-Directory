import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopSecretComponent } from './top-secret/top-secret.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'top-secret',
    component: TopSecretComponent,
    canActivate: [MsalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
