import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../servicios/productos.service';
import {Producto} from '../../modelo/producto.modelo';
import { AngularFireStorage } from '@angular/fire/storage';
import { FlashMessagesService } from 'angular2-flash-messages';
import{archivoImage} from '../../modelo/image.modelo';
import { Router } from '@angular/router'
//import { Router } from '@angular/router';
//import { LoginServices } from  '../../login/login.services';
@Component({
  selector: 'app-dahsboard',
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.css']
})
export class DahsboardComponent implements OnInit {
 //isLoggedIn: boolean;
//loggedINUser: string;

  image: archivoImage;
  productos: Producto[];
  
  producto: Producto={
   nombre:'',
   info: '',
   precio: 0,
   img:'',
  }



  constructor(
    private productosServicios:ProductosService,
    private flashMessages: FlashMessagesService,
    private img: AngularFireStorage,
    private rutas:Router
//private router: Router,
//private loginService: LoginServices
    
    ) { }

  ngOnInit() {
    this.productosServicios.getProductos().subscribe(
      productos=>{
        this.productos= productos;
      })
/*
    this.loginService.getAuth().subscribe(auth=>{
        if(auth){
          this.isLoggedIn = true;
          this.loggedINUser = auth.email;
        }
        else{
          this.isLoggedIn= false;
        } 
      });
*/
   
  }

  

  agregarProducto({value,valid}:{value:Producto,valid:boolean}){
     if(!valid){
       this.flashMessages.show('Por favor llena el formulario',{
         cssClass: 'alert-danger', timeout:4000
       });  
     } else{
       // this.productosServicios.uploadIMage(value,this.image);
       this.productosServicios.preAgregarProducto(value,this.image);
      // this.productosServicios.agregarProducto1(value);

       alert("Producto Guardado");
     
     }
  }
  
 


  cargarIMG(event:any):void{
    this.image =  event.target.files[0]
    console.log(this.img);
  }

/*
  logOut(){
    this.loginService.logout();
    this.isLoggedIn= false;
    this.router.navigate(['/login']);
  }
*/


/*
public buscarProducto(buscar:string){
  this.rutas.navigate(['busqueda/:buscar',buscar]);
  console.log("funciona")
 }
*/

buscar(){
  alert("Función aún no funciona")
}


}
