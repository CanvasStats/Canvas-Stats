import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CanvasService } from '../canvas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom',
  imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule,],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.css'
})
export class CustomComponent implements OnInit {
  years: number[] = [];
  year: number = 0;
  colorsShuffled = this.shuffle(['white', 'light-grey', 'medium-grey', 'peach', 'beige', 'pink', 'magenta', 'mauve', 'purple', 'dark-purple', 'navy', 'blue', 'azure', 'aqua', 'light-teal', 'dark-teal', 'forest', 'dark-green', 'green', 'lime', 'pastel-yellow', 'yellow', 'orange', 'rust', 'maroon', 'rose', 'red', 'watermelon']);
  showStep: number = 1;
  selectedPixels: string = "";
  username: string | undefined;
  instance: string | undefined;
  errorMessage: string | undefined;
  special: string = "";
  top: boolean = false;
  reverse: boolean = false;
  undo: boolean = false;

  constructor(
    private canvasService: CanvasService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.years = this.canvasService.getYears();
    this.year = this.years[0];
  }

  shuffle(array: string[]): string[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  getColor(index: number) {
    return `btn ${this.colorsShuffled[index]}`;
  }

  onSubmit(step: number, value: string | number) {
    this.errorMessage = undefined;
    if (step === 1) {
      this.year = +value;
      this.showStep++;
    } else if (step === 2) {
      this.selectedPixels = value.toString();
      if (value === 'all') {
        this.showStep = this.showStep + 2;
      } else {
        this.showStep++;
      }
    } else if (step === 3) {
      if (this.username) {
        this.canvasService.checkForInstanceOrUser(this.username).subscribe(found => {
          if (found) {
            this.showStep++;
          } else {
            this.username = undefined;
            this.errorMessage = "User not found, please try again"
          }
        });
      }
      if (this.instance) {
        this.canvasService.checkForInstanceOrUser(this.instance).subscribe(found => {
          if (found) {
            this.showStep++;
          } else {
            this.instance = undefined;
            this.errorMessage = "Instance not found, please try again"
          }
        })
      }
    }
    if (step === 4) {
      this.special = value.toString();
      this.showStep++;
    }
    if (step === 5) {
      if (this.username) {
        this.router.navigate(['./draw'],
          {
            queryParams: {
              sentFrom: 'custom',
              year: this.year,
              username: this.username,
              special: this.special,
              background: value,
              undo: this.undo,
              reverse: this.reverse,
              top: this.top
            }
          });
      } else if (this.instance) {
        this.router.navigate(['./draw'],
          {
            queryParams: {
              sentFrom: 'custom',
              year: this.year,
              username: this.instance,
              special: this.special,
              background: value,
              undo: this.undo,
              reverse: this.reverse,
              top: this.top
            }
          });
      }
    }
  }

}
