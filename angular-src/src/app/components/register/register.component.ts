import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  flashMessageErrorOps = { cssClass: 'alert-danger', timeout: 3000 };
  flashMessageSuccessOps = { cssClass: 'alert-success', timeout: 3000 };
  constructor(private router: Router,
    private auth: AuthService, private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    //required fields
    if (!this.validateService.validateRegisterUser(user)) {
      this.flashMessage.show("Required field error!", this.flashMessageErrorOps);
      return false;
    }
    //email validation
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Invalid Email", this.flashMessageErrorOps);
      return false;
    }
    //register user
    this.auth.registerUser(user).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.flashMessage.show(`Registration Successful.`, this.flashMessageSuccessOps);
        this.router.navigate(['/login']);
      }
      else {
        this.flashMessage.show('Unable to register.', this.flashMessageErrorOps);
        this.router.navigate(['/register']);
      }
    });
  }

}
