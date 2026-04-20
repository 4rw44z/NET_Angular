import { authGuard } from '../core/guards/auth-guard';
import { Home } from '../features/home/home';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('../features/home/home').then(m => m.Home) },
    { // dummy route to apply the auth guard to all child routes
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', loadComponent: () => import('../features/members/members-list/members-list').then(m => m.MembersList) },
            { path: 'members/:id', loadComponent: () => import('../features/members/member-detailed/member-detailed').then(c => c.MemberDetailed)},
            { path: 'lists', loadComponent: () => import('../features/lists/lists').then(m => m.Lists) },
            { path: 'messages', loadComponent: () => import('../features/messages/messages').then(m => m.Messages) },
        ]
    },
    { path: '**', component: Home }
];
