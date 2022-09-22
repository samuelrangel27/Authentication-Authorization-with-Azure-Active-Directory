import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { TopSecretComponent } from './top-secret/top-secret.component';
import { HomeComponent } from './home/home.component';
import { MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

@NgModule({
  declarations: [
    AppComponent,
    TopSecretComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth: {
          clientId: 'c62b622f-b5b1-4921-81e1-93f4e14de2b6',
          authority: 'https://login.microsoftonline.com/e7fdb2ba-2735-466f-873e-ad7ae8559583',
          redirectUri: 'http://localhost:4200'
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: true
        }
      }
    ),
    {
      interactionType: InteractionType.Redirect
    } as MsalGuardConfiguration, 
    {
    } as MsalInterceptorConfiguration)
  ],
  providers: [],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
