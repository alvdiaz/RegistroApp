import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit, AfterViewInit {

  @ViewChild('page', { read: ElementRef }) page!: ElementRef;


  usuarioActual: Usuario | null = null;

  constructor(private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.usuarioActual = navigation.extras.state['usuario'];
      console.log('Usuario recibido:', this.usuarioActual); // Verifica que este log muestre el usuario
    } else {
      console.error('No se recibió el estado del usuario');
    }
  }

  ngAfterViewInit() {
    // this.animarExpansion();
    
  }

  // animarExpansion() {
  //   this.animationController
  //     .create()
  //     .addElement(this.page.nativeElement)
  //     .duration(1200)
  //     .fromTo('transform', 'scaleX(0)', 'scaleX(1)')
  //     .play();
  // }

}