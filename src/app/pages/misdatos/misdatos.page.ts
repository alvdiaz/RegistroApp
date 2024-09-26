import { InicioPage } from './../inicio/inicio.page';
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
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;



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
    // Verificar si recibimos los datos desde la página anterior
    if (this.router.getCurrentNavigation()?.extras.state) {
      const state = this.router.getCurrentNavigation()?.extras.state as { usuario: Usuario };
      
      this.usuario = state.usuario; // Recuperamos el usuario y lo asignamos
  
      // Si los datos de persona están disponibles, los asignamos a la entidad persona
      if (state.usuario) {
        this.persona.nombre = this.usuario.nombre;  // Por ejemplo, usar el nombre de usuario
        // Asigna otros valores de persona si es necesario
      }
    }
  }
  
  
  
  
  

  public ngAfterViewInit() {
    this.animarTituloIzqDer();
    this.animarVueltaDePagina();

  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(10%)', 'translate(100%)')
      .fromTo('opacity',1, 1,)
      .play();
  }


  animarVueltaDePagina() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'rotateY(deg)', 'rotateY(-180)')
      .duration(1000)
      .fromTo('transform', 'rotateY(-180deg)', 'rotateY(0deg)')
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


  public MisdatosPage(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario // Pasar el objeto usuario
      }
    };
    this.router.navigate(['/misdatos'], navigationExtras);
  }
  

  public MiclasePage(): void {
    // Navegamos a la página de login
    this.router.navigate(['/miclase']);
  }

  public InicioPage (): void {
    // Navegamos a la página de login
    this.router.navigate(['/inicio']);
  }

  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.persona)) {
      Object.defineProperty(this.persona, key, { value: '' });
    }
  }

  asignado(texto: string) {
    if (texto.trim() !== '') {
      return texto;
    }
    return 'No asignado';
  }


  mostrarDatosPersona() {
    // Si el usuario no ingresa la cuenta, se mostrará un error
    if (this.usuario.correo.trim() === '') {
      this.mostrarMensajeAlerta('El correo es un campo obligatorio.');
      return;
    }

    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
 

    // Mostrar un mensaje emergente con los datos de la persona
    let mensaje = `

  Correo:   ${this.usuario.correo} 
  Nombre:   ${this.asignado(this.usuario.nombre)}
  Contraseña:   ${this.usuario.password}

 
    `;
    this.mostrarMensajeAlerta(mensaje);
  }
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: new IonicSafeString(mensaje),
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarMensajeAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Datos personales',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }


}
