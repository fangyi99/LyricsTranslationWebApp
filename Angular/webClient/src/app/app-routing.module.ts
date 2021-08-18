import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
/*Song Service*/
import { SongListingComponent } from './song-listing/song-listing.component';
import { SongDetailsComponent } from './song-details/song-details.component';
import { UserSongsComponent } from './user-songs/user-songs.component';
/*Account Service*/
import { AccountDetailsComponent } from './account-details/account-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountListingComponent } from './account-listing/account-listing.component';

const routes: Routes = 
[  
  {path:'', component: SongListingComponent},
  {path:':id', component: SongDetailsComponent},
  {path:'api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=:targetedLanguage', component: SongDetailsComponent},
  {path: '44355/api/accounts/login', component: LoginComponent},
  {path: '44355/api/accounts/register', component: RegisterComponent},
  {
    path: '44382/gateway/accounts',
    component: AccountListingComponent,
    canActivate: [AuthGuard,RoleGuard]
  },
  {
    path: '44382/gateway/accounts/:username',
    component: AccountDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-songs/:user',
    component: UserSongsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
