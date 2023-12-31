import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService:AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.checkUserLoggedIn(); // Replace this with your actual logic to check if the user is logged in

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private checkUserLoggedIn(): boolean {
    // Replace this with your actual logic to check if the user is logged in
    // For example, you can check if there is an active session or a token in local storage
    // Return true if the user is logged in, otherwise return false
    console.log(this.authService.isTokenExpired())
    console.log(this.authService.isLoggedIn())
    return !this.authService.isTokenExpired() && this.authService.isLoggedIn(); // Assuming the user is not logged in
  }
}
