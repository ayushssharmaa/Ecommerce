import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent,
  },
  {
    component:SellerAddProductComponent,
    path:'seller-add-product',
    canActivate: [AuthGuard]
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
