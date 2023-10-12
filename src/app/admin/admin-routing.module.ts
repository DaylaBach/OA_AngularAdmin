import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { IndexComponent } from './page/index/index.component';
import { ListUserComponent } from './page/users/list-user/list-user.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { ListCategoryComponent } from './page/categories/list-category/list-category.component';
import { CreateCategoryComponent } from './page/categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './page/categories/update-category/update-category.component';
import { DetailCategoryComponent } from './page/categories/detail-category/detail-category.component';
import { ListProductComponent } from './page/products/list-product/list-product.component';
import { CreateProductComponent } from './page/products/create-product/create-product.component';
import { UpdateProductComponent } from './page/products/update-product/update-product.component';
import { DetailProductComponent } from './page/products/detail-product/detail-product.component';
import { ListPaymentComponent } from './page/payment/list-payment/list-payment.component';
import { CreatePaymentComponent } from './page/payment/create-payment/create-payment.component';
import { UpdatePaymentComponent } from './page/payment/update-payment/update-payment.component';
import { DetailPaymentComponent } from './page/payment/detail-payment/detail-payment.component';
import { ListAddressComponent } from './page/AddressAccount/list-address/list-address.component';
import { CreateAddressComponent } from './page/AddressAccount/create-address/create-address.component';
import { ListCommentComponent } from './page/comment/list-comment/list-comment.component';
import { CreateCommentComponent } from './page/comment/create-comment/create-comment.component';
import { UpdateCommentComponent } from './page/comment/update-comment/update-comment.component';
import { DetailCommentComponent } from './page/comment/detail-comment/detail-comment.component';
import { CreateUserComponent } from './page/users/create-user/create-user.component';
import { ListOrderComponent } from './page/orders/list-order/list-order.component';
import { UpdateDateOrderComponent } from './page/orders/update-date-order/update-date-order.component';
import { DetailOrderComponent } from './page/orders/detail-order/detail-order.component';
import { ListAccountComponent } from './page/account/list-account/list-account.component';
import { CreateAccountComponent } from './page/account/create-account/create-account.component';
import { UpdateAccountComponent } from './page/account/update-account/update-account.component';
import { DetailAccountComponent } from './page/account/detail-account/detail-account.component';
import { UpdateAddressComponent } from './page/AddressAccount/update-address/update-address.component';

const routes: Routes = [
  {path:'',component:IndexComponent,children:[
    {path:'',component:HomeComponent},
    {path:'user/list-user',component:ListUserComponent},
    {path:'user/create-user',component:CreateUserComponent},
    {path:'category/list-category',component:ListCategoryComponent},
    {path:'category/create-category',component:CreateCategoryComponent},
    {path:'category/update-category',component:UpdateCategoryComponent},
    {path:'category/detail-category',component:DetailCategoryComponent},
    {path:'product/list-product',component:ListProductComponent},
    {path:'product/create-product',component:CreateProductComponent},
    {path:'product/update-product',component:UpdateProductComponent},
    {path:'product/detail-product',component:DetailProductComponent},
    {path:'payment/list-payment',component:ListPaymentComponent},
    {path:'payment/create-payment',component:CreatePaymentComponent},
    {path:'payment/update-payment',component:UpdatePaymentComponent},
    {path:'payment/detail-payment',component:DetailPaymentComponent},
    {path:'address/list-address',component:ListAddressComponent},
    {path:'address/create-address',component:CreateAddressComponent},
    {path:'address/update-address',component:UpdateAddressComponent},
    {path:'comment/list-comment',component:ListCommentComponent},
    {path:'comment/create-comment',component:CreateCommentComponent},
    {path:'comment/update-comment',component:UpdateCommentComponent},
    {path:'comment/detail-comment',component:DetailCommentComponent},
    {path:'order/list-order',component:ListOrderComponent},
    {path:'order/update-order',component:UpdateDateOrderComponent},
    {path:'order/detail-order',component:DetailOrderComponent},
    {path:'account/list-account',component:ListAccountComponent},
    {path:'account/create-account',component:CreateAccountComponent},
    {path:'account/update-account',component:UpdateAccountComponent},
    {path:'account/detail-account',component:DetailAccountComponent},
  ]},
  {path: 'page/forbidden',component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }




