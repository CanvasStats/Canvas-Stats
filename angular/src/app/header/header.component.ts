import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  searchString: string = '';
  @Input() showSearch: boolean = true;
  years: number[] = [];
  constructor(
    private router: Router,
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.years = this.canvasService.years;
    console.log(this.years);
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

  changeYear(year: number) {
    this.canvasService.clearData();
    this.router.navigate(['./'], { queryParams: {year: year} })
  }
}