import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/services/products.services';
import { Product } from 'src/app/modelos/product.modelo';
import { stockImage } from 'src/app/modelos/image.modelo';
import {Router} from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  image:stockImage;
  products: Product[];
  product:Product={
    nombre:'',
    info: '',
    precio: 0,
    img:"url",
  }

  constructor(
    private productosService:Products,
    private rutas:Router
  ) { }

  ngOnInit(): void {
     this.productosService.getProducts().subscribe(
      products=>{
        this.products=products
        console.log(this.products)
      }
     )
  }

}
