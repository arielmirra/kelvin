import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Import Containers
import {DefaultLayoutComponent} from './containers';
import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {LoginComponent} from './views/login/login.component';

export const routes: Routes = [
    // {
    //   path: 'admin',
    //   component: AdminComponent,
    //   data: {
    //     title: 'Login Page'
    //   },
    //   children: [
    //     {
    //       path: 'register',
    //       component: AdminRegisterComponent
    //     },
    //     {
    //       path: 'login',
    //       component: AdminLoginComponent
    //     },
    //     {
    //       path: 'dashboard',
    //       component: AdminRegisterComponent
    //     }
    //   ]
    // },
    // {
    //   path: 'client',
    //   component: ClientComponent,
    //   data: {
    //     title: 'Login Page'
    //   },
    //   children: [
    //     {
    //       path: 'register',
    //       component: ClientRegisterComponent
    //     },
    //     {
    //       path: 'login',
    //       component: ClientLoginComponent
    //     },
    //     {
    //       path: 'dashboard',
    //       component: ClientRegisterComponent
    //     }
    //   ]
    // },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: DefaultLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: '',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'map',
                loadChildren: './views/base/base.module#BaseModule'
            },
            {
                path: 'base',
                loadChildren: './views/base/base.module#BaseModule'
            },
            {
                path: 'buttons',
                loadChildren: './views/buttons/buttons.module#ButtonsModule'
            },
            {
                path: 'charts',
                loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
            },
            {
                path: 'icons',
                loadChildren: './views/icons/icons.module#IconsModule'
            },
            {
                path: 'notifications',
                loadChildren: './views/notifications/notifications.module#NotificationsModule'
            },
            {
                path: 'theme',
                loadChildren: './views/theme/theme.module#ThemeModule'
            },
            {
                path: 'widgets',
                loadChildren: './views/widgets/widgets.module#WidgetsModule'
            }
        ]
    },
    {
        path: 'client',
        component: DefaultLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'base',
                loadChildren: './views/base/base.module#BaseModule'
            },
            {
                path: 'buttons',
                loadChildren: './views/buttons/buttons.module#ButtonsModule'
            },
            {
                path: 'charts',
                loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
            },
            {
                path: 'icons',
                loadChildren: './views/icons/icons.module#IconsModule'
            },
            {
                path: 'notifications',
                loadChildren: './views/notifications/notifications.module#NotificationsModule'
            },
            {
                path: 'theme',
                loadChildren: './views/theme/theme.module#ThemeModule'
            },
            {
                path: 'widgets',
                loadChildren: './views/widgets/widgets.module#WidgetsModule'
            }
        ]
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Page 500'
        }
    },
    {
        path: '**',
        component: P404Component,
        data: {
            title: 'Page 404'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
