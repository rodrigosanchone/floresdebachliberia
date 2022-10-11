import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/services/products.services';
import { Product } from 'src/app/modelos/product.modelo';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
 import { stockImage } from 'src/app/modelos/image.modelo'; 
import Swal from 'sweetalert2'
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id:string
  image: stockImage;
  product: Product={
  
  }

  form:FormGroup;
  nombre: FormControl= new FormControl;
  info: FormControl= new FormControl;
  precio: FormControl= new FormControl;
 
  img: FormControl;

  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage!: string; 
  responseMessage2!: string; 
  responseMessage4!: string; 

  constructor(
    private productosServicios: Products,
    private router: Router,
    private route: ActivatedRoute,
    private imagen: AngularFireStorage,
    private formBuilder: FormBuilder, private http: HttpClient
  ) {


     
  }
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.productosServicios.getProduct(this.id).subscribe(producto=>{
      this.product=producto
      this.form= this.formBuilder.group({
        nombre: this.product.nombre,
        info : this.product.info,
        precio: this.product.precio,
        
      })
    })
     
 
 
  
  }
  
 

    onSubmit(value){
      
       const nombre= this.form.get('nombre') as FormControl
        if(this.image){
         
          this.productosServicios.uploadImage2(value,this.image)
          
        }else{
      
          Swal.fire({
            title: 'Error!',
            text: 'Guardar el producto sin ninguna imagén',
            icon: 'error',
            confirmButtonText: 'No hay problema'
          })
          value.id = this.id
          this.productosServicios.edit(value)
    
        
      
    }

  }
  
  
    
  cargarIMG(event:any):void{
    this.image =  event.target.files[0]
    console.log(this.img);
  }

  delete(){
    if(confirm("Seguro que desea eliminar esto")){
      this.productosServicios.delete(this.product)
      this.router.navigate(['/dashboard'])
    }
  }

}
