import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(username, password) {
    const user = {
      username,
      password
    };
    return this.http.post(environment.API_URL.concat('token-auth/'), user)
      .pipe(
        map(data => this.updateData(data)),
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  public refreshToken() {
    const user = this.user();
    return this.http.post(environment.API_URL.concat('token-refresh/'), { token: user.token })
      .pipe(
        map(data => this.updateData(data)),
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  user() {
    const data = localStorage.getItem('user');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  httpOptions() {
    const user = this.user();
    let data = null;
    if (user) {
      data = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `JWT ${user.token}`
        })
      };
    } else {
      data = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `JWT `
        })
      };
    }
    return data;
  }

  private updateData(data) {
    const token = data['token'];
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    const token_expires = new Date(token_decoded.exp * 1000);
    return {
      id: token_decoded.user_id,
      username: token_decoded.username,
      email: token_decoded.email,
      token: token,
      token_expires: token_expires
    };
  }
}
