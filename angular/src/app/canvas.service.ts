import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ColorsCounts, Pixel, User, UserMain } from "./models";
import { Observable, throwError, catchError, of, forkJoin, map, tap, switchMap  } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CanvasService {
    private baseURL: string = "https://raw.githubusercontent.com/TheRealMonte/data-files/main";
    private pixelDataCache: Pixel[] | null = null;
    private userDataCache: User[] | null = null;
    private allUsersCache: UserMain[] | null = null;
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
        let url = `${this.baseURL}/${year}/pixels${year}.csv`
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
        //username,xCoordinate,yCoordinate,colorHex,isTop,isUndo,isSpecial
        const header = lines[0].split(',').map(h => h.trim());
        const usernameIndex = header.indexOf('username');
        const xCoordinateIndex = header.indexOf('xCoordinate');
        const yCoordinateIndex = header.indexOf('yCoordinate');
        const colorHexIndex = header.indexOf('colorHex');
        const isTopIndex = header.indexOf('isTop');
        const isUndoIndex = header.indexOf('isUndo');
        const isSpecialIndex = header.indexOf('isSpecial');

        const pixelList: Pixel[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === header.length) {
                const pixel: Pixel = {
                    username: values[usernameIndex]?.trim() || '',
                    xCoordinate: +values[xCoordinateIndex]?.trim() || 0,
                    yCoordinate: +values[yCoordinateIndex]?.trim() || 0,
                    colorHex: values[colorHexIndex]?.trim() || '',
                    isTop: +values[isTopIndex]?.trim() == 1 || false,
                    isUndo: +values[isUndoIndex]?.trim() == 1 || false,
                    isSpecial: +values[isSpecialIndex]?.trim() == 1 || false
                }
                pixelList.push(pixel)
            } else {
                console.warn(`Skipping row ${i + 1} due to incorrect number of columns.`);
            }
        }
        console.log("loaded pixel data from csv");
        return pixelList;
    }

    getPixelsForDraw(year: number, key: string, value: string): Observable<Pixel[] | undefined> {
        console.log(`fetching pixels to draw the canvas with ${key}: ${value}`)
        if (this.year === year && this.pixelDataCache) {
            if (key === 'username') {
                console.log(`Pixel cache already loaded. Getting pixels for user ${value}`)
                return of(this.pixelDataCache.filter(pixel => pixel.username.toLowerCase() === value.toLowerCase()));
            } else if (key === 'color') {
                console.log(`Pixel cache already loaded. Getting pixels for color ${value}`)
                return of(this.pixelDataCache.filter(pixel => pixel.colorHex === value));
            } else if (key === 'compare') {
                console.log(`Pixel cache already loaded. Getting pixels for compare`)
                return of(this.pixelDataCache.filter(pixel => pixel.isSpecial === true));
            } else if (key === 'undo') {
                console.log(`Pixel cache already loaded. Getting undone pixels`)
                return of(this.pixelDataCache.filter(pixel => pixel.isUndo === true));
            } else if (key === 'top'){
                console.log(`Pixel cache already loaded. Getting isTop pixels`)
                return of(this.pixelDataCache.filter(pixel => pixel.isTop === true));
            } else {
                console.log(`Pixel cache already loaded. Getting all pixels`)
                return of(this.pixelDataCache);
            }
        } else {
                this.year = year;
                return this.getPixelDataForYear(this.year).pipe(
                    map(pixels => {
                        if (key === 'username') {
                            console.log(`Pixel cache not loaded. Loading pixel cache and filtering for user: ${value}`)
                            return pixels.filter(pixel => pixel.username.toLowerCase() === value.toLowerCase());
                        } else if (key === 'color') {
                            console.log(`Pixel cache not loaded. Loading pixel cache and filtering for color: ${value}`)
                            return pixels.filter(pixel => pixel.colorHex === value);
                        } else if (key === 'compare') {
                            console.log(`Pixel cache not loaded. Loading pixel cache and filtering for compare`)
                            return pixels.filter(pixel => pixel.isSpecial === true);
                        } else if (key === 'undo') {
                            console.log(`Pixel cache not loaded. Loading pixel cache and filtering for undone pixels`)
                            return pixels.filter(pixel => pixel.isUndo === true);
                        }
                         else if (key === 'top') {
                            console.log(`Pixel cache not loaded. Loading pixel cache and filtering for isTop pixels`)
                            return pixels.filter(pixel => pixel.isTop === true);
                        } else {
                            console.log(`Pixel cache not loaded. Loading pixel cache and returning all pixels`)
                            return pixels;
                        }
                    }),
                    catchError(this.handleError<Pixel[] | undefined>('GetPixelsForDraw', undefined))
                );
            }
    }

    getAllUsers(): Observable<UserMain[]> {
        return this.http.get("https://raw.githubusercontent.com/TheRealMonte/data-files/refs/heads/main/allUsers.csv", { responseType: 'text' })
            .pipe(
                map(csvData => this.parseAllUserData(csvData)),
                tap(data => this.allUsersCache = data),
                catchError(this.handleError<UserMain[]>('getAllUsers', []))
            )
    }

    private parseAllUserData(csvData: string): UserMain[] {
        const lines = csvData.trim().split('\n');
        if (lines.length <= 1) {
            console.log("can't find headers");
            return [];
        }
        const header = lines[0].split(',').map(h => h.trim());
        const usernameIndex = header.indexOf('username');
        const canvas2023Index = header.indexOf('canvas2023');
        const canvas2024Index = header.indexOf('canvas2024');
        const canvas2025Index = header.indexOf('canvas2025');

        const userList: UserMain[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === header.length) {
                const user: UserMain = {
                    type: 'UserMain',
                    username: values[usernameIndex]?.trim() || '',
                    canvas2023: +values[canvas2023Index]?.trim() == 1 || false,
                    canvas2024: +values[canvas2024Index]?.trim() == 1 || false,
                    canvas2025: +values[canvas2025Index]?.trim() == 1 || false,
                }
                userList.push(user)
            } else {
                console.warn(`Skipping row ${i + 1} due to incorrect number of columns.`);
            }
        }
        console.log("Loaded user data from csv");
        return userList;
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
                    type: 'User',
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

    getOtherYearsForUser(username: string, currentYear: number): Observable<number[]> {
    if (this.allUsersCache === null || this.allUsersCache.length === 0) {
      console.log("allUsersCache is null or empty. Calling getAllUsers() first.");
      return this.getAllUsers().pipe(
        switchMap(() => this.processOtherYearsForUser(username, currentYear))
      );
    } else {
      return this.processOtherYearsForUser(username, currentYear);
    }
  }

  private processOtherYearsForUser(username: string, currentYear: number): Observable<number[]> {
    const user = this.allUsersCache?.find(u => u.username === username);
    if (!user) {
      console.warn(`User with username '${username}' not found in cache.`);
      return of([]);
    }
    const otherYears: number[] = [];
    if (user.canvas2023 && currentYear !== 2023) {
      otherYears.push(2023);
    }
    if (user.canvas2024 && currentYear !== 2024) {
      otherYears.push(2024);
    }
    if (user.canvas2025 && currentYear !== 2025) {
      otherYears.push(2025);
    }
    return of(otherYears);
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