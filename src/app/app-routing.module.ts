import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
