import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserStatsComponent } from './users/user-stats/user-stats.component';
import { DrawComponent } from './users/draw/draw.component';
import { DrawColorComponent } from './draw-color/draw-color.component';
import { GraphsComponent } from './graphs/graphs.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UsersComponent},
    {path: 'users/:username', component: UserStatsComponent},
    {path: 'users/:username/draw', component: DrawComponent},
    {path: 'draw', component: DrawColorComponent},
    {path: 'graphs', component: GraphsComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent}
];
