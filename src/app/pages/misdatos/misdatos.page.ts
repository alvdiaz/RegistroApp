import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Persona } from 'src/app/model/persona';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {
  misdatos() {
    throw new Error('Method not implemented.');
  }
  miclase() {
    throw new Error('Method not implemented.');
  }
  inicio() {
    throw new Error('Method not implemented.');
  }

  public usuario: Usuario = new Usuario('', '', '', '', '');
  public nivelesEducacionales: NivelEducacional[] = new NivelEducacional().getNivelesEducacionales();
  public persona: Persona = new Persona();

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Verificamos si recibimos los datos del login
    if (this.router.getCurrentNavigation()?.extras.state) {
      const state = this.router.getCurrentNavigation()?.extras.state as { usuario: Usuario };
      this.usuario = state.usuario; // Aquí recuperamos el usuario
    }
  }

  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.persona)) {
      Object.defineProperty(this.persona, key, { value: '' });
    }
  }

  public mostrarDatosPersona(): void {
    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
    if (this.persona.nombre.trim() === '' && this.persona.apellido === '') {
      this.presentAlert('Datos Actualizados', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    // Mostrar un mensaje emergente con los datos de la persona
    let mensaje = '<br><b>Usuario:</b> ' + this.usuario.correo;
    mensaje += '<br><b>Nombre:</b> ' + this.persona.nombre;
    mensaje += '<br><b>Apellido:</b> ' + this.persona.apellido;
    mensaje += '<br><b>Educación:</b> ' + this.persona.getTextoNivelEducacional();
    mensaje += '<br><b>Nacimiento:</b> ' + this.persona.getTextoFechaNacimiento();

    this.presentAlert('Datos Actualizados', mensaje);
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
