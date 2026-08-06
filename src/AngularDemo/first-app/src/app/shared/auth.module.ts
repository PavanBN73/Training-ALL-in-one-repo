import { NgModule } from "@angular/core";

import { LoginComponent } from "../components/login.component";


@NgModule({
    imports: [
        LoginComponent
   ],

    exports: [
        LoginComponent
    ]
})
export class AuthModule {
}