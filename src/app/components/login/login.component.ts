import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(
    private auth: AuthService
  ) {

  }
  usuarioVacio: boolean = false;
  contrasenaVacia: boolean = false;
  validacionesDeInput() {
    this.usuarioVacio = (this.username == "");
    this.contrasenaVacia = (this.password == "");
  }

  iniciarSesion(): void {
    if (this.username == "" || this.password == "") {
      this.validacionesDeInput()
    } else {
      //paso 3 este tiene la estructura de tu postman
      const usuarioPost = [
        {
          "usuario": this.username,
          "contrasena": this.password
        }
      ]
      console.log(usuarioPost);
      //paso 4
      this.auth.loginUsuarioAutentication(usuarioPost).subscribe(ele => {
        //status true quiere decir que se logeo correctamente
        if (ele.status == true) {
          //el rol que deseas transformar en letra
          let rolNombre = this.rolIdANombre(ele.datos.rol)
          console.log(rolNombre);
          //aca crear los local storange
          localStorage.setItem('usuario', ele.datos.usuario)
          localStorage.setItem('username', ele.datos.username)
          localStorage.setItem('rol', rolNombre)
          //aca depende del rol
          /*
          if(rolNombre == "administrador"){
            router.navigate.[(/pagin)]
          }
           */
        }
        //status false cuando los datos incorrectos
        //ele.mensaje = 'usuario o contraseña incorrecta'
        else {
          alert(ele.mensaje)
        }

      })
    }

  }
  //paso 5 ele.datos.rol te retorna en numero y tu lo que haces es transformarle a letra
  rolIdANombre(rol: any) {
    let nomRol: string = ''
    switch (rol) {
      case 1:
        nomRol = 'administrador'
        break;
      case 2:
        nomRol = 'moderador'
        break;
      case 3:
        nomRol = 'emprendedor'
        break;
      case 4:
        nomRol = 'inversionista'
        break;
    }
    return nomRol
  }
}
