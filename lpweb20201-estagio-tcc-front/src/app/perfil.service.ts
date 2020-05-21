import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient, private auth$: AuthService) { }

  perfilLogado() {
    return this.http.get(environment.API_URL.concat('perfil-logado/'), this.auth$.httpOptions());
  }

  perfilPorId(id: number) {
    return this.http.get(environment.API_URL.concat(`perfis/${id}/`), this.auth$.httpOptions());
  }

  adicionar(perfil: any) {
    return this.http.post(environment.API_URL.concat(`perfis/`), perfil, this.auth$.httpOptions());
  }

  atualizar(id: number, perfil: any) {
    return this.http.put(environment.API_URL.concat(`perfis/${id}/`), perfil, this.auth$.httpOptions());
  }

  excluir(id: number) {
    return this.http.delete(environment.API_URL.concat(`perfis/${id}/`), this.auth$.httpOptions())
  }
}
