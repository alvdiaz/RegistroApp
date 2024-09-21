import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController, IonicSafeString, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Persona } from 'src/app/model/persona';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;


  public usuario: Usuario = new Usuario('','','','','');
  public nivelesEducacionales: NivelEducacional[] = new NivelEducacional().getNivelesEducacionales();
  public persona: Persona = new Persona();

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {}

  ngOnInit() {
    // Verificar si recibimos los datos desde el login
    if (this.router.getCurrentNavigation()?.extras.state) {
      const state = this.router.getCurrentNavigation()?.extras.state as { usuario: Usuario };
      this.usuario = state.usuario; // Aquí recuperamos el usuario y lo asignamos
      this.persona.nombre = this.usuario.nombre; // Si la persona también tiene nombre
      this.usuario.correo = this.usuario.correo; // Llenamos datos relevantes en persona
    }
  }

  public ngAfterViewInit() {
    this.animarTituloIzqDer();

  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('opacity', 0.7, 1)
      .play();
  }

  // Función 1: Actualizar datos del usuario en la lista de usuarios válidos
  public actualizarUsuarioEnLista(): void {
    const listaUsuariosValidos = this.usuario.listaUsuariosValidos();
    const index = listaUsuariosValidos.findIndex(usu => usu.correo === this.usuario.correo);

    if (index !== -1) {
      // Actualizamos los datos en la lista de usuarios válidos
      listaUsuariosValidos[index] = this.usuario;
      this.presentAlert('Actualización', 'Los datos del usuario han sido actualizados correctamente.');
    } else {
      this.presentAlert('Error', 'No se encontró el usuario en la lista de usuarios válidos.');
    }
  }

  // Función 2: Guardar en State y pasar usuario a ingreso.html al cerrar sesión
  public cerrarSesion(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    
    this.router.navigate(['/login'], navigationExtras);
  }

  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.persona)) {
      Object.defineProperty(this.persona, key, { value: '' });
    }
  }

  public mostrarDatosPersona(): void {
    if (this.persona.nombre.trim() === '' && this.persona.apellido === '') {
      this.presentAlert('Datos Actualizados', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    // Mensaje con datos de la persona
    let mensaje = '<br><b>Usuario:</b> ' + this.usuario.correo;
    mensaje += '<br><b>Nombre:</b> ' + this.persona.nombre;
    mensaje += '<br><b>Apellido:</b> ' + this.persona.apellido;
    mensaje += '<br><b>Educación:</b> ' + this.persona.getTextoNivelEducacional();
    mensaje += '<br><b>Nacimiento:</b> ' + this.persona.getTextoFechaNacimiento();

    this.presentAlert('Datos Actualizados', mensaje);
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: new IonicSafeString(mensaje),
      buttons: ['OK']
    });
    await alert.present();
  }


}
