import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PerfilService } from 'src/app/perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { EnderecoService } from 'src/app/endereco.service';

@Component({
  selector: 'app-perfil-cadastro',
  templateUrl: './perfil-cadastro.component.html',
  styleUrls: ['./perfil-cadastro.component.css']
})
export class PerfilCadastroComponent implements OnInit {

  public MASKS = MASKS;

  cadastroForm: FormGroup;

  user: any;
  perfil: any;
  alterar: boolean = false;

  constructor(public auth$: AuthService, 
              private perfil$: PerfilService, 
              private router: Router, 
              private route: ActivatedRoute, 
              private fb: FormBuilder,
              private endereco$: EnderecoService) { }

  ngOnInit(): void {
    this.criarFormulario();

    this.user = this.auth$.user();
    if (this.user) {
      const id: number = this.route.snapshot.params.id;
      this.alterar = id > 0;

      if (this.alterar && id) {
        this.perfil$.perfilPorId(id)
          .subscribe(
            dados => {
              this.perfil = dados;
              console.log(this.perfil);
              this.criarFormulario();
            },
            erro => console.error(erro))
      }
    } else {
      this.router.navigate(['/login']);
    }

    (document.querySelector('[name="nome"]') as HTMLElement).focus();
  }

  somenteNumeros(texto: string): string {
    return texto.replace(/[^\d]+/g, '');
  }

  obterEndereco(item: string) {
    const cep = this.somenteNumeros(item)
    console.log(cep)
    if (cep.length !== 8) {
      return ''
    }

    this.endereco$.obterEndereco(cep)
      .subscribe(
        (data: any)=> {
          this.cadastroForm.patchValue({
            estado_uf: data.uf,
            cidade: data.localidade,
            endereco: data.logradouro + ', ' + data.bairro
          })
        },
        erro => {
          console.error(erro)
        }
      )
  }

  criarFormulario() {
    this.cadastroForm = this.fb.group({
      id: [{ value: !this.alterar ? '' : this.perfil.id, disabled: true }],
      usuario: [!this.alterar ? 0 : this.perfil.usuario, []],
      nome: [!this.alterar ? '' : this.perfil.nome, [Validators.required, Validators.maxLength(128)]],
      sexo: [!this.alterar ? 'F' : this.perfil.sexo, []],
      cpf: [!this.alterar ? '' : this.perfil.cpf, [NgBrazilValidators.cpf]],
      telefone: [!this.alterar ? '' : this.perfil.telefone, [NgBrazilValidators.telefone]],
      endereco: [!this.alterar ? '' : this.perfil.endereco, [Validators.maxLength(512)]],
      estado_uf: [!this.alterar ? '' : this.perfil.estado_uf, [Validators.maxLength(2)]],
      cidade: [!this.alterar ? '' : this.perfil.cidade, [Validators.maxLength(64)]],
      cep: [!this.alterar ? '' : this.perfil.cep, [NgBrazilValidators.cep]]
    })
  }

  onSubmit() {
    if (!this.cadastroForm.dirty || !this.cadastroForm.valid) return;

    if (this.alterar) this.atualizar();
    else this.adicionar();
  }

  AtualizarDadosObjeto() {
    this.perfil = Object.assign({}, this.perfil, this.cadastroForm.value);
    this.perfil.usuario = this.user.id;
  }

  adicionar() {
    this.AtualizarDadosObjeto()
    console.log(this.perfil)
    this.perfil$.adicionar(this.perfil)
      .subscribe(
        dados => {
          console.log(dados)
          this.router.navigate(['/perfil']);
        }
      ),
      erro => console.error(erro)
  }

  atualizar() {
    this.AtualizarDadosObjeto()
    console.log(this.perfil)
    this.perfil$.atualizar(this.user.id, this.perfil)
      .subscribe(
        dados => {
          console.log(dados)
          this.router.navigate(['/perfil']);
        }
      ),
      erro => console.error(erro)
  }
}
