import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hero-tour';
  private readonly _destroying$ = new Subject<void>();

  constructor(public authService:AuthenticationService,
    private bradcastService: MsalBroadcastService,
    private http: HttpClient)
  {
  }

  ngOnInit(): void {
    // this.bradcastService.inProgress$
    //   .pipe(
    //     filter((status: InteractionStatus) => status === InteractionStatus.None),
    //     takeUntil(this._destroying$)
    //   )
    //   .subscribe()
  }

  login()
  {
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }

  callAPI(){
    console.log('Call api')
    this.http.get('https://localhost:7250/api/WeatherForecast')
      .subscribe(x => console.log(x));
  }

  postApi(){
    this.http.post('https://localhost:7250/api/WeatherForecast', {})
      .subscribe(x => console.log(x));
  }
}
