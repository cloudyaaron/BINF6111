import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InputComponent } from './input.component';

const routes: Routes = [
  {path: 'input', component: InputComponent},
  {path: 'app', component: AppComponent},
  {path: '', component: InputComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}