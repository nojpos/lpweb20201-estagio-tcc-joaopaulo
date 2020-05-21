import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { SobreComponent } from './sobre/sobre.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PerfilCadastroComponent } from './perfil/perfil-cadastro/perfil-cadastro.component';

import { NgBrazil } from 'ng-brazil' 
import { TextMaskModule } from 'angular2-text-mask';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localePt, 'pt', localePtExtra);


@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    LoginComponent,
    SobreComponent,
    PaginaNaoEncontradaComponent,
    PerfilCadastroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TextMaskModule,
    NgBrazil,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt'
    },
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
