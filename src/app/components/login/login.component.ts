import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {LoginServices} from '../../services/login.services'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(
    private router: Router,
    private loginService:LoginServices,
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth=>{
        if(auth){
          this.router.navigate(['/dashboard']);
        }
      }
    )
  }

  login(){
    this.loginService.login(this.email,this.password).then(
      res=>{
        this.router.navigate(['/dashboard']);
        alert('HOLA')
      }
    ).catch(
      error=>{  
        Swal.fire({
          title: 'Error!',
          text: 'El usuario o contraseña estan mal',
          icon: 'error',
          confirmButtonText: 'Volver'
        })
      }
    )
  }

}
