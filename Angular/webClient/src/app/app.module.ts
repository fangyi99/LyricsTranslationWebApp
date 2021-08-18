import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
/*Song Service*/
import { SongListingService } from './song-listing.service';
import { SongListingComponent } from './song-listing/song-listing.component';
import { SongDetailsComponent } from './song-details/song-details.component';
import { UserSongsComponent } from './user-songs/user-songs.component';
/*Account Service*/
import { AccountService } from './account.service';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountListingComponent } from './account-listing/account-listing.component';
/*Auth Service*/
import {AuthService} from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    SongListingComponent,
    SongDetailsComponent,
    LoginComponent,
    AccountDetailsComponent,
    RegisterComponent,
    AccountListingComponent,
    UserSongsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', component: SongListingComponent},
      {path:':id', component: SongDetailsComponent},
      {path: 'user-songs/:user', component: UserSongsComponent},
      {path:'api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=:targetedLanguage', component: SongDetailsComponent},
      {path: '44355/api/accounts/login', component: LoginComponent},
      {path: '44355/api/accounts/register', component: RegisterComponent},
      {path: '44382/gateway/accounts', component: AccountListingComponent},
      {path: '44382/gateway/accounts/:username', component: AccountDetailsComponent}
    ])
  ],
  providers: [SongListingService, AccountService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
