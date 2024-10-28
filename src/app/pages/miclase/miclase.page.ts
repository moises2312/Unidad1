import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
  
})
export class MiclasePage implements OnInit, AfterViewInit, MiclasePage {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  
  datosQr = {
    sede: 'Alonso Ovalle',
    idAsignatura: 'PGY4121',
    seccion: '001D',
    nombreAsignatura: 'Aplicaciones Móviles',
    nombreProfesor: 'Cristián Gómez Vega',
    dia: '2022-08-09',
    bloqueInicio: 7,
    bloqueTermino: 9,
    horaInicio: '13:00',
    horaFin: '15:15' };
  
  public usuario: Usuario;
  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  
  constructor(
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) { 
    this.usuario = new Usuario('', '', '', '', '', '', '',
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
    
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
    this.animarVueltaDePagina();
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

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }
  animarVueltaDePagina() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'rotateY(deg)', 'rotateY(-180)')
      .duration(1000)
      .fromTo('transform', 'rotateY(-180deg)', 'rotateY(0deg)')
      .play();
  }
  
}
