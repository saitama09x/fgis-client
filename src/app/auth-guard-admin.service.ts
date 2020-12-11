import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class AuthGuardAdminService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    const currentUser = this.auth.getUserDetails();

    if (!this.auth.isLoggedIn() || currentUser.roleID != 1) {
      this.router.navigateByUrl('/login')
      return false
    }
    
    return true
  }
}
