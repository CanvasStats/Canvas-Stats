import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ColorCount, StatImage, YearStat } from '../../models';
import { colorCounts2023, colorCounts2024, colorCounts2025, image2025, image2024, image2023 } from '../year-stats';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stat-block',
  imports: [],
  templateUrl: './stat-block.component.html',
  styleUrl: './stat-block.component.css'
})
export class StatBlockComponent implements OnInit, OnDestroy {
  @Input() stat: YearStat | undefined;
  colorCounts: ColorCount[] | undefined;
  year: number = 0;
  image: StatImage | undefined;

  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      const yearParam = +params['year'];
      if (!isNaN(yearParam) && yearParam > 0) {
        this.year = yearParam;
      } else if (this.stat?.type === 'colorCount' && this.stat.content && this.stat.content.length > 0) {
        this.year = +this.stat.content[0].contentValue;
      } else {
        this.year = 2025
      }
      this,this.updateImages();
      this.updateColorCounts();
    });
  }

  private updateImages(): void {
    console.log(`updating images for year ${this.year}`)
    if (this.stat?.type === 'image') {
      if (this.year === 2025) {
        this.image = image2025.find(image => image.imageName === this.stat?.content[0].contentValue);
      } else if (this.year === 2024) {
        this.image = image2024.find(image => image.imageName === this.stat?.content[0].contentValue);
      } else {
        this.image = image2023.find(image => image.imageName === this.stat?.content[0].contentValue);
      }
    }
  }

  private updateColorCounts(): void {
    if (this.stat?.type === 'colorCount') {
      if (this.year === 2025) {
        this.colorCounts = colorCounts2025;
        console.log("color counts set to 2025");
      } else if (this.year === 2024) {
        this.colorCounts = colorCounts2024;
        console.log("color counts set to 2024");
      } else {
        this.colorCounts = colorCounts2023;
        console.log("color counts set to 2023");
      }
      console.log(`${this.year} is set, should be showing colors counts for that year`);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }


  showColorIMG(color: string) {
    this.router.navigate(['./draw'], { queryParams: { year: this.year, color: color } });
  }
  
}
