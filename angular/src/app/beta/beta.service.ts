import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Beta } from './beta.model';

@Injectable({
  providedIn: 'root'
})
export class BetaService {
  private url: string = "https://raw.githubusercontent.com/TheRealMonte/data-files/refs/heads/main/2025/beta-data.json"

  constructor(private http: HttpClient) { }

  getData(): Observable<Beta> {
    return this.http.get<Beta>(this.url).pipe(
      catchError(this.handleError)
    )
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
