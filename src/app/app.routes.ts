import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriptomonedasComponent } from '../components/criptomonedas/criptomonedas.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

export const routes: Routes = [
  {path: '',redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: CriptomonedasComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
