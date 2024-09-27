import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';  




@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit, AfterViewInit {

  @ViewChild('page', { read: ElementRef }) page!: ElementRef;


  // Variable que almacenará el correo ingresado
  correoIngresado: string = '';
  // Usuario actual que se utilizará en la siguiente página
  usuarioActual: Usuario | null = null;

  constructor(private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {
    
   }

  ngOnInit() {}

  // Función para validar si el correo ingresado pertenece a un usuario
  validarCorreo() {
    const usuarioService = new Usuario('', '', '', '', '','','');
    const listaUsuarios = usuarioService.listaUsuariosValidos();
  
    // Buscar si existe el usuario con el correo ingresado
    const usuarioEncontrado = listaUsuarios.find(usuario => usuario.correo === this.correoIngresado);
  
    if (usuarioEncontrado) {
      // Si el correo es válido, almacenar el usuario actual
      this.usuarioActual = usuarioEncontrado;
      // Redirigir a la página de pregunta secreta con el estado (usuario actual)
      this.router.navigate(['/pregunta'], { state: { usuario: this.usuarioActual } });
    } else {
      // Si el correo no es válido, redirigir a la página de error
      this.router.navigate(['/incorrecto']);
    }
  }

  public ngAfterViewInit() {
    this.animarDeslizarVertical()
  }

  animarDeslizarVertical() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .duration(800)
      .fromTo('transform', 'translateY(-100%)', 'translateY(0%)')
      .play();
  }
}
