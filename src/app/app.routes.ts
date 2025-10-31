import { Routes } from '@angular/router';
import { UserComponent } from './user/user';
import { ProductComponent } from './product/product';
import { App } from './app';


export const routes: Routes = [
//   { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '', component: App },
  { path: 'user', component: UserComponent },
  { path: 'product', component: ProductComponent }
];
