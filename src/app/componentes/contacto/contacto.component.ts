import { Component, OnInit } from '@angular/core';
import {MensajeService} from '../../servicios/mensajes.services';
import {Mensaje} from '../../modelo/mensajes.modelo';
//import { AngularFireStorage } from '@angular/fire/storage';
import { FlashMessagesService } from 'angular2-flash-messages';
//import{archivoImage} from '../../modelo/image.modelo';
//import { Router } from '@angular/router'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})



export class ContactoComponent implements OnInit {

  mensaje: Mensaje={
    nomb:'',
    mensa:'',
    telefono:'',
    email: '',
   }

   
    constructor(
     // private _http:HttpClient,
     // private flashMessages: FlashMessagesService,
     private mensajeServicios:MensajeService,
     private flashMessages: FlashMessagesService,
    ) { 
      
    }

  ngOnInit(): void {

   
    
  }

  
  enviarMensaje({value,valid}:{value:Mensaje,valid:boolean}){
     if(!valid){
      this.flashMessages.show('Por favor llena el formulario de forma correctar',{
        cssClass: 'alert-danger', timeout:4000
      });
     
    } else{
       // this.productosServicios.uploadIMage(value,this.image);
       this.mensajeServicios.agregarMensaje(value);
      // this.productosServicios.agregarProducto1(value);

       alert("Mensaje guardado con exito");
     
     }
  }

  buscar(){
    alert("Función en mantenimiento")
  }

 

}
