import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { Overview, YearStat } from '../models';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { CanvasEventsService } from './canvas-events.service';
import { Event, Color, LiveStats } from './event.model';
import { map } from 'rxjs/operators';
import { CanvasService } from '../canvas.service';
import { canvas2025, canvas2024, canvas2023 } from './year-stats';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showYear: number = 2025;
  yearStat: YearStat | undefined;
  queryParamsSubscription: Subscription | undefined;
  error: string | null = null;
  showChangeYear: boolean = false;
  years: number[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private canvasService: CanvasService
  ) { }

  ngOnInit(): void {
    this.years = this.canvasService.years;
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const paramYear = params['year'];

      if (paramYear) {
        this.showYear = +paramYear;
        if (this.showYear === 2025) {
          this.yearStat = canvas2025;
          console.log("yearstat should be set to 2025")
        } else if (this.showYear === 2024) {
          this.yearStat = canvas2024;
          console.log("yearstat should be set to 2024")
        } else if (this.showYear === 2023) {
          this.yearStat = canvas2023;
        }
      } else {
        this.showYear = 2025;
        this.yearStat = canvas2025;
      }
    });
  }

  navigateTo(link: string) {
    this.router.navigateByUrl(link);
  }

  showColorIMG(color: string) {
    this.router.navigate(['./draw'], { queryParams: { year: this.showYear, color: color } });
  }

  formatDateTimeManual(dateString: string): string {
    let date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' }) + " " + (date.getDate() + 1) + ", " + date.getFullYear();
  }

  changeYear(year: number): void {
    this.showYear = year;
    this.showChangeYear = false;
    document.body.classList.remove('no-scroll-fixed');
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: { year: this.showYear },
      queryParamsHandling: 'merge'
    });
  }

  showYearSelection() {
    document.body.classList.add('no-scroll-fixed');
    this.showChangeYear = true;
    console.log("Change Year should be open")
  }

}