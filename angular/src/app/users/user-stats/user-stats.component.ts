import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CanvasService } from '../../canvas.service';
import { ColorsCounts, User } from '../../models';
import { HeaderComponent } from "../../header/header.component";
import { LoadingComponent } from "../../loading/loading.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FooterComponent } from "../../footer/footer.component";

class YearStats {
  constructor(
    public year: number,
    public numberOfusers: number
  ) { }
}

@Component({
  selector: 'app-user-stats',
  imports: [HeaderComponent, LoadingComponent, CommonModule, FooterComponent, RouterModule],
  templateUrl: './user-stats.component.html',
  styleUrl: './user-stats.component.css'
})
export class UserStatsComponent implements OnInit {
  year: number = 0;
  username: string = "";
  showResults: boolean = false;
  user!: User;
  userColors!: ColorsCounts;
  wasUserFound: boolean = true;
  loading: boolean = true;
  years = [new YearStats(2025, 638), new YearStats(2024, 1912), new YearStats(2023, 2204)];
  otherYearsForUser: number[] = [];
  yearStat!: YearStats;
  buttonColors: string[] = ['btn magenta', 'btn azure', 'btn rust', 'btn red'];
  queryParamsSubscription: Subscription | undefined;

  constructor(
    private canvasService: CanvasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // set the number of users for the year and the other years to link to
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const paramYear = params['year'];
      if (paramYear) {
        this.year = +paramYear;
        let getYearStats = this.years.find(year => {
          return year.year === this.year;
        });
        if (getYearStats != null) {
          this.yearStat = getYearStats;
        } else {
          this.yearStat = this.years[0];
          this.year = this.yearStat.year;
        }
      }
      // get user data
      let paramUsername = this.route.snapshot.paramMap.get('username');
      if (paramUsername) {
        this.username = paramUsername;
        this.getUserData(this.year);
        this.getOtherYearsForUsers();
      }
    });

  }

  getUserData(year: number) {
    //get user stats execpt for color counts
    this.canvasService.getUserByUsername(this.year, this.username).subscribe({
      next: (data) => {
        this.user = data!;
        //get color counts for user
        this.canvasService.getColorCountsForUsername(this.year, this.username).subscribe({
          next: (data) => {
            this.userColors = data!;
            this.loading = false;
          }
        });
      }
    });
  }

  getOtherYearsForUsers() {
    this.canvasService.getOtherYearsForUser(this.username, this.year).subscribe({
      next: (data) => {
        this.otherYearsForUser = data;
      }
    })
  }

  sendToUsersList() {
    this.router.navigate(['/users'], { queryParams: { year: this.year } });
  }

  sendUserToAnotherStatsYear(year: number) {
    this.canvasService.clearData();
    this.router.navigate([`./users/${this.username}`], { queryParams: { year: year } });
  }

  sendUserToDraw(backgroundChoice: number) {
    if (backgroundChoice == 1) {
      //send to white background
      this.router.navigate(['./draw'], { queryParams: { sentFrom: 'user', year: this.year, background: 'white', username: this.username } });
    } else {
      //send to transparent background
      this.router.navigate(['./draw'], { queryParams: { sentFrom: 'user', year: this.year, background: 'transparent', username: this.username } });
    }
  }

  getRanking(): string {
  const rank: number = this.user.userRank;
  const lastTwoDigits: number = rank % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return rank + "th";
  }
  const lastDigit: number = rank % 10;
  switch (lastDigit) {
    case 1:
      return rank + "st";
    case 2:
      return rank + "nd";
    case 3:
      return rank + "rd";
    default:
      return rank + "th";
  }
}

}
