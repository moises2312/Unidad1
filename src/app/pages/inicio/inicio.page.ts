import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
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
export class InicioPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  public usuario: Usuario;
  public escaneando = false;
  public datosQR: string = '';
  

  constructor(
    private animationController: AnimationController,
    private alertController: AlertController,
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

  public async comenzarEscaneoQR() {
    try {
      const mediaProvider = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      this.video.nativeElement.srcObject = mediaProvider;
      this.video.nativeElement.setAttribute('playsinline', 'true');
      this.video.nativeElement.play();
      this.escaneando = true;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo acceder a la cámara. Asegúrate de que los permisos estén habilitados.',
        buttons: ['OK']
      });
      await alert.present();
    }
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
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
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
    this.datosQR = datosQR;
    // Aquí puedes procesar los datos QR como necesites
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }
}