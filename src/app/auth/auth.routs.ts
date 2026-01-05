import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
export const authRouts: Routes = [
    {
        path: 'auth',
        component: RegisterPageComponent
    }
];