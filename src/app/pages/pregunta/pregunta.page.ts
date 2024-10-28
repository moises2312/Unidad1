import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  animations: [
    trigger('fadeInAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class PreguntaPage implements OnInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;


  public usuario: Usuario;
  public respuesta: string | undefined;

  constructor(
    private animationController: AnimationController,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {
    this.usuario = new Usuario('','','','','','','',
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
    this.activatedRoute.queryParams.subscribe(params =>{
      const nav = this.router.getCurrentNavigation();
      if (nav){
        if(nav.extras.state){
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
      this.router.navigate(['/login'])
    });
  }
    

  ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario.respuestaSecreta === this.respuesta) {
      this.router.navigate(['/correcto'], {
        state: {
          usuario: this.usuario 
        }
      });
    } else {
      this.router.navigate(['/incorrecto']);
    }
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

}
