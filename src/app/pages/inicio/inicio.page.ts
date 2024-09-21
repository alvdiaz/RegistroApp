import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicSafeString } from '@ionic/angular';
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



export class InicioPage implements OnInit {
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


  public usuario: Usuario = new Usuario('', '', '', '', '');

  public nivelesEducacionales: NivelEducacional[] = new NivelEducacional().getNivelesEducacionales();

  public persona: Persona = new Persona();

  public asistencia: Asistencia = new Asistencia();

  public escaneando = false;

  public datosQR: string = '';


 
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
}

public ngOnInit() {

   // Aquí obtenemos los datos del usuario que fue enviado desde la página de login
   const navExtras = this.router.getCurrentNavigation()?.extras?.state;
   if (navExtras && navExtras['usuario']) {
     this.usuario = navExtras['usuario'];

}
}

public async comenzarEscaneoQR() {
  const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'}
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
  // Parseamos los datos del QR
  const objetoDatosQR = JSON.parse(datosQR);

  // Asignamos los datos del QR a la propiedad 'datosQR'
  this.datosQR = datosQR;

  // Navegamos a la página 'miclase' pasando los datos como parámetros
  this.router.navigate(['/miclase'], {
    state: { datosClase: objetoDatosQR }
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
