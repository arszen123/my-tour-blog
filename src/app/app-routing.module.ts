import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {FirebaseUnAuthGuard} from './guards/FirebaseUnAuthGuard';
import {FirebaseAuthGuard} from './guards/FirebaseAuthGuard';
import {UserViewComponent} from './pages/user-view/user-view.component';
import {MapComponent} from './components/map/map.component';
import {PostListComponent} from '@app-pages/post-list/post-list.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'login', component: LoginComponent, canActivate: [FirebaseUnAuthGuard]},
  {path: 'map', component: MapComponent},
  {path: 'user', children: [
      {path: 'me', component: UserViewComponent, canActivate: [FirebaseAuthGuard]},
      {path: ':uid', component: UserViewComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
