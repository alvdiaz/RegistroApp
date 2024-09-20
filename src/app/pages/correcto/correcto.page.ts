import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  usuarioActual: Usuario | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.usuarioActual = navigation.extras.state['usuario'];
      console.log('Usuario recibido:', this.usuarioActual); // Verifica que este log muestre el usuario
    } else {
      console.error('No se recibió el estado del usuario');
    }
  }
}