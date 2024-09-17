import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Persona } from 'src/app/model/persona';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})

export class InicioPage implements OnInit {

  public usuario: Usuario = new Usuario('', '', '', '', '');

  public nivelesEducacionales: NivelEducacional[] = new NivelEducacional().getNivelesEducacionales();

  public persona: Persona = new Persona();

 
  /*
    En el constructor del HomePage se ponen como parametros los siguientes objetos:
      (1) activeroute (del tipo de dato ActivatedRoute) y router (del tipo de dato Router),
      que se usarán para obtener los datos enviados por la página que invocó a "home".
      (2) alertController (del tipo de dato AlertController), que se usará para mostrar
      mensajes emergentes en la pantalla.

    Nótese que los parámetros tuvieron que declararse con "private", y esto es necesario
    para que los parámetros pasen a considerarse automáticamente como propiedades
    de la clase "HomePage" y de este modo puedan usarse dentro de los otros métodos.
   */
   constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController) {

    // Se llama a la ruta activa y se obtienen sus parámetros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => {       // Utilizamos expresión lambda
      const navigation = this.router.getCurrentNavigation();
      if (navigation) {
        if (navigation.extras.state) { // Validar que tenga datos extras
          // Si tiene datos extra, se rescatan y se asignan a una propiedad
          this.usuario = navigation.extras.state['usuario'];
        } else {
          /*
            Si no vienen datos extra desde la página anterior, quiere decir que el usuario
            intentó entrar directamente a la página home sin pasar por el login,
            de modo que el sistema debe enviarlo al login para que inicie sesión.
          */
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
  });
}

public ngOnInit() {
  // this.persona.nombre = 'Cristián';
  // this.persona.apellido = 'Gómez';
  // this.persona.nivelEducacional.id = 6;
  // this.persona.fechaNacimiento = '1972-12-26';
}

public limpiarFormulario(): void {
  /*
    El método limpiar recorre cada uno de los campos de la propiedad persona,
    de modo que la variable "key" va tomando el nombre de dichos campos (nombre,
    apellido, etc.) y "value" adopta el valor que tiene en ese momento el
    campo asociado a key.
  */
  for (const [key, value] of Object.entries(this.persona)) {
    /*
      Con la siguiente instrucción se cambia el valor de cada campo
      de la propiedad persona, y como los controles gráficos están
      asociados a dichos nombres de campos a través de ngModel, entonces
      al limpiar el valor del campo, también se limpia el control gráfico.
    */
      Object.defineProperty(this.persona, key, {value: ''});
    }
  }

 
  public mostrarDatosPersona(): void {

    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
    if (this.persona.nombre.trim() === '' && this.persona.apellido === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    // Mostrar un mensaje emergente con los datos de la persona
    let mensaje = '<br><b>Usuario:</b> ' + this.usuario.correo;
    mensaje += '<br><b>Nombre:</b> ' + this.persona.nombre;
    mensaje += '<br><b>Apellido:</b> ' + this.persona.apellido;
    mensaje += '<br><b>Educación:</b> ' + this.persona.getTextoNivelEducacional();
    mensaje += '<br><b>Nacimiento:</b> ' + this.persona.getTextoFechaNacimiento();

    this.presentAlert('Datos personales', mensaje);
  }

  // Este método sirve para mostrar el mensaje emergente
  public async presentAlert(titulo: string, mensaje: string) {

    const alert = await this.alertController.create({
      header: titulo,
      message: new IonicSafeString(mensaje),
      buttons: ['OK']
    });

    await alert.present();
  }
}
