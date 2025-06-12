import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ColorsCounts, Pixel, User } from "./models";
import { Observable, throwError, catchError, of, forkJoin, map, tap  } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CanvasService {
    private baseURL: string = "https://raw.githubusercontent.com/TheRealMonte/data-files/main";
    private pixelDataCache: Pixel[] | null = null;
    private userDataCache: User[] | null = null;
    private userColorCountDataCashe: ColorsCounts[] | null = null;
    private year: number = 0;
    years: number[] = [2025, 2024, 2023];

    constructor(private http: HttpClient) { }

    getYears() {
        return this.years;
    }

    checkIfYearHasStats(year: number): number {
        if (this.years.includes(year)) {
            return year;
        } else {
            return this.years[0];
        }
    }

    clearData() {
        this.pixelDataCache = null;
        this.userDataCache = null;
        this.userColorCountDataCashe = null;
        this.year = 0;
    }

     getPixelDataForYear(year: number): Observable<Pixel[]> {
        this.year = year;
        let url = `${this.baseURL}/${year}/pixels.csv`
        console.log(`Getting pixels for ${year} from ${url}`)
        return this.http.get(url, { responseType: 'text' })
            .pipe(
                map(csvData => this.parsePixelData(csvData)),
                tap(data => this.pixelDataCache = data),
                catchError(this.handleError<Pixel[]>('getPixelDataForYear', []))
            );
    }

    private parsePixelData(csvData: string): Pixel[] {
        const lines = csvData.trim().split('\n');
        if (lines.length <= 1) {
            console.log("can't find headers");
            return [];
        }
        const header = lines[0].split(',').map(h => h.trim());
        const usernameIndex = header.indexOf('username');
        const xCoordinateIndex = header.indexOf('xCoordinate');
        const yCoordinateIndex = header.indexOf('yCoordinate');
        const colorHexIndex = header.indexOf('colorHex');

        const pixelList: Pixel[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === header.length) {
                const pixel: Pixel = {
                    username: values[usernameIndex]?.trim() || '',
                    xCoordinate: +values[xCoordinateIndex]?.trim() || 0,
                    yCoordinate: +values[yCoordinateIndex]?.trim() || 0,
                    colorHex: values[colorHexIndex]?.trim() || ''
                }
                pixelList.push(pixel)
            } else {
                console.warn(`Skipping row ${i + 1} due to incorrect number of columns.`);
            }
        }
        console.log("loaded pixel data from csv");
        return pixelList;
    }

    getPixelsForUser(year: number, username: string): Observable<Pixel[] | undefined> {
        if (this.year === year && this.pixelDataCache) {
            return of(this.pixelDataCache.filter(pixel => pixel.username.toLowerCase() === username.toLowerCase()));
        } else {
            this.year = year;
            return this.getPixelDataForYear(this.year).pipe(
                map(pixels => pixels.filter(pixel => pixel.username.toLowerCase() === username.toLowerCase())),
                catchError(this.handleError<Pixel[] | undefined>('getPixelsForUser', undefined))
            );
        }
    }


    getUsersForYear(year: number): Observable<User[]> {
        this.year = year;
        return this.http.get(`${this.baseURL}/${year}/users.csv`, { responseType: 'text' })
            .pipe(
                map(csvData => this.parseUserData(csvData)),
                tap(data => this.userDataCache = data),
                catchError(this.handleError<User[]>('getUsersForYear', []))
            );
    }

    private parseUserData(csvData: string): User[] {
        const lines = csvData.trim().split('\n');
        if (lines.length <= 1) {
            console.log("can't find headers");
            return [];
        }
        const header = lines[0].split(',').map(h => h.trim());
        const usernameIndex = header.indexOf('username');
        const userRankIndex = header.indexOf('userRank');
        const pixelCountIndex = header.indexOf('numPixels');
        const xCordIndex = header.indexOf('xCoordinateTop');
        const yCordIndex = header.indexOf('yCoordinateTop');
        const cordCountIndex = header.indexOf('NumPixelsTop');

        const userList: User[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === header.length) {
                const user: User = {
                    username: values[usernameIndex]?.trim() || '',
                    userRank: +values[userRankIndex]?.trim() || 0,
                    pixelCount: +values[pixelCountIndex]?.trim() || 0,
                    xCord: +values[xCordIndex]?.trim() || 0,
                    yCord: +values[yCordIndex]?.trim() || 0,
                    cordCount: +values[cordCountIndex]?.trim() || 0
                };
                userList.push(user);
            } else {
                console.warn(`Skipping row ${i + 1} due to incorrect number of columns.`);
            }
        }
        console.log("Loaded user data from csv");
        return userList;
    }

    getUserByUsername(year: number, username: string): Observable<User | undefined> {
        if (this.year === year && this.userDataCache) {
            return of(this.userDataCache.find(user => user.username.toLowerCase() === username.toLowerCase()));
        } else {
            return this.getUsersForYear(year).pipe(
                map(users => users.find(user => user.username.toLowerCase() === username.toLowerCase())),
                catchError(this.handleError<User | undefined>('getUserByUsername', undefined))
            );
        }
    }

    private getColorCountsForYear(year: number): Observable<ColorsCounts[]> {
        const csvFile = `${this.baseURL}/${year}/color_count.csv`;
        return this.http.get(csvFile, { responseType: 'text' }).pipe(
            map(csvData => this.parseColorCounts(csvData)),
            tap(data => this.userColorCountDataCashe = data),
            catchError(this.handleError<ColorsCounts[]>('getColorCountsForYear', []))
        );
    }

    private parseColorCounts(csvData: string): ColorsCounts[] {
        const lines = csvData.trim().split('\n');
        if (lines.length <= 1) {
            console.log("can't find headers");
            return [];
        }
        const header = lines[0].split(',').map(h => h.trim());
        const colorCounts: ColorsCounts[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === header.length) {
                const colorCount: ColorsCounts = {
                    username: values[0]?.trim() || '',
                    black: +values[1]?.trim() || 0,
                    darkGrey: +values[2]?.trim() || 0,
                    deepGrey: +values[3]?.trim() || 0,
                    mediumGrey: +values[4]?.trim() || 0,
                    lightGrey: +values[5]?.trim() || 0,
                    white: +values[6]?.trim() || 0,
                    beige: +values[7]?.trim() || 0,
                    peach: +values[8]?.trim() || 0,
                    brown: +values[9]?.trim() || 0,
                    chocolate: +values[10]?.trim() || 0,
                    rust: +values[11]?.trim() || 0,
                    orange: +values[12]?.trim() || 0,
                    yellow: +values[13]?.trim() || 0,
                    pastelYellow: +values[14]?.trim() || 0,
                    lime: +values[15]?.trim() || 0,
                    green: +values[16]?.trim() || 0,
                    darkGreen: +values[17]?.trim() || 0,
                    forest: +values[18]?.trim() || 0,
                    darkTeal: +values[19]?.trim() || 0,
                    lightTeal: +values[20]?.trim() || 0,
                    aqua: +values[21]?.trim() || 0,
                    azure: +values[22]?.trim() || 0,
                    blue: +values[23]?.trim() || 0,
                    navy: +values[24]?.trim() || 0,
                    purple: +values[25]?.trim() || 0,
                    mauve: +values[26]?.trim() || 0,
                    magenta: +values[27]?.trim() || 0,
                    pink: +values[28]?.trim() || 0,
                    watermelon: +values[29]?.trim() || 0,
                    red: +values[30]?.trim() || 0,
                    rose: +values[31]?.trim() || 0,
                    maroon: +values[32]?.trim() || 0,
                    darkChocolate: +values[33]?.trim() || 0,
                    darkPurple: +values[34]?.trim() || 0,
                };
                colorCounts.push(colorCount);
            } else {
                console.warn(`Skipping row ${i + 1} due to incorrect number of columns.`);
            }
        }
        console.log("Loaded color count data");
        return colorCounts;
    }

    getColorCountsForUsername(year: number, username: string): Observable<ColorsCounts | undefined> {
        if (this.year === year && this.userColorCountDataCashe) {
            return of(this.userColorCountDataCashe.find(user => user.username.toLowerCase() === username.toLowerCase()));
        } else {
            return this.getColorCountsForYear(year).pipe(
                map(colorCounts => colorCounts.find(user => user.username.toLowerCase() === username.toLowerCase())),
                catchError(this.handleError<ColorsCounts | undefined>('getColorCountsForUsername', undefined))
            );
        }
    }

     private handleError<T>(operation = 'operation', result?: T) {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}