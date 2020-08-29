import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutGameComponent } from './about-game/about-game.component';
import { DrinkWinComponent } from './drink-win/drink-win.component';
import { CompleteRegisterComponent } from './complete-register/complete-register.component';
import { PredictionsComponent } from './predictions/predictions.component';
import { RankingComponent } from './ranking/ranking.component';
import { LoginComponent } from './login/login.component';
import { PredictWinComponent } from './predict-win/predict-win.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminMacthesComponent } from './admin-macthes/admin-macthes.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ResetPasswordGuardService } from './services/reset-password-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DrinkWinComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about-game',
    component: AboutGameComponent
  },
  {
    path: 'drink-win',
    component: DrinkWinComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'predict-win',
    component: PredictWinComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'complete-register',
    component: CompleteRegisterComponent
  },
  {
    path: 'predictions',
    component: PredictionsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'ranking',
    component: RankingComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'terms-conditions',
    component: TermsConditionsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'server-error',
    component: ErrorPageComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [ResetPasswordGuardService]
  },
  {
    path: 'admin-matches',
    component: AdminMacthesComponent,
    canActivate: [AdminGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
