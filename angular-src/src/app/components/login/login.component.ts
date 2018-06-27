import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { AuthService } from '../../services/auth/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorOpts = { cssClass: 'alert-danger', timeout: 3000 };
  email: String;
  password: String;
  constructor(private router: Router, private validator: ValidateService, private auth: AuthService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }
  onLoginSubmit() {
    const creds = {
      email: this.email,
      password: this.password
    }
    if (!this.validator.validateLoginFields(creds)) {
      this.flashMessage.show('Please fill out the fields to continue', this.errorOpts);
      return false;
    }
    if (!this.validator.validateEmail(this.email)) {
      this.flashMessage.show('Please provide a valid Email', this.errorOpts);
      return false;
    }
    this.auth.loginUser(creds).subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.flashMessage.show("Welcome to Dashboard, " + data.user.username, { cssClass: 'alert-success', timeout: 3000 });
        this.auth.storUserDataToLocalStorage(data.token, data.user);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.flashMessage.show(data.msg, this.errorOpts);
        this.router.navigate(['/login']);
      }
    });
  }
}
