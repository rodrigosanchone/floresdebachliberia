import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
 import {FlashMessagesService} from 'angular2-flash-messages';
 import {LoginServices} from '../../servicios/login.services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService,
    private loginService: LoginServices
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['/dahsboard']);
      }
    })
  }

  login(){
    this.loginService.login(this.email,this.password).then(
      res=>{
        this.router.navigate(['/dahsboard']);
      }
    ).catch(
      error=>{
        this.flashMessages.show('Contaseña o Usuario Incorrectos',{

          cssClass: 'alert-dandger',
          timeout:4000
        })
      }
    )
  }

}
