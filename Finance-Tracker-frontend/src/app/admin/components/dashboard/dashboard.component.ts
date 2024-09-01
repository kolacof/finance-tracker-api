import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidenav= true;

  cambiarEstadoMenu(){
    this.sidenav=!this.sidenav;
  }
}
