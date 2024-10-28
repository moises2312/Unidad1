import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemCorreo', { read: ElementRef }) itemCorreo!: ElementRef;
  @ViewChild('itemPreguntaSecreta', { read: ElementRef }) itemPreguntaSecreta!: ElementRef;
  @ViewChild('itemRespuestaSecreta', { read: ElementRef }) itemRespuestaSecreta!: ElementRef;
  @ViewChild('itemPassword', { read: ElementRef }) itemPassword!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  public usuario: Usuario= new Usuario('', '', '', '', '', '', '',
    NivelEducacional.findNivelEducacionalById(1)!, undefined);

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  constructor(
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) { 
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
    
  }

  public ngOnInit(): void {

  }

  public limpiar1(): void {
    this.usuario.cuenta = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.correo = '';
    this.usuario.preguntaSecreta= '';
    this.usuario.respuestaSecreta= '';
    this.usuario.nivelEducacional= NivelEducacional.findNivelEducacionalById(1)!;
    this.usuario.fechaNacimiento = undefined;
    this.usuario.password = '';
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
    
  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(9000)
      .fromTo('transform', 'translate(-50%)', 'translate(100%)')
      .fromTo('opacity', 0.5, 1)
      .play();
  }
  public mostrarDatosPersonales() {
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }


}
