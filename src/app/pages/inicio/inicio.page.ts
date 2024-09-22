import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController, IonicSafeString } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Persona } from 'src/app/model/persona';
import { Asistencia } from 'src/app/model/asistencia';
import jsQR, { QRCode } from 'jsqr';


@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit {





  miclase() {
    throw new Error('Method not implemented.');
  }
  misdatos() {
    throw new Error('Method not implemented.');
  }
  inicio() {
    throw new Error('Method not implemented.');
  }

  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;

  @ViewChild('titulo', { read: ElementRef })
   itemTitulo!: ElementRef;
  
   @ViewChild('page', { read: ElementRef })
   page!: ElementRef;

  public usuario: Usuario = new Usuario('', '', '', '', '');
  public nivelesEducacionales: NivelEducacional[] = new NivelEducacional().getNivelesEducacionales();
  public persona: Persona = new Persona();
  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';


  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string = '';
  public horaFin: string = '';
  public horaInicio: string = '';
  public idAsignatura: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public seccion: string = '';
  public sede: string = '';

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {}

  public ngOnInit() {
    // Obtener los datos del usuario desde la página de login
    const navExtras = this.router.getCurrentNavigation()?.extras?.state;
    
    if (navExtras && navExtras['usuario']) {
      this.usuario = navExtras['usuario']; // Asignar usuario desde el estado de navegación
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

  animarRotacion() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)')
      .play();
  }

  // Función para navegar a la página de Mis Datos
  public irAMisDatos() {
    this.router.navigate(['/misdatos'], {
      state: {
        usuario: this.usuario, // Pasar usuario a la siguiente página
      },
    });
    
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    const objetoDatosQR = JSON.parse(datosQR);
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.dia = objetoDatosQR.dia;
      
    this.horaFin = objetoDatosQR.horaFin;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.seccion = objetoDatosQR.seccion;
    this.sede = objetoDatosQR.sede;

    this.router.navigate(['/miclase'], {
      state: {
        datosQR: {
          bloqueInicio: this.bloqueInicio,
          bloqueTermino: this.bloqueTermino,
          dia: this.dia,
          horaFin: this.horaFin,
          horaInicio: this.horaInicio,
          idAsignatura: this.idAsignatura,
          nombreAsignatura: this.nombreAsignatura,
          nombreProfesor: this.nombreProfesor,
          seccion: this.seccion,
          sede: this.sede,
        },
      },
    });
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  public cerrarSesion(): void {
    // Navegamos a la página de login
    this.router.navigate(['/login']);
  }
}
