import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/services/products.services';
import { Product } from 'src/app/modelos/product.modelo';
import {Router} from '@angular/router'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { stockImage } from 'src/app/modelos/image.modelo';
import Swal from 'sweetalert2'
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-dahsboard',
  templateUrl: './dahsboard.component.html',
  styleUrls: ['./dahsboard.component.css']
})
export class DahsboardComponent implements OnInit {

  image: stockImage;
  products:Product[];
  
  id:string;
 

  form:FormGroup;
  nombre: FormControl= new FormControl("",[Validators.required]);
  info: FormControl= new FormControl("",[Validators.required]);
  precio: FormControl= new FormControl("",[Validators.required]);
  img: FormControl;
 
  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage!: string; // the response message to show to the user
  responseMessage2!: string; // the response message to show to the user
  responseMessage3!: string; // the response message to show to the user
  responseMessage4!: string; // the response message to show to the user
  constructor(
    private productosServicios: Products,
    private rutas: Router,
    private imagen: AngularFireStorage,
    private formBuilder: FormBuilder, private http: HttpClient
  ) { 
     this.form= this.formBuilder.group({
       nombre : this.nombre,
       info : this.info,
       precio: this.precio,
        /* imagen: this.imagen */
     })

  }

  ngOnInit(): void {
    this.productosServicios.getProducts().subscribe(
      products=>{
        this.products=products
      }
    )
    
  }

  onSubmit(value){
    
    if(!this.nombre.value||!this.info.value||!this.precio.value){
      Swal.fire({
        title: 'Error!',
        text: 'Faltan datos que rellenar',
        icon: 'error',
        confirmButtonText: 'Volver'
      })
    }

   if(this.nombre.value.length<4){
      this.responseMessage="Debe poner un nombre de por lo menos 4 caracteres";
      setInterval(()=>{
        this.responseMessage=""
      },6000);
    }
    if(this.info.value.length<10){
      this.responseMessage2="Debe llenar este campo por lo menos con 10 caracteres";
      setInterval(()=>{
        this.responseMessage2=""
      },6000);
    }

    if(!this.precio.value){
      this.responseMessage2="No ingreso precio alguno";
      setInterval(()=>{
        this.responseMessage2=""
      },6000);
    }
   
  


      if (this.form.status == "VALID" && this.honeypot.value == ""){
          /*   value.id = this.id; */
         if(this.image){
         
          this.productosServicios.uploadImage(value,this.image)
          this.form.reset();
         }else{
          Swal.fire({
            title: 'Error!',
            text: 'Guaradar el producto sin ninguna imagén',
            icon: 'error',
            confirmButtonText: 'No hay problema'
          })
        /*   value.id = this.id; */
          this.productosServicios.addProduct(value)
         }
          
        
        
      }
        
  
    }

    cargarIMG(event:any):void{
      this.image =  event.target.files[0]
      console.log(this.img);
    }

  }


   
  


