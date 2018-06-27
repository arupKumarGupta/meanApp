import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  validateRegisterUser(user) {
    if (user.name == undefined)
      return false;
    if (user.username == undefined)
      return false;
    if (user.email == undefined)
      return false;
    if (user.password == undefined)
      return false;
    return true;
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validateLoginFields(user) {
    if (user.email == undefined)
      return false;
    if (user.password == undefined)
      return false;
    return true;
  }
}
