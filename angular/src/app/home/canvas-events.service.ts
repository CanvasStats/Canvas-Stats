import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class CanvasEventsService {
    canvas2025: string = "https://api.fediverse.events/v1/events/CANVAS-2025";

  constructor(private http: HttpClient) { }


  getData(): Observable<Event> {
    return this.http.get<Event>(this.canvas2025).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}