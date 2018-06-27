import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  constructor(private auth: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.auth.getDashboard().subscribe(data => {
      this.user = data.user;
    }, err => {
      if (err.status == 401) {
        this.flashMessage.show("Please login to continue.", { cssClass: 'alert-info', timeout: 3000 });
        this.router.navigate(['/login']);
        return false;
      }
      console.log(err.status);
      return false;
    });
  }

}
