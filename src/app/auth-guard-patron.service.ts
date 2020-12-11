import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class AuthGuardPatronService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    const currentUser = this.auth.getUserDetails();

    if (!this.auth.isLoggedIn() || currentUser.roleID != 2) {
      this.router.navigateByUrl('/login')
      return false
    }

    var hasAccess = false;

    switch (state.url) {
      case '/registration':
        hasAccess = currentUser.client.user_reg;
        break;
      case '/trackingCameraConfig':
      case '/trackingReport':
      case '/liveTrackingReport':
        hasAccess = currentUser.client.tracking;  
        break;
      case '/frInteractiveVideo':
        hasAccess = currentUser.client.fr_inter_video;
        break;
      case '/smileToVote':
        hasAccess = currentUser.client.smileToVote;
        break;
      default:
        hasAccess = true;
        break;
    }

    if (hasAccess) {
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;  
    }
  }
}
