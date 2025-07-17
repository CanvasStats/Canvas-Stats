import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ColorCount, StatImage, YearStat } from '../../models';
import { colorCounts2023, colorCounts2024, colorCounts2025 } from '../year-stats';
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
  colors: string[] = ['white', 'light-grey', 'medium-grey', 'peach', 'beige', 'pink', 'magenta', 'mauve', 'purple', 'dark-purple', 'navy', 'blue', 'azure', 'aqua', 'light-teal', 'dark-teal', 'forest', 'dark-green', 'green', 'lime', 'pastel-yellow', 'yellow', 'orange', 'rust', 'maroon', 'rose', 'red', 'watermelon'];
  colorsShuffled = this.shuffle(this.colors);
  colorCounts: ColorCount[] | undefined;
  year: number = 0;
  customKey: string = "";
  customBackground: string = "";
  showCustomPrompt: number = 1;

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
      this.updateColorCounts();
    });
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
    }
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  showColorIMG(color: string, backgroundColor: number) {
    //year, color, background
    if (backgroundColor === 0) {
      this.router.navigate(['./draw'], { queryParams: { year: this.year, color: color, background: 'transparent' } });
    } else if (backgroundColor === 1) {
      this.router.navigate(['./draw'], { queryParams: { year: this.year, color: color, background: 'black' } });
    } else {
      this.router.navigate(['./draw'], { queryParams: { year: this.year, color: color, background: 'white' } });
    }
  }

  getColor(index: number) {
    
    return `btn ${this.colorsShuffled[index]}`;

  }

  generateCustom(value: string) {
    if (this.showCustomPrompt === 1) {
      this.showCustomPrompt = 2;
      this.customKey = value;
    } else if (this.showCustomPrompt === 2) {
      this.customBackground = value;
      this.showCustomPrompt = 1;
      this.router.navigate(['./draw'], { queryParams: { year: this.year, special: this.customKey, background: this.customBackground } });
    }
  }

  shuffle(array: string[]): string[] {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

goToUser(username: string) {
    this.router.navigate([`./users/${username}`], { queryParams: { year: this.year } });
  }
}
