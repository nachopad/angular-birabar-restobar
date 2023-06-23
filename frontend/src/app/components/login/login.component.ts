import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: Usuario = new Usuario();
  returnUrl!: string;
  msglogin!: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private loginService: LoginService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/principal';
  }

  login() {
    this.loginService.login(this.userform.user, this.userform.password).subscribe(
        (result) => {
          var user = result;
          if (user.status == 1) {
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", user.rol);
            console.log(this.loginService.rolLogged());
            this.router.navigateByUrl(this.returnUrl);
            this.toastrService.success("Ha ingresado al sistema exitosamente");
          } else {
            this.toastrService.error("El usuario y/o contraseña son incorrectos. Compruébalos nuevamente.");
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });
  }

}