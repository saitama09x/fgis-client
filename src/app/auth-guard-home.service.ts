import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class AuthGuardHomeService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {      
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
    
    return false
  }
}
