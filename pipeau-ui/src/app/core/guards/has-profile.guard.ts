import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ProfilesService} from "../services/profiles.service";

@Injectable({
  providedIn: 'root'
})
export class HasProfileGuard implements CanActivate {

  constructor(
    private profiles:ProfilesService,
    private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.profiles.profiles.length>0){
      return true;
    }

    this.router.navigate(['profiles']);

    return false
  }
}
