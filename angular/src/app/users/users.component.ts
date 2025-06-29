import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { User, UserMain } from '../models';
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
  usersForYear: User[] = [];
  AllUsers: UserMain[] = [];
  showAllUsers: boolean = true;
  userListLength: number = 0;
  year: number = 0;
  loading: boolean = false;
  searchTerm: string = "";
  queryParamsSubscription: Subscription | undefined;

  constructor(
    private canvasService: CanvasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.searchTerm = "";
      const paramYear = params['year'];
      const paramSearchTerm = params['search'];
      if (paramSearchTerm) {
        this.searchTerm = paramSearchTerm;
      }
      if (paramYear) {
        this.year = this.canvasService.checkIfYearHasStats(+paramYear);
      } else {
        this.year = this.canvasService.checkIfYearHasStats(new Date().getFullYear());
      }
      this.getAllUsers();
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  getAllUsers() {
    this.showAllUsers = true;
    this.canvasService.getAllUsers().subscribe({
      next: (data) => {
        if (this.searchTerm.length > 0) {
          this.AllUsers = data.filter(user => user.username.toLowerCase().includes(this.searchTerm.toLowerCase()));
        } else {
          this.AllUsers = data;
        }
        this.userListLength = this.AllUsers.length;
        this.loading = false;
      }
    });
  }

  getUsersForYear(year: number) {
    this.showAllUsers = false;
    this.year = year;
    this.canvasService.getUsersForYear(year).subscribe({
      next: (data) => {
        if (this.searchTerm.length > 0) {
          this.usersForYear = data.filter(user => user.username.toLowerCase().includes(this.searchTerm.toLowerCase()));
        } else {
          this.usersForYear = data;
        }
        this.userListLength = this.usersForYear.length;
        this.loading = false;
      }
    });
  }

  goToUser(username: string, year: number) {
    this.router.navigate([`./users/${username}`], { queryParams: { year: year } });
  }

   isUserMain(user: UserMain | User): boolean {
    return user.type === 'UserMain';
  }

}
