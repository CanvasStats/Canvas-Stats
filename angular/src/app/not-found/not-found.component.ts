import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CanvasService } from '../canvas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  years: number[] = [];
  year: number = 0;

  constructor(private canvasService: CanvasService) {}

  ngOnInit(): void {
    this.years = this.canvasService.getYears();
    this.year = this.years[0];
  }

}
