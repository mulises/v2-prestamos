import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CarteraAsignadaComponent } from './componentes/cartera/cartera.asignada.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ListaCreditoComponent } from './componentes/credito/lista.credito/lista.credito.component';
import { FormCreditoComponent } from './componentes/credito/formulario/form.credito.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FormClienteComponent } from './componentes/cliente/formulario/form.cliente.component';
import { FormGastoComponent } from './componentes/gasto/formulario/form.gasto/form.gasto.component';
import { ListaGastoComponent } from './componentes/gasto/lista/lista.gasto.component';
import { CuadreCajaComponent } from './componentes/cuadre-caja/cuadre.caja.component';
import { InfoFlujoCajaCarteraComponent } from './componentes/informes/flujo-caja-cartera/info.flujo.caja.cartera.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarteraAsignadaComponent,
    ListaCreditoComponent,
    FormCreditoComponent,
    HeaderComponent,
    FormClienteComponent,
    FormGastoComponent,
    ListaGastoComponent,
    CuadreCajaComponent,
    InfoFlujoCajaCarteraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
