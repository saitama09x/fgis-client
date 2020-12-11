import { Routes } from '@angular/router';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
    {
        path: 'pages',
        loadChildren: () => import('../../pages/content-pages/content-pages.module').then(m => m.ContentPagesModule)

    },
    {
        path: '',
        loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule)

    }
];