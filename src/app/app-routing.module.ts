import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleCalculatorComponent } from './components/simple-calculator/simple-calculator.component';


const routes: Routes = [
  {
    path: 'simple',
    component: SimpleCalculatorComponent
  },
  {
    path: '',
    redirectTo: 'simple',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'simple'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
