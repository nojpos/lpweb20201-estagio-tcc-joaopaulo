import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  error: any;
  username = null;
  password = null;

  constructor(public auth$: AuthService, private user$: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.auth$.user();
    if (this.user) {
      this.router.navigate(['/perfil']);
    }
  }

  login() {
    this.auth$.login(this.username, this.password)
      .subscribe(
        user => {
          this.router.navigate(['/perfil']);
        },
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

  /*
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
  */
}
