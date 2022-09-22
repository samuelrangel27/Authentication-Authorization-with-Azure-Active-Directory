import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
  }
  
  login()
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

  logout()
  {
    this.authService.logoutRedirect().subscribe({
      next: (result)=> {
        console.log(result);
      },
      error: (error)=> {
        console.log(error);
      }
    });
  }
}
