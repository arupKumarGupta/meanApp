import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers }).pipe(map(res => res.json()));
  }
  loginUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/login', user, { headers }).pipe(map(res => res.json()));
  }
  storUserDataToLocalStorage(token, user) {
    localStorage.setItem('id_token', token);
    console.log(JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  doLogout() {
    console.log(this.user);
    this.authToken = this.user = null;
    localStorage.clear();

  }
  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers }).pipe(map(res => res.json()));
  }

  getDashboard() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/dashboard', { headers }).pipe(map(res => res.json()));

  }

  loggedIn() {
    if (this.authToken !== null)
      return true;
    return false;
  }
}
