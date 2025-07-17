import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CanvasService } from '../canvas.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { LoadingComponent } from '../loading/loading.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-draw',
  standalone: true,
  imports: [HeaderComponent, LoadingComponent, FooterComponent, RouterModule],
  templateUrl: './draw.component.html',
  styleUrl: './draw.component.css'
})
export class DrawComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('pixelCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;
  private destroy$ = new Subject<void>(); // Used to unsubscribe from all observables
  finishedDrawing = false;
  year: number = 0;
  drawParams: {key: string, value: string} = {key: 'final', value: 'final'};
  canvasHeight: number = 0;
  canvasWidth: number = 0;
  loading = true;
  errorMessage: string | null = null;
  backgroundColor: string | undefined;
  message: string = "Data not loaded. Please go to the previous page and try again.";
  filename: string = "notLoaded.png";
  // queryParamsSubscription: Subscription | undefined; // We'll use takeUntil for this too

  constructor(
    private canvasService: CanvasService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // IMPORTANT: Subscribe to queryParams here to react to changes.
    // Use takeUntil(this.destroy$) for automatic unsubscription.
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        // Reset state for new drawing operation
        this.loading = true;
        this.finishedDrawing = false;
        this.errorMessage = null; // Clear previous errors

        // Update year based on route param
        // Ensure paramYear is a number for strict comparison
        const paramYear = Number(params['year']);
        this.year = this.canvasService.checkIfYearHasStats(paramYear || 0); // Use the validated year

        // Set canvas dimensions based on year
        if (this.year === 2023) {
            this.canvasHeight = 1000;
            this.canvasWidth = 1000;
        } else if (this.year === 2024) {
            this.canvasHeight = 500;
            this.canvasWidth = 1000;
        } else if (this.year === 2025) {
            this.canvasHeight = 500;
            this.canvasWidth = 500;
        } else {
            // Default or error state if year is invalid
            this.canvasHeight = 500; // sensible defaults
            this.canvasWidth = 500;
        }

        // Background color
        const backgroundParam = params['background'] || 'white';
        if (backgroundParam === 'transparent') {
            this.backgroundColor = undefined;
        } else if (backgroundParam === 'black') {
            this.backgroundColor = '#000000';
        } else {
            this.backgroundColor = '#FFFFFF';
        }

        // Determine drawParams and filename/message based on other query params
        const paramUsername = params['username'];
        const paramColor = params['color'];
        const paramSpecial = params['special'];

        if (paramUsername) {
            this.drawParams = {key: 'username', value: paramUsername};
            this.message = `The image below is all of the pixels ${paramUsername} placed during the ${this.year} event`
            this.filename = `${paramUsername.split('@')[0]}${this.year}.png`
        } else if (paramColor) { // Use else if for mutually exclusive params
            this.drawParams = {key: 'color', value: this.getHexForColor(paramColor)};
            this.message = `The image below is all of the ${paramColor} pixels placed during the ${this.year} event`
            this.filename = `only-${paramColor}${this.year}.png`
        } else if (paramSpecial) { // Use else if for mutually exclusive params
            this.drawParams = {key: paramSpecial, value: paramSpecial} // value could be empty string for 'compare'/'undo'
            if (paramSpecial === 'compare') {
                this.message = `The image below is all of the pixels that made it from the "megatemplate" created before the event onto the final canvas`
                this.filename = `compare4${this.year}.png`;
            } else if (paramSpecial === 'undo') {
                this.message = `The image below is all of the pixels that were undone by users during the ${this.year} event`;
                this.filename = `oops-all-mistakes${this.year}.png`
            } else { // Default for 'special' if not compare/undo, e.g., 'final'
                this.message = `Displaying the ${this.year} Canvas`
                this.filename = `canvas-${this.year}-final.png` // Fixed typo: .ong -> .png
            }
        } else {
            // Default drawParams if no specific filter is applied (e.g., show entire canvas)
            this.drawParams = {key: 'final', value: 'final'};
            this.message = `Displaying the final ${this.year} Canvas`;
            this.filename = `canvas-${this.year}-final.png`;
        }

        // After all parameters are updated, re-draw the canvas
        // Only call drawPixels if context is available (i.e., after ngAfterViewInit has run once)
        if (this.context) {
            this.drawPixels();
        }
      });
  }

  ngAfterViewInit(): void {
        const canvasElement = this.canvas?.nativeElement;
        if (!canvasElement) {
            this.errorMessage = 'Canvas element not found.';
            setTimeout(() => {
                this.loading = false;
                this.finishedDrawing = true;
                this.cdr.detectChanges();
            }, 0);
            return;
        }

        const context = canvasElement.getContext('2d');
        if (!context) {
            this.errorMessage = 'Could not get canvas rendering context.';
            setTimeout(() => {
                this.loading = false;
                this.finishedDrawing = true;
                this.cdr.detectChanges();
            }, 0);
            return;
        }
        this.context = context;

        // On initial load, after context is set, trigger drawPixels
        // This handles the very first load of the component
        this.drawPixels();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        // this.queryParamsSubscription?.unsubscribe(); // Not needed if using takeUntil
    }

    getHexForColor(color: string) {
    switch(color) {
      case 'White': return '#FFFFFF';
      case 'Light Grey': return '#B9C3CF';
      case 'Medium Grey': return '#777F8C';
      case 'Deep Grey': return '#424651';
      case 'Dark Grey': return '#1F1E26';
      case 'Black': return '#000000';
      case 'Dark Chocolate': return '#382215';
      case 'Chocolate': return '#7C3F20';
      case 'Brown': return '#C06F37';
      case 'Peach': return '#FEAD6C';
      case 'Beige': return '#FFD2B1';
      case 'Pink': return '#FFA4D0';
      case 'Magenta': return '#F14FB4';
      case 'Mauve': return '#E973FF';
      case 'Purple': return '#A630D2';
      case 'Dark Purple': return '#531D8C';
      case 'Navy': return '#242367';
      case 'Blue': return '#0334BF';
      case 'Azure': return '#149CFF';
      case 'Aqua': return '#8DF5FF';
      case 'Light Teal': return '#01BFA5';
      case 'Dark Teal': return '#16777E';
      case 'Forest': return '#054523';
      case 'Dark Green': return '#18862F';
      case 'Green': return '#61E021';
      case 'Lime': return '#B1FF37';
      case 'Pastel Yellow': return '#FFFFA5';
      case 'Yellow': return '#FDE111';
      case 'Orange': return '#FF9F17';
      case 'Rust': return '#F66E08';
      case 'Maroon': return '#550022';
      case 'Rose': return '#99011A';
      case 'Red': return '#F30F0C';
      case 'Watermelon': return '#FF7872';
      default: return '#000000';
    }
  }

    private drawPixels(): void {
        // Clear the canvas before drawing new pixels
        // This is crucial when redrawing for new parameters
        if (this.context && this.canvasHeight && this.canvasWidth) {
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        } else {
            // Handle case where context might not be ready yet (should be caught by ngAfterViewInit checks)
            console.warn("Canvas context or dimensions not ready for drawing.");
            this.errorMessage = 'Canvas not ready for drawing.';
            setTimeout(() => {
                this.loading = false;
                this.finishedDrawing = true;
                this.cdr.detectChanges();
            }, 0);
            return;
        }

        // Set initial loading state for the new drawing cycle
        this.loading = true;
        this.finishedDrawing = false;
        this.errorMessage = null; // Clear any previous error

        this.canvasService.getPixelsForDraw(this.year, this.drawParams.key, this.drawParams.value)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: (pixels) => {
                    console.log(`The draw component got ${pixels?.length} pixels.`)
                    setTimeout(() => { // Keep setTimeout for ExpressionChangedAfterItHasBeenCheckedError safety
                        if (!pixels || pixels.length === 0) {
                            this.errorMessage = `Pixels didn't load or length of zero`;
                            this.loading = false;
                            this.finishedDrawing = true;
                            // No return needed here as we're inside setTimeout
                            return;
                        }
                        console.log(`Got ${pixels.length} rows of data`);

                        // Redraw background if applicable
                        if (this.backgroundColor) {
                            this.context.fillStyle = this.backgroundColor;
                            this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
                        }

                        // Draw individual pixels
                        pixels.forEach(pixel => {
                            this.context.fillStyle = pixel.colorHex;
                            this.context.fillRect(pixel.xCoordinate, pixel.yCoordinate, 1, 1);
                        });

                        this.loading = false;
                        this.finishedDrawing = true;
                        // this.cdr.detectChanges(); // Not needed with default change detection unless OnPush
                    }, 0);
                },
                error: (error) => {
                    setTimeout(() => {
                        console.error('Error fetching pixel data:', error);
                        this.errorMessage = 'Failed to load pixel data. Please try again later.';
                        this.loading = false;
                        this.finishedDrawing = true;
                        // this.cdr.detectChanges(); // Not needed with default change detection unless OnPush
                    }, 0);
                },
                complete: () => {
                    console.log('Pixel drawing complete.');
                }
            });
    }

    downloadImage(): void {
        const canvas = this.canvas?.nativeElement;
        if (!canvas) {
            this.errorMessage = "Canvas element is not available to download";
            this.cdr.detectChanges();
            return;
        }
        try {
            const dataURL = canvas.toDataURL("image/png");
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = this.filename;
            a.click();
        } catch (error) {
            console.error("Error during download:", error);
            this.errorMessage = "Error occurred while downloading the image.";
            this.cdr.detectChanges();
        }
    }

    sendUserToStats(): void {
        // Ensure this.drawParams.value is the username for navigation
        // If drawParams.key is 'username', then drawParams.value is the username.
        // If it's 'color' or 'special', drawParams.value might not be the username.
        // You might need a separate 'username' property if it's always relevant for navigation.
        // For now, assuming drawParams.value is the username for this route.
        let navigateValue = this.drawParams.value;
        if (this.drawParams.key !== 'username' && this.drawParams.key !== 'final') {
             // If navigating to /users/:username, you need the actual username, not a color or special key
             // You'll need to store the actual username in a separate property if it's independent of drawParams.value
             // For example:
             // this.router.navigate([`/users/${this.usernameForNavigation}`], { queryParams: { year: this.year } })
             // For now, using the current filename or a default if username isn't available
             navigateValue = this.filename.split('-')[0].replace('.png', '') || 'default_user';
        }

        this.router.navigate([`/users/${navigateValue}`], { queryParams: { year: this.year } })
    }

    goToYearHome(): void {
        this.router.navigate(['/'], { queryParams: { year: this.year } })
    }
}