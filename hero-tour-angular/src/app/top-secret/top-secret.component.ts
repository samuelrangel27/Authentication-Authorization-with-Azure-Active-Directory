import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-top-secret',
  templateUrl: './top-secret.component.html',
  styleUrls: ['./top-secret.component.scss']
})
export class TopSecretComponent implements OnInit {

  constructor(public authService:AuthenticationService, private http: HttpClient) { }

  ngOnInit(): void {
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
