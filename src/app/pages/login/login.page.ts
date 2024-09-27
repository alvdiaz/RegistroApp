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
    this.usuario = new Usuario('', '', '', '', '','','');
    this.usuario.correo = '';
    this.usuario.password = '';
  }

  public ngOnInit(): void {


 
    this.usuario.correo = 'atorres@duocuc.cl';
    this.usuario.password = '1234';
    
  }

 
  public ingresar(): void {
    // Primero, validar el usuario.
    if (!this.validarUsuario(this.usuario)) {
      return; // Si no es válido, salir de la función
    }
  
    // Mostrar mensaje de bienvenida con el nombre del usuario
    this.mostrarMensaje(`¡Bienvenido, ${this.usuario.nombre}!`);
  
    // Crear NavigationExtras para pasar el usuario a la página de inicio
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario // Enviar el objeto de usuario completo
      }
    };

    
  
    // Navegar a la página de inicio y pasar los datos del usuario
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
