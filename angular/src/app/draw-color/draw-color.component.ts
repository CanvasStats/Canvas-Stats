import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanvasService } from '../canvas.service';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-draw-color',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './draw-color.component.html',
  styleUrl: './draw-color.component.css'
})
export class DrawColorComponent implements OnInit {
  colorName: string = "";
  year: number = 0;
  colorUrl: string = "";
  imgSRC: string = "";

  ngOnInit(): void {
    let paramColor = this.route.snapshot.queryParamMap.get('color');
    let paramYear = this.route.snapshot.queryParamMap.get('year');
    if (paramYear != null) {
      this.year = this.canvasService.checkIfYearHasStats(+paramYear);
    }
    if (paramColor != null) {
      let colorParts: string[] = paramColor.split("-");
      if (colorParts.length>1) {
        let first = colorParts[0];
        let second = colorParts[1].charAt(0).toUpperCase() + colorParts[1].slice(1);
        this.colorUrl = first + second;
        this.colorName = paramColor.replace("-", " ");
      } else {
        this.colorName = paramColor;
        this.colorUrl = paramColor;
      }
    }
    this.imgSRC = `https://raw.githubusercontent.com/TheRealMonte/images/main/${this.year}/color-images/${this.colorUrl}.png`;
  }

  constructor(
    private route: ActivatedRoute,
    private canvasService: CanvasService
  ) {}

}
