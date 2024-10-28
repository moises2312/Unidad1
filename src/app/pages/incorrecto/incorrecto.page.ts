import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {
  private previousPage: string | undefined;

  constructor(private navController: NavController, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    
    //Verifica si previousNavigation existe y tiene finalUrl
    if (navigation?.previousNavigation?.finalUrl) {
      this.previousPage = navigation.previousNavigation.finalUrl.toString();
      console.log('Página anterior:', this.previousPage);
    } else {
      console.log('No hay navegación previa.');
    }
  }

  ngOnInit() {}

  incorrectoVolver() {
    console.log('Página anterior:', this.previousPage);
  
    //{Redirige según la página anterior almacenada
    if (this.previousPage) {
      if (this.previousPage.includes('/correo')) {
        console.log('Navegando de vuelta a /correo');
        this.navController.navigateBack('/correo');
      } else if (this.previousPage.includes('/pregunta')) {
        console.log('Navegando de vuelta a /pregunta');
        this.navController.navigateBack('/pregunta');
      } else {
        console.log('Redirección por defecto a /login');
        this.navController.navigateBack('/login');
      }
    } else {
      console.log('No hay historial, redirigiendo a /login');
      this.navController.navigateBack('/login');
    }
  }
}
