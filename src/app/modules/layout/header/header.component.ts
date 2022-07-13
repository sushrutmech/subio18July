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

  

  onPressSignOut(){
    //alert("sing out call ")
    this.AuthService.logout()
    this.router.navigate(['/login'])
    location.reload()

  }

}
