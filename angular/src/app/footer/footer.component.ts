import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(
    private router: Router
  ) {}

  sendTo(page: string) {
    switch(page) {
      case 'faq': {
        this.router.navigate(['./faq']);
        break;
      }
      default: {
        this.router.navigate(['./']);
        break;
      }
    }
  }

}
