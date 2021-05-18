import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../servicios/productos.service';
import {Producto} from '../../modelo/producto.modelo';
import{archivoImage} from '../../modelo/image.modelo';
import { Router } from '@angular/router'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  image: archivoImage;
   productos: Producto[];
   producto: Producto={
    nombre:'',
    info: '',
    precio: 0,
    img:"url",
   }

   
   

  constructor(private productosServicios:ProductosService,
    private  rutas:  Router
    
   ) { }

  ngOnInit(): void{
    this.productosServicios.getProductos().subscribe(
       productos=>{
         this.productos= productos;
         console.log(this.productos);
       }
    )

   
  }
     
  buscando(productoBuscar:string){
    this.rutas.navigate(['/busqueda',productoBuscar]);
  }

}
