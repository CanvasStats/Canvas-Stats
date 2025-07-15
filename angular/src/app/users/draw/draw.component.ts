import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanvasService } from '../../canvas.service';
import { Subject, takeUntil } from 'rxjs';
import { HeaderComponent } from "../../header/header.component";
import { LoadingComponent } from "../../loading/loading.component";
import { FooterComponent } from "../../footer/footer.component";


@Component({
  selector: 'app-draw',
  imports: [HeaderComponent, LoadingComponent, FooterComponent],
  templateUrl: './draw.component.html',
  styleUrl: './draw.component.css'
})
export class DrawComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('pixelCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;
  private destroy$ = new Subject<void>();
  finishedDrawing = false;
  username: string = "";
  year: number = 0;
  canvasHeight: number = 0;
  canvasWidth: number = 0;
  loading = true;
  errorMessage: string | null = null;
  showWhiteBackground: boolean = true;

  constructor(
    private canvasService: CanvasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.year = this.canvasService.checkIfYearHasStats(Number(this.route.snapshot.queryParamMap.get('year')) || 0);
    let backgroundParam = this.route.snapshot.queryParamMap.get('background') || 'white';
    if (backgroundParam == 'transparent') {
        this.showWhiteBackground = false;
    } else {
        this.showWhiteBackground = true;
    }
    if (this.year === 2023) {
      this.canvasHeight = 1000;
      this.canvasWidth = 1000;
    } else if (this.year === 2024) {
      this.canvasHeight = 500;
      this.canvasWidth = 1000;
    } else if (this.year === 2025) {
        this.canvasHeight = 500;
        this.canvasWidth = 500;
    }
    this.username = this.route.snapshot.paramMap.get('username') || "";
  }
ngAfterViewInit(): void {
        const canvasElement = this.canvas?.nativeElement;
        if (!canvasElement) {
            this.errorMessage = 'Canvas element not found.';
            this.loading = false;
            
            return;
        }

        const context = canvasElement.getContext('2d');
        if (!context) {
            this.errorMessage = 'Could not get canvas rendering context.';
            this.loading = false;
            
            return;
        }
        this.context = context;

        this.drawPixels();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private drawPixels(): void {
        this.loading = true;
        this.errorMessage = null;
        this.finishedDrawing = false;
        

        this.canvasService.getPixelsForUser(this.year, this.username)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: (pixels) => {
                    if (!pixels || pixels.length === 0) {
                        this.errorMessage = 'An error occurred.';
                        this.loading = false;
                        this.finishedDrawing = true;
                        
                        return;
                    }
                    console.log(`Got ${pixels.length} rows of data`);
                    if (this.showWhiteBackground) {
                        this.context.fillStyle = "#ffffff";
                    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
                    }
                    pixels.forEach(pixel => {
                        this.context.fillStyle = pixel.colorHex;
                        this.context.fillRect(pixel.xCoordinate, pixel.yCoordinate, 1, 1);
                    });

                    this.loading = false;
                    this.finishedDrawing = true;
                    
                },
                error: (error) => {
                    console.error('Error fetching pixel data:', error);
                    this.errorMessage = 'Failed to load pixel data. Please try again later.';
                    this.loading = false;
                    this.finishedDrawing = true;
                    
                },
                complete: () => {
                    console.log('Pixel drawing complete.');
                }
            });
    }

    toggleBackgroundAndRedraw() {
        this.showWhiteBackground = !this.showWhiteBackground;
        this.drawPixels();
    }

    downloadImage(): void {
        const canvas = this.canvas?.nativeElement;
        if (!canvas) {
            this.errorMessage = "Canvas element is not available to download";
            
            return;
        }
        try {
            const dataURL = canvas.toDataURL("image/png");
            const a = document.createElement('a');
            a.href = dataURL;
            const userShortened = this.username.split('@')[0];
            a.download = `${userShortened}.png`;
            a.click();
        } catch (error) {
            console.error("Error during download:", error);
            this.errorMessage = "Error occurred while downloading the image.";
            
        }
    }

    sendUserToStats(): void {
        this.router.navigate([`/users/${this.username}`], { queryParams: { year: this.year } })
    }
}