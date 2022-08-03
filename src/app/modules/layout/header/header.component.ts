import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../appServices/auth.service'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



import { User } from 'src/app/shared/interfaces/user';
import { HomeService } from '../home.service';
import * as moment from 'moment';
import { GlobleDataserviceService } from 'src/app/appServices/globle-dataservice.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  userSession!: User;
  courseDate: any;
  programInstance:any;
  courseDateEnd:any;

  bool1: boolean = false
  bool2: boolean = false
  bool3: boolean = false

  constructor(
    private AuthService: AuthService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private _globledataService:GlobleDataserviceService
   

  ) {
    // console.log(AuthService.userSession)
    this.userSession = AuthService.userSession ? AuthService.userSession.user : {};
  }

  ngOnInit(): void {

    let dataLocal: any = localStorage.getItem('_session.subio.CU')
    this.currentUser = JSON.parse(dataLocal)

    //

  }

  coursedata(){
    this.currentUser
    let userID =this.currentUser.user.userID
    console.log("calling " ,this.currentUser.user.userID , userID)
    this._globledataService.getHomeContent(userID).subscribe((results:any) => {
          console.log("prog data from headerrr", results.userProgramInstance[0].dateStart)
          var CurrentDate = moment().format();
          this.programInstance = results.userProgramInstance[0];
          console.log("program data  from headrrrr", this.programInstance)
          this.courseDate = String(moment(results.userProgramInstance[0].dateStart).format())
          this.courseDateEnd = String(moment(results.userProgramInstance[0].dateEnd).format())
          //console.log("+++" , )
    
        })
    
    

  } 

  clickB1() {
    this.bool1 = true
    this.bool2 = false
    this.bool3 = false
  }
  clickB2() {
    this.bool1 = false
    this.bool2 = true
    this.bool3 = false
  }
  clickB3() {
    this.bool1 = false
    this.bool2 = false
    this.bool3 = true
  }


  onPressSignOut() {
    //alert("sing out call ")
    this.AuthService.logout()
    this.router.navigate(['/login'])
    location.reload()

  }

}
