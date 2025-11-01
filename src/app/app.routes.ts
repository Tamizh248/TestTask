import { Routes } from '@angular/router';
import { App } from './app';
import { ConfigComponent } from './components/config/config';
import { RequestListComponent } from './components/request-list/request-list';
import { ApprovelListComponent } from './components/approvel-list/approvel-list';


export const routes: Routes = [
  { path: '', redirectTo: 'config', pathMatch: 'full' },
//   { path: '', component: App },
  { path: 'config', component: ConfigComponent },
  { path: 'requestlist', component: RequestListComponent },
  { path: 'approverlist', component: ApprovelListComponent }
];
