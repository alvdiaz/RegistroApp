import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";

export class Usuario {
  public cuenta = '';
  public correo = '';
  public password = '';
  public nombre = '';
  public apellido= '';
  public preguntaSecreta = '';
  public respuestaSecreta = '';
  public listaUsuarios: Usuario[];

  constructor(
    cuenta: string, correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string, respuestaSecreta: string)
  {
    this.cuenta = cuenta
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
    this.listaUsuarios = [];
  }

  public buscarUsuarioPorCuenta(cuenta: string): Usuario | undefined {
  return this.listaUsuarios.find(usu => usu.cuenta === cuenta);
  }  

  public listaUsuariosValidos(): Usuario[] {
    const listaGuardada = localStorage.getItem('usuarios');
    if (listaGuardada) {
      // Si existe una lista guardada en localStorage, retornarla
      return JSON.parse(listaGuardada).map((usuario: any) => 
        new Usuario(usuario.cuenta, usuario.correo, usuario.password, usuario.nombre, usuario.apellido, usuario.preguntaSecreta, usuario.respuestaSecreta)
      );
    } else {
      // Si no existe, retornar la lista estática predefinida
      const lista = [];
      lista.push(new Usuario('atorres', 'atorres@duocuc.cl', '1234', 'Ana', 'Torres Leiva', '¿Cuál es tu animal favorito?', 'gato'));
      lista.push(new Usuario('jperez', 'jperez@duocuc.cl', '5678', 'Juan', 'Pérez González', '¿Cuál es tu postre favorito?', 'panqueques'));
      lista.push(new Usuario('cmujica', 'cmujica@duocuc.cl', '0987', 'Carla', 'Mujica Sáez', '¿Cuál es tu vehículo favorito?', 'moto'));
      return lista;
    }
  }
  

  public buscarUsuarioValido(cuenta: string, password: string): Usuario | null {
    const usuario = this.listaUsuariosValidos().find(
      usu => usu.cuenta === cuenta && usu.password === password);
    if (usuario !== undefined) {
      return usuario;
    } else {
      return null;
    }
  }

  public validarCuenta(): string {
    if (this.cuenta.trim() === '') {
      return 'Para ingresar al sistema debe ingresar un nombre de usuario.';
    }
    if (this.cuenta.length < 3 || this.cuenta.length > 8) {
      return 'El nombre de usuario debe tener entre 3 y 8 caracteres.';
    }
    return '';
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña.';
    }
    for(let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarUsuario(): string {
    return this.validarCuenta()
      || this.validarPassword();

      
  }


  public static guardarUsuario(usuario: Usuario): void {
    const lista = Usuario.cargarUsuariosDesdeLocalStorage();
    const index = lista.findIndex(u => u.cuenta === usuario.cuenta);
  
    if (index !== -1) {
      // Si el usuario ya existe, actualizarlo
      lista[index] = usuario;
    } else {
      // Si no existe, agregarlo
      lista.push(usuario);
    }
    
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('usuarios', JSON.stringify(lista));
  }
  
  public static cargarUsuariosDesdeLocalStorage(): Usuario[] {
    const listaGuardada = localStorage.getItem('usuarios');
    if (listaGuardada) {
      return JSON.parse(listaGuardada).map((usuario: any) => 
        new Usuario(usuario.cuenta, usuario.correo, usuario.password, usuario.nombre, usuario.apellido, usuario.preguntaSecreta, usuario.respuestaSecreta)
      );
    }
    return [];
  }
  

  // Método para actualizar los datos de un usuario
  public actualizarDatosEnLocalStorage(): void {
    const usuarioGuardado = Usuario.cargarUsuariosDesdeLocalStorage();
    if (usuarioGuardado) {
      Usuario.guardarUsuario(this);  // Sobrescribir los datos actualizados
    }
  }
}
