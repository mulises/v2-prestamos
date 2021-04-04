import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/servicios/login/auth.service';
import { Usuario } from 'src/app/entidades/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorLogin: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/principal']);
    }
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){

    this.authService.logout();
    
    if(this.loginForm.invalid){
      return;
    }

    const usuario: Usuario = new Usuario();
    usuario.username = this.loginForm.get('username').value;
    usuario.password = this.loginForm.get('password').value;

    this.authService.login(usuario).subscribe(response => {
      this.authService.guardarToken(response.access_token);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarCodigoEmpresa(response.access_token);
      this.router.navigate(['/principal']);
    },
    err=>{
      if(err.status == 400 || err.status == 401) {
        this.errorLogin = `Usuario y/o Contraseña incorrecta` ;
      }
      
    })
    
  }

}
