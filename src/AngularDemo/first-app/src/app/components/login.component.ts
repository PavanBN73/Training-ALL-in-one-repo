import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `

        <h1>Login Form</h1>

        <form [formGroup]="loginForm"
              (ngSubmit)="login()">

            <div>
                Username :
                <input
                    type="text"
                    formControlName="username">
            </div>

            @if(loginForm.get('username')?.invalid &&
                loginForm.get('username')?.touched){

                <p>Username is required</p>
            }

            <br>

            <div>
                Password :
                <input
                    type="password"
                    formControlName="password">
            </div>

            @if(loginForm.get('password')?.invalid &&
                loginForm.get('password')?.touched){

                <p>Password should be minimum 6 characters</p>
            }

            <br>

            <button
                type="submit"
                [disabled]="loginForm.invalid">

                Login

            </button>

        </form>
    `
})
export class LoginComponent {
    constructor(private router: Router) { }

    loginForm = new FormGroup({

        username: new FormControl('', [
            Validators.required
        ]),

        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ])
    });

    login() {

        if (this.loginForm.valid) {

            const username = this.loginForm.value.username;
            const password = this.loginForm.value.password;

            // Static authentication
            if (
                username === 'pavan' &&
                password === '12345678'
            ) {

                console.log('Login successful');

                this.router.navigate(['/transaction']);

            } else {

                alert('Invalid username or password');

            }
        }
    }
}

