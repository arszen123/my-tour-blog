import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';

import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './pages/login/login.component';
import {FirebaseModule} from './firebase.module';
import {SidenavComponent} from './components/navigation/sidenav/sidenav.component';
import {ToolbarComponent} from './components/navigation/toolbar/toolbar.component';
import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {UserViewComponent} from './pages/user-view/user-view.component';
import {UserServiceService} from './services/user-service.service';
import {MatCardModule, MatDialogModule} from '@angular/material';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {Nl2brPipe} from './directives/nl2br.pipe';
import {MapComponent} from './pages/map/map.component';
import {NavigatorService} from './services/navigator.service';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {ImageUploadComponent} from './components/image-upload/image-upload.component';
import {PostCreateComponent} from './components/post/post-create/post-create.component';
import {PostItemComponent} from './components/post/post-item/post-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    ToolbarComponent,
    UserViewComponent,
    UserEditComponent,
    MapComponent,
    Nl2brPipe,
    ImageUploadComponent,
    PostCreateComponent,
    PostItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxAuthFirebaseUIModule.forRoot(environment.config.firebase),
    MaterialModule,
    FormsModule,
    FirebaseModule,
    AgmCoreModule.forRoot({
      apiKey: environment.config.google_maps_api_key
    }),
    AgmSnazzyInfoWindowModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule
  ],
  entryComponents: [
    UserEditComponent
  ],
  providers: [UserServiceService, NavigatorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
