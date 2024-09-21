import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public placeholderCorreo: string = '';  
  public placeholderPassword: string = '';  

  

  public usuario: Usuario;



  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '');
    this.usuario.correo = '';
    this.usuario.password = '';
  }

  public ngOnInit(): void {


 
    this.usuario.correo = '';
    this.usuario.password = '';
    
  }

 
  public ingresar(): void {
    if (!this.validarUsuario(this.usuario)) {
      return;
    }
  
    this.mostrarMensaje('¡Bienvenido!');
  
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario // Enviamos el usuario logueado
      }
    };
    this.router.navigate(['/inicio'], navigationExtras);
  }

  /*
    Usaremos validateModel para verificar que se cumplan las
    validaciones de los campos del formulario
  */
  public validarUsuario(usuario: Usuario): boolean {

    const usu = this.usuario.buscarUsuarioValido(
      this.usuario.correo, this.usuario.password);

    if (usu) {
      this.usuario = usu;
      return true;
    }
    else {
      this.mostrarMensaje('¡Las credenciales no son correctas!');
      return false;
    }
  }

  /**
   * Muestra un toast al usuario
   *
   * @param mensaje Mensaje a presentar al usuario
   * @param duracion Duración el toast, este es opcional
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }



}
