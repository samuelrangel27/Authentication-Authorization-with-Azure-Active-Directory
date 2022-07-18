import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authService:MsalService) 
  { 
    this.authService.handleRedirectObservable
  }
  public login(): void
  {
    this.authService.loginRedirect()
    .subscribe({
      next: (result)=> {
        console.log(result);
      },
      error: (error)=> {
        console.log(error);
      }
    })
  }

  public logout(): void {
    localStorage.clear();
    this.authService.logoutRedirect();
  }

  public getToken(): string | null {
    let token = localStorage.getItem(`msal.${environment.clientId}.idtoken`)
    return (token == 'null') ? null : token;
  }
  public getTokenClaims() {
    var token = this.getToken();
    return jwt_decode(token ?? "");
  }

  public getInfo(){
    const act = JSON.stringify(this.authService.instance.getAllAccounts());
    console.log(act)
    return act;
  }
}
