import { Component, OnInit } from '@angular/core';
import { AuthService } from'../../../appServices/auth.service'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



import { User } from 'src/app/shared/interfaces/user';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser:any;
  userSession!: User;

  bool1:boolean = false
  bool2:boolean = false
  bool3:boolean = false

  constructor(
    private AuthService:AuthService,
    public router: Router,
    private spinner: NgxSpinnerService,

  ) { 
    // console.log(AuthService.userSession)
    this.userSession = AuthService.userSession? AuthService.userSession.user:{};
  }

  ngOnInit(): void {
    
    let dataLocal: any = localStorage.getItem('_session.subio.CU')
     this.currentUser = JSON.parse(dataLocal)
    
  }

  clickB1(){
    this.bool1 = true
    this.bool2 = false
    this.bool3 = false
  }
  clickB2(){
    this.bool1 = false
    this.bool2 = true
    this.bool3 = false
  }
  clickB3(){
    this.bool1 = false
    this.bool2 = false
    this.bool3 = true
  }
  

  onPressSignOut(){
    //alert("sing out call ")
    this.AuthService.logout()
    this.router.navigate(['/login'])
    location.reload()

  }

}
