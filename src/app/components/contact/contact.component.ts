import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form:FormGroup;
  nombre: FormControl= new FormControl("",[Validators.required]);
  email: FormControl= new FormControl("",[Validators.required,Validators.email]);
  telefono: FormControl= new FormControl("",[Validators.required]);
  mensaje:FormControl= new FormControl("",[Validators.required,Validators.maxLength(256)]);
  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage!: string; // the response message to show to the user
  responseMessage2!: string; // the response message to show to the user
  responseMessage3!: string; // the response message to show to the user
  responseMessage4!: string; // the response message to show to the user
 


  constructor(
    private formBuilder: FormBuilder, private http: HttpClient
  ) {
    /* this.siteKey="AKfycbx-mxnAKbd1eoiC1ZtcMMkznypaitxCrM4OScRjZaAD5_SzwKsF-cFr9FG5RtSQF5Gc";  */
    this.form = this.formBuilder.group({
      nombre: this.nombre,
      email: this.email,
      mensaje: this.mensaje,
      
     
    });
   }

  ngOnInit(): void {
  }

  onSubmit(e: Event){

    if(this.nombre.value.length < 3){
     
     
      this.responseMessage = "Este campo debe de tener minimo 3 caracteres";
      setInterval(()=>{
        this.responseMessage = "";
      },6000);   
    }

 



    if(!this.email.valid){
      this.responseMessage3 = "Debe ingresar un email valido";
      setInterval(()=>{
        this.responseMessage3 = "";
      },6000);  
    }

    if(!this.mensaje.value ){
      this.responseMessage4 = "Debe ingresar el mensaje.";
      setInterval(()=>{
        this.responseMessage4 = "";
      },6000);  
    } 
   
   
    if(!this.nombre.value || !this.email.value || !this.mensaje.value){
      Swal.fire({
        title: 'Error!',
        text: 'Faltan datos que rellenar',
        icon: 'error',
        confirmButtonText: 'Volver'
      })
     }else{
         emailjs.sendForm('service_1us1nrt', 'template_30xp4hy', e.target as HTMLFormElement, 'FTQL62Z9wtMauVA22')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
      Swal.fire({
        title: 'Enviado!',
        text: 'Gracias por contactarme, pronto te contactara',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      this.form.reset()
     }

    

 
   
  
     
  }
 

  }

  

