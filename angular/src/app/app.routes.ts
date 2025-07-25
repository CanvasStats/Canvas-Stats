import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserStatsComponent } from './users/user-stats/user-stats.component';
import { DrawComponent } from './draw/draw.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BetaComponent } from './beta/beta.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { FaqComponent } from './faq/faq.component';
import { CustomComponent } from './custom/custom.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UsersComponent},
    {path: 'users/:username', component: UserStatsComponent},
    {path: 'draw', component: DrawComponent},
    {path: 'beta', component: BetaComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'advanced', component: CustomComponent},
    {path: '**', component: NotFoundComponent}
];
