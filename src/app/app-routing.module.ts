import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';
import { LoginComponent } from './admin/page/login/login.component';

const routes: Routes = [
  {path:'',loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[AuthGuardService]},
  {path:'Medlatec/login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
