import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {
        path: 'login',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '', component: AppLayoutComponent,
        children: [
            {
                path: 'app',
                loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
        ]
    },
    {
        path: 'notfound',
        loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule)
    },
    {path: '**', redirectTo: '/notfound'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
