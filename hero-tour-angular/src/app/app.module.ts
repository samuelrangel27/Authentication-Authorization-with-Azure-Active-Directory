import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth: {
          clientId: environment.clientId, // This is your client ID
          authority: `${environment.instance}/${environment.tenant}`, // This is your tenant ID
          redirectUri: environment.redirectUri, // This is your redirect URI
          postLogoutRedirectUri: environment.redirectUri
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: true
        }
      }),{interactionType: InteractionType.Redirect,
        authRequest:{
        scopes:['profile']
      }} as MsalGuardConfiguration, {
        interactionType:InteractionType.Popup,
        authRequest: {
        },
        protectedResourceMap: new Map([
          ['https://localhost:7250', ['api://454dcec0-ca13-4993-8047-7ce7ad49a87e/role']]
        ])
      } as MsalInterceptorConfiguration)
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
