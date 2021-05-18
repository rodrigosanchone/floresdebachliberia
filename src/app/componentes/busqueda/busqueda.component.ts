import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../servicios/productos.service';
import {Producto} from '../../modelo/producto.modelo';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map, finalize} from 'rxjs/operators'
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  
  //image: archivoImage;
  productos: Producto[]=[];
  producto: Producto={
   nombre:'',
   info: '',
   precio: 0,
   img:"url"
  }
  constructor(private productoService: ProductosService,
    private parametros:ActivatedRoute) { }

    ngOnInit() {
    //  this.parametros.params.subscribe(params=>{
        //console.log(params['buscar']);
      //  this.producto=this.productoService.buscarProducto(params['buscar']) as any;
      
      //  console.log(this.productos);
     // })
    }

}
