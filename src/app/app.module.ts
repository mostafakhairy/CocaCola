import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, ErrorHandler } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CompleteRegisterComponent } from "./complete-register/complete-register.component";
import { AboutGameComponent } from "./about-game/about-game.component";
import { PredictionsComponent } from "./predictions/predictions.component";
import { RankingComponent } from "./ranking/ranking.component";
import { DrinkWinComponent } from "./drink-win/drink-win.component";
import { UserService } from "./services/user.service";
import { CommonService } from "./services/common.service";
import { ErrorHandling } from "./error-handler/error-handler";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { SmsService } from "./services/sms.service";
import { ConfirmPasswordDirective } from "./directives/confirm-password.directive";
import {
  TranslateLoader,
  TranslateService,
  TranslateModule
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoginComponent } from "./login/login.component";
import { CouponsService } from "./services/coupons.Service";

import { PredictWinComponent } from "./predict-win/predict-win.component";
import { MatchService } from "./services/match.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AdminMacthesComponent } from "./admin-macthes/admin-macthes.component";
import { TokenInterceptor } from "./services/tokenInterceptor";
import { TermsConditionsComponent } from "./terms-conditions/terms-conditions.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { CommingSoonComponent } from "./comming-soon/comming-soon.component";
import { RouteNewtabDirective } from "./directives/route-newtab.directive";
import { EasyPieChartModule } from 'ng2modules-easypiechart';
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("555544014814517")
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    CompleteRegisterComponent,
    AboutGameComponent,
    PredictionsComponent,
    RankingComponent,
    DrinkWinComponent,
    LoginComponent,
    ConfirmPasswordDirective,
    PredictWinComponent,
    ErrorPageComponent,
    NotificationsComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AdminMacthesComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    CommingSoonComponent,
    RouteNewtabDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    EasyPieChartModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    UserService,
    CommonService,
    SmsService,
    TranslateService,
    CouponsService,
    MatchService,
    AuthGuardService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // },
    { provide: ErrorHandler, useClass: ErrorHandling },

    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
