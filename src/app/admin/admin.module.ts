import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { IndexComponent } from "./page/index/index.component";
import { HomeComponent } from "./page/home/home.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { LoginComponent } from "./page/login/login.component";
import { OrganizationLogComponent } from "./page/organization-log/organization-log.component";
import { OrganizationLegalComponent } from "./page/organization-legal/organization-legal.component";
import { QuantityDateComponent } from "./page/quantity-date/quantity-date.component";
import { QuantityBrandnameComponent } from "./page/quantity-brandname/quantity-brandname.component";
import { QuantityOrganizationLegalComponent } from "./page/quantity-organization-legal/quantity-organization-legal.component";
import { ListUserComponent } from './page/users/list-user/list-user.component';
import { ListCategoryComponent } from './page/categories/list-category/list-category.component';
import { CreateCategoryComponent } from './page/categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './page/categories/update-category/update-category.component';
import { DetailCategoryComponent } from './page/categories/detail-category/detail-category.component';
import { ListProductComponent } from './page/products/list-product/list-product.component';
import { CreateProductComponent } from './page/products/create-product/create-product.component';
import { UpdateProductComponent } from './page/products/update-product/update-product.component';
import { DetailProductComponent } from './page/products/detail-product/detail-product.component';
import { ListAddressComponent } from './page/AddressAccount/list-address/list-address.component';
import { UpdateAddressComponent } from './page/AddressAccount/update-address/update-address.component';
import { CreateAddressComponent } from './page/AddressAccount/create-address/create-address.component';
import { DetailAddressComponent } from './page/AddressAccount/detail-address/detail-address.component';
import { ListCommentComponent } from './page/comment/list-comment/list-comment.component';
import { CreateCommentComponent } from './page/comment/create-comment/create-comment.component';
import { UpdateCommentComponent } from './page/comment/update-comment/update-comment.component';
import { DetailCommentComponent } from './page/comment/detail-comment/detail-comment.component';
import { ListPaymentComponent } from './page/payment/list-payment/list-payment.component';
import { CreatePaymentComponent } from './page/payment/create-payment/create-payment.component';
import { UpdatePaymentComponent } from './page/payment/update-payment/update-payment.component';
import { DetailPaymentComponent } from './page/payment/detail-payment/detail-payment.component';
import { ListOrderComponent } from './page/orders/list-order/list-order.component';
import { UpdateDateOrderComponent } from './page/orders/update-date-order/update-date-order.component';
import { DetailOrderComponent } from './page/orders/detail-order/detail-order.component';
import { CreateUserComponent } from './page/users/create-user/create-user.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { ListAccountComponent } from './page/account/list-account/list-account.component';
import { UpdateAccountComponent } from './page/account/update-account/update-account.component';
import { DetailAccountComponent } from './page/account/detail-account/detail-account.component';
import { CreateAccountComponent } from './page/account/create-account/create-account.component';
import { CKEditorModule } from "ngx-ckeditor";

@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    OrganizationLogComponent,
    OrganizationLegalComponent,
    QuantityDateComponent,
    QuantityBrandnameComponent,
    QuantityOrganizationLegalComponent,
    ListUserComponent,
    ListCategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    DetailCategoryComponent,
    ListProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    DetailProductComponent,
    ListAddressComponent,
    UpdateAddressComponent,
    CreateAddressComponent,
    DetailAddressComponent,
    ListCommentComponent,
    CreateCommentComponent,
    UpdateCommentComponent,
    DetailCommentComponent,
    ListPaymentComponent,
    CreatePaymentComponent,
    UpdatePaymentComponent,
    DetailPaymentComponent,
    ListOrderComponent,
    UpdateDateOrderComponent,
    DetailOrderComponent,
    CreateUserComponent,
    ForbiddenComponent,
    ListAccountComponent,
    UpdateAccountComponent,
    DetailAccountComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    CKEditorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AdminModule { }
