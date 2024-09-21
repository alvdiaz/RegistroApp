import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {
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
    // Obtenemos los datos enviados desde 'inicio.page.ts'
    const navExtras = this.router.getCurrentNavigation()?.extras?.state;
    if (navExtras && navExtras['datosClase']) {
      this.datosClase = navExtras['datosClase'];
    }
  }
}
