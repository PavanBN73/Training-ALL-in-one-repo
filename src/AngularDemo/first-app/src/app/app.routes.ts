import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard.component';
import { Transaction } from './components/transaction.component';
import { LoginComponent } from './components/login.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'dashboard',
        component: Dashboard
    },

    {
        path: 'transaction',
        component: Transaction
    }
];