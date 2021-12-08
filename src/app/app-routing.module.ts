import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountnoComponent } from './accountno/accountno.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'landing',
    pathMatch : 'full'
  },
  {
    path : 'landing',
    component : LandingComponent ,
  },
  {
    path : 'accountno',
    component : AccountnoComponent ,
  },
  {
    path : '**',
    redirectTo : ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
