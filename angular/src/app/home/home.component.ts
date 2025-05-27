import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { LoadingComponent } from "../loading/loading.component";
import { Overview } from '../models';
import { overviewData } from './overviewData';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  showYear: number = 2024;
  yearOverview!: Overview;
  queryParamsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const paramYear = params['year'];

      if (paramYear) {
        this.showYear = +paramYear;
        this.loadOverviewData(this.showYear);
      } else {
        this.showYear = 2024;
        this.loadOverviewData(this.showYear);
      }
    });

    if (!this.route.snapshot.queryParams['year']) {
      this.loadOverviewData(this.showYear);
    }
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  loadOverviewData(year: number): void {
    const findOverview = overviewData.find(overview => overview.year === year);
    if (findOverview) {
      this.yearOverview = findOverview;
    } else {
      this.router.navigateByUrl('/not-found');
    }
  }

  navigateTo(link: string) {
    this.router.navigateByUrl(link);
  }

  showColorIMG(color: string) {
    this.router.navigate(['./draw'], {queryParams: { year: this.showYear, color: color }});
  }

  view2024Graphs() {
    this.router.navigate(['./graphs'], {queryParams: { year: this.showYear }});
  }
}