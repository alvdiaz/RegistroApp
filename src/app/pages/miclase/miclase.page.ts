import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Persona } from 'src/app/model/persona';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef })
  page!: ElementRef;

  public persona: Persona = new Persona();
  public usuario: Usuario = new Usuario('', '', '', '', '','','');



  
  public bloqueInicio: number=0 ;
  public bloqueTermino: number=0 ;
  public dia: string = '';
  public horaFin: string = '';
  public horaInicio: string = '';
  public idAsignatura: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public seccion: string = '';
  public sede: string = '';

miclase() {
throw new Error('Method not implemented.');
}
inicio() {
throw new Error('Method not implemented.');
}
misdatos() {
throw new Error('Method not implemented.');
}

public datosClase: any;


  constructor(private router: Router,
  private animationController: AnimationController

  ) { }

  ngOnInit() {
    // Verificamos si hay datos de QR en el estado de navegación
    const navExtras = this.router.getCurrentNavigation()?.extras?.state;
    
    if (navExtras && navExtras['datosQR']) {
      const datosQR = navExtras['datosQR'];
      this.bloqueInicio = datosQR.bloqueInicio;
      this.bloqueTermino = datosQR.bloqueTermino;
      this.dia = datosQR.dia;
      this.horaFin = datosQR.horaFin;
      this.horaInicio = datosQR.horaInicio;
      this.idAsignatura = datosQR.idAsignatura;
      this.nombreAsignatura = datosQR.nombreAsignatura;
      this.nombreProfesor = datosQR.nombreProfesor;
      this.seccion = datosQR.seccion;
      this.sede = datosQR.sede;
    }
  }

  public ngAfterViewInit() {
    this.animarTituloIzqDer();
    this. animarRebote();
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

  animarRebote() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(2)
      .duration(700)
      .keyframes([
        { offset: 0, transform: 'translateY(0)' },
        { offset: 0.5, transform: 'translateY(-20px)' },
        { offset: 3, transform: 'translateY(0)' },
      ])
      .play();
  }

  public cerrarSesion(): void {
    // Navegamos a la página de login
    this.router.navigate(['/login']);
  }

  public MisdatosPage(): void {
    // Navegamos a la página de login
    this.router.navigate(['/misdatos']);
  }

  public MiclasePage(): void {
    // Navegamos a la página de login
    this.router.navigate(['/miclase']);
  }

  public InicioPage (): void {
    // Navegamos a la página de login
    this.router.navigate(['/inicio']);
  }


}

