import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanvasService } from '../canvas.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() selectedYear: number = 2024;
  @Input() username: string = '';
  @Input() showSearch: boolean = true;
  years: number[] = [];
  showChangeYear: boolean = false;
  searchString: string = '';
  private scrollbarWidth: number = 0;
  
  constructor(
    private router: Router,
    private canvasService: CanvasService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log(`header componet is reloading. selected year is ${this.selectedYear}`)
    this.years = this.canvasService.years.filter(year => year != this.selectedYear);
  }

  onSubmit() {
    if (this.searchString != this.username) {
      this.username = this.searchString;
      this.router.navigate(['./users'], { queryParams: { year: this.selectedYear, search: this.searchString } });
    }
  }

  seeAllUser() {
    this.router.navigate(['./users'], {queryParams: { year: this.selectedYear }});
  }

  getLogoYear() {
    return `https://raw.githubusercontent.com/TheRealMonte/images/main/${this.selectedYear}/logo${this.selectedYear}.png`
  }
  goToYearHomepage() {
    this.router.navigate(['./'], { queryParams: { year: this.selectedYear } })
  }

  changeYear(year: number): void {
    this.selectedYear = year;
    this.showChangeYear = false;
    document.body.classList.remove('no-scroll-fixed');
    this.years = this.canvasService.years.filter(year => year != this.selectedYear);
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: { year: this.selectedYear },
      queryParamsHandling: 'merge'
    });
  }

  showYearSelection() {
    document.body.classList.add('no-scroll-fixed');
    this.showChangeYear = true;
    console.log("Change Year should be open")
  }
}