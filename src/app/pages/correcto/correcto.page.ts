import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario | undefined;

  constructor(private router: Router) {

    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras.state) {
      this.usuario = nav.extras.state['usuario'];
    } else {
      this.router.navigate(['/login']); 
    }
  }

  ngOnInit() {}

  navegarALogin() {
    this.router.navigate(['/login']);
  }
}


