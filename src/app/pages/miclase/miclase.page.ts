import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/model/persona';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {
  public persona: Persona = new Persona();
  public usuario: Usuario = new Usuario('', '', '', '', '');



  
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

  constructor(private router: Router) { }

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
}
