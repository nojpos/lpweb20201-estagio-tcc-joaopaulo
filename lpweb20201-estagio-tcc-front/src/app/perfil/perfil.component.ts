import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PerfilService } from '../perfil.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { ConfiguracaoAlert } from '../uteis/configuracao-alert';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  perfil: any;
  temPerfil = null;

  constructor(public auth$: AuthService, private perfil$: PerfilService, private router: Router, private alert: ToastrService) { }

  ngOnInit(): void {
    this.user = this.auth$.user();
    if (this.user) {
      this.perfil$.perfilLogado()
        .subscribe(
          dados => {
            this.perfil = dados;
          },
          erro => {
            this.temPerfil = false;
            if (erro.status === 401) {
              this.logout();
            }
          }
        );
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.auth$.logout();
    this.router.navigate(['/']);
  }

  excluirPerfil() {
    this.perfil$.excluir(this.perfil.id)
      .subscribe(
        dados => {
          this.router.navigate(['/']);
          this.alert.warning(`Perfil excluído.`, 'Atenção', { ... ConfiguracaoAlert.configuracaoPadrao });
        },
        errro => console.error(errro)
      );
  }
}
