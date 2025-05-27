import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { User } from '../models';
import { CanvasService } from '../canvas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { FooterComponent } from "../footer/footer.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [HeaderComponent, LoadingComponent, FooterComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  year: number = 0;
  loading: boolean = false;
  searchTerm: string | undefined;
  queryParamsSubscription: Subscription | undefined;

  constructor(
    private canvasService: CanvasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.searchTerm = undefined;
      const paramYear = params['year'];
      if (paramYear) {
        this.year = this.canvasService.checkIfYearHasStats(+paramYear);
      } else {
        this.year = this.canvasService.checkIfYearHasStats(new Date().getFullYear());
      }
      const paramSearchTerm = params['search'];
      this.canvasService.getUsersForYear(this.year).subscribe({
        next: (data) => {
          if (paramSearchTerm) {
            this.searchTerm = paramSearchTerm;
            this.users = data.filter(user => user.username.toLowerCase().includes(paramSearchTerm.toLowerCase()));
          } else {
            this.users = data;
          }
          this.loading = false;
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  goToUser(username: string) {
    this.router.navigate([`./users/${username}`], { queryParams: { year: this.year } });
  }

}
