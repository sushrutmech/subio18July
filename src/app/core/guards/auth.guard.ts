import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../appServices/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  defauluRedirectURL: string = '/layout/home'
  currentUser:any 
  app_session_name:any

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    let dataLocal: any = localStorage.getItem('_session.subio.CU')
    let currentUser = JSON.parse(dataLocal)
    
    console.log("*****", currentUser)
    if (currentUser) {
      //this.router.navigate(['/layout/home']);
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });


    return false;
  }

}
