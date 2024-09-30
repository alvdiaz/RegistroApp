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
  }

  ngOnInit(): void {
    // No es necesario actualizar los datos en localStorage aquí, ya que es parte del proceso de inicio de sesión
  }

  public ingresar(): void {
    // Primero, validar el usuario
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

  public validarUsuario(usuario: Usuario): boolean {
    const usuarios = this.usuario.listaUsuariosValidos(); // Asegúrate de cargar la lista de usuarios
    const usu = this.usuario.buscarUsuarioValido(usuario.cuenta, usuario.password);

    if (usu) {
      this.usuario = usu;  // Actualiza los datos del usuario en sesión
      return true;
    } else {
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
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }
}
