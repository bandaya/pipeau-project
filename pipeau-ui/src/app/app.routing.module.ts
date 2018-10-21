import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {ProfilesComponent} from "./features/profiles/profiles.component";
import {HasProfileGuard} from "./core/guards/has-profile.guard";


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent , canActivate: [HasProfileGuard]},
  { path: 'profiles', component: ProfilesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
