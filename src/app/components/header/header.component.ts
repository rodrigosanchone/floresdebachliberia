import { Component, OnInit } from '@angular/core';
import { LoginServices } from '../../services/login.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedINUser: string;
  constructor(
    private loginService: LoginServices,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedINUser = auth.email;
      }
      else{
        this.isLoggedIn= false;
      }
    });
  }

  logOut(){
    this.loginService.logout();
    this.isLoggedIn= false;
    this.router.navigate(['/login']);
  }

}
