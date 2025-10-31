import { Routes } from '@angular/router';
import { App } from './app';
import { ConfigComponent } from './config/config';
import { RequestListComponent } from './request-list/request-list';
import { ApprovelListComponent } from './approvel-list/approvel-list';


export const routes: Routes = [
//   { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '', component: App },
  { path: 'config', component: ConfigComponent },
  { path: 'requestlist', component: RequestListComponent },
  { path: 'approverlist', component: ApprovelListComponent }
];
