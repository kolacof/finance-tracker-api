import { Component } from '@angular/core';

@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.css']
})
export class SidevarComponent {
  ngOnInit(){
  }
  slider_1= true;
  slider_2= true;
  slider_3= true;
  cambiarEstadoMenu(id:number){
    switch(id){
      case 1:
        this.slider_1=!this.slider_1;
      break;
      case 2:
        this.slider_2=!this.slider_2;
      break;
      case 3:
        this.slider_3=!this.slider_3;
      break;
    }
  }
}
