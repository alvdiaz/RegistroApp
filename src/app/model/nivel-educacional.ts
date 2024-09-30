export class NivelEducacional {
  public id: number;
  public nombre: string;

  // Constructor actualizado para aceptar dos parámetros
  public constructor(id: number = 0, nombre: string = '') {
    this.id = id;
    this.nombre = nombre;
  }

  // Otros métodos de la clase permanecen igual
  public getNivelEducacional(id: number, nombre: string): NivelEducacional {
    const nived = new NivelEducacional();
    nived.id = id;
    nived.nombre = nombre;
    return nived;
  }

  public getNivelesEducacionales(): NivelEducacional[] {
    const nivelesEducacionales = [];
    nivelesEducacionales.push(this.getNivelEducacional(1, 'Básica Incompleta'));
    nivelesEducacionales.push(this.getNivelEducacional(2, 'Básica Completa'));
    nivelesEducacionales.push(this.getNivelEducacional(3, 'Media Incompleta'));
    nivelesEducacionales.push(this.getNivelEducacional(4, 'Media Completa'));
    nivelesEducacionales.push(this.getNivelEducacional(5, 'Superior Incompleta'));
    nivelesEducacionales.push(this.getNivelEducacional(6, 'Superior Completa'));
    return nivelesEducacionales;
  }

  public setNivelEducacional(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }
  
  public findNombreBy(id: number): string {
    if (id < 1 || id > 6) {
      return 'Sin nivel educacional';
    }
    const nived = this.getNivelesEducacionales().find(n => n.id === id);
    return nived ? nived.nombre : `Nivel educacional con id=${id} no fue encontrado`;
  }

  public getTextoId(): string {
    return this.id < 1 || this.id > 6 ? 'Sin nivel educacional' : this.id.toString();
  }

  public getTextoNombre(): string {
    return this.nombre.trim() ? this.nombre : 'No asignado';
  }

  public getTextoNivelEducacional(): string {
    return this.id < 1 || this.id > 6
      ? 'No asignado'
      : this.id.toString() + ' - ' + this.findNombreBy(this.id);
  }
}
