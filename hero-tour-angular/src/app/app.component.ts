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
    private bradcastService: MsalBroadcastService)
  {
  }

  ngOnInit(): void {
  }

  

}
