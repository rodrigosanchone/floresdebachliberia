import { Component, OnInit, ɵConsole } from '@angular/core';
import {ProductosService} from '../../servicios/productos.service';
import {Producto} from '../../modelo/producto.modelo';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import{archivoImage} from '../../modelo/image.modelo';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  image: archivoImage;
  producto: Producto={
    nombre:'',
    info: '',
    precio: 0,
    img:''
   }

   id:string;

  constructor(
    private productosServicios:ProductosService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.productosServicios.getProducto(this.id).subscribe(producto=>{
      this.producto= producto;
      }
    )
  }

  editarProducto({value,valid}:{value:Producto,valid:boolean}){
    if(!valid){
      this.flashMessages.show('Llene el formulario Correctamente',{
        ccsClass:'alert-danger',
        timeout:4000
      });
    }else{
      value.id = this.id;
      this.productosServicios.subirotraIMage(value,this.image);
      console.log("llamando a la funcion editar ")
      this.router.navigate(['/dahsboard']);
    }
    }

    eliminar(){
      if(confirm("Seguro que desea eliminar el producto")){
        this.productosServicios.eliminarProducto(this.producto);
        console.log()
        this.router.navigate(['/dahsboard']);
      }
    }

    cargarIMG(event:any):void{
      this.image =  event.target.files[0]
     // console.log(this.img);
    }
  
  }



