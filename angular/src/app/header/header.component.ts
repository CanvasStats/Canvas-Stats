import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CanvasService } from '../canvas.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() year: number = 2024;
  @Input() username: string = '';
  searchString: string = '';
  @Input() showSearch: boolean = true;
  constructor(
    private router: Router,
    private canvasService: CanvasService
  ) {}

  onSubmit() {
    if (this.searchString != this.username) {
      this.username = this.searchString;
      this.router.navigate(['./users'], { queryParams: { year: this.year, search: this.searchString } });
    }
  }

  seeAllUser() {
    this.router.navigate(['./users'], {queryParams: { year: this.year }});
  }

  getLogoYear() {
    return `https://raw.githubusercontent.com/TheRealMonte/images/main/${this.year}/logo${this.year}.png`
  }
  goToYearHomepage() {
    this.router.navigate(['./'], { queryParams: { year: this.year } })
  }

  changeYear(year: number) {
    this.canvasService.clearData();
    this.router.navigate(['./'], { queryParams: {year: year} })
  }
}