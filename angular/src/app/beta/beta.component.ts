import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Beta } from './beta.model';
import { BetaService } from './beta.service';

@Component({
  selector: 'app-beta',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './beta.component.html',
  styleUrl: './beta.component.css'
})
export class BetaComponent implements OnInit {
  year: number = 2025;
  betaData: Beta | null = null;
  error: string | null = null;

  constructor(private betaService: BetaService) {}

  ngOnInit(): void {
    this.betaService.getData().subscribe({
      next: (data) => {
        this.betaData = data;
      }, error: (err) => {
        this.error = err.message;
        console.error('Error fetching data:', err);
      }
    })
  }
  
}
