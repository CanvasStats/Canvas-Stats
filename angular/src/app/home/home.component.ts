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
import { canvas2024, canvas2023 } from './year-stats';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  showYear: number = 2025;
  yearStat: YearStat | undefined;
  queryParamsSubscription: Subscription | undefined;
  error: string | null = null;
  canvas2025: Event | null = null;
  liveStats: LiveStats | null = null;
  start: string = "";
  end: string = "";
  startTime: Date = new Date('2025-07-12T04:00:00.000Z');
  endTime: Date = new Date('2025-07-14T04:00:00.000Z');
  timeRemaining: any = {};
  eventInProgress: boolean = false;
  intervalSubscription: Subscription | undefined;
  showChangeYear: boolean = false;
  years: number[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: CanvasEventsService,
    private activatedRoute: ActivatedRoute,
    private canvasService: CanvasService
  ) { }

  ngOnInit(): void {
    this.fetchCanvas2025Data();
    this.fetchLiveStats();
    this.years = this.canvasService.years;
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const paramYear = params['year'];

      if (paramYear) {
        this.showYear = +paramYear;
        if (this.showYear === 2024) {
          this.yearStat = canvas2024;
        } else if (this.showYear === 2023) {
          this.yearStat = canvas2023;
        }
      } else {
        this.showYear = 2025;
      }
    });
  }

  fetchCanvas2025Data() {
    this.error = null;
    this.eventService.getData().subscribe({
      next: (data) => {
        this.canvas2025 = data;
        this.countdown();
        this.startTime = new Date(data.start);
        this.endTime = new Date(data.end);
        this.start = this.formatDateTimeManual(data.start);
        this.end = this.formatDateTimeManual(data.end);
      }, error: (err) => {
        this.error = err.message;
        console.error('Error fetching data:', err);
      }
    })
  }

  fetchLiveStats() {
    this.error = null;
    this.eventService.getLiveStats().subscribe({
      next: (data) => {
        this.liveStats = data;
      }, error: (err) => {
        this.error = err.message;
        console.error('Error fetching data:', err);
      }
    })
  }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  navigateTo(link: string) {
    this.router.navigateByUrl(link);
  }

  showColorIMG(color: string) {
    this.router.navigate(['./draw'], { queryParams: { year: this.showYear, color: color } });
  }

  view2024Graphs() {
    this.router.navigate(['./graphs'], { queryParams: { year: this.showYear } });
  }

  formatDateTimeManual(dateString: string): string {
    let date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' }) + " " + (date.getDate() + 1) + ", " + date.getFullYear();
  }

  countdown() {
    this.intervalSubscription = interval(1000)
      .pipe(
        map(() => {
          const diff = this.startTime.getTime() - new Date().getTime();
          if (diff > 0) {
            this.timeRemaining.days = Math.floor(diff / (1000 * 60 * 60 * 24));
            this.timeRemaining.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.timeRemaining.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            this.timeRemaining.seconds = Math.floor((diff % (1000 * 60)) / 1000);
          } else {
            this.timeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            this.eventInProgress = true;
            this.intervalSubscription?.unsubscribe();
          }
          return this.timeRemaining
        })
      )
      .subscribe();
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