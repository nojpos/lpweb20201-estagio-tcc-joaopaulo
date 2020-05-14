import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  error: any;
  usuarios: any;
  usuarios_error: any;

  username = null;
  password = null;

  constructor(public auth$: AuthService, private user$: UserService) { }

  ngOnInit() {
    this.user = this.auth$.user();
  }

  login() {
    this.auth$.login(this.username, this.password)
      .subscribe(
        user => this.user = user,
        err => this.error = err.error
      );
  }

  refreshToken() {
    this.auth$.refreshToken().subscribe(
      user => {
        this.user = user;
        this.error = null;
      },
      error => {
        this.error = error.error;
        this.user = null;
      }
    );
  }

  logout() {
    this.auth$.logout();
    this.user = null;
    this.username = null;
    this.password = null;
  }

  carregarUsuarios() {
    this.user$.list()
      .subscribe(
        (dados: any) => {
          this.usuarios = dados;
          this.usuarios_error = null;
        },
        error => {
          this.usuarios = null;
          this.usuarios_error = error.error;
        }
      );
  }
}

