export class Pixel {
    constructor(
        public username: string,
        public xCoordinate: number,
        public yCoordinate: number,
        public colorHex: string
    ) {}
}

export class User {
    public readonly type = 'User';
    constructor(
        public username: string,
        public userRank: number,
        public pixelCount: number,
        public xCord: number,
        public yCord: number,
        public cordCount: number
    ) { }
}

export class ColorsCounts {
    constructor(
        public username: string,
        public black: number,
        public darkGrey: number,
        public deepGrey: number,
        public mediumGrey: number,
        public lightGrey: number,
        public white: number,
        public beige: number,
        public peach: number,
        public brown: number,
        public chocolate: number,
        public rust: number,
        public orange: number,
        public yellow: number,
        public pastelYellow: number,
        public lime: number,
        public green: number,
        public darkGreen: number,
        public forest: number,
        public darkTeal: number,
        public lightTeal: number,
        public aqua: number,
        public azure: number,
        public blue: number,
        public navy: number,
        public purple: number,
        public mauve: number,
        public magenta: number,
        public pink: number,
        public watermelon: number,
        public red: number,
        public rose: number,
        public maroon: number,
        public darkChocolate: number,
        public darkPurple: number
    ) { }
}

export class Overview {
    constructor(
        public year: number,
        public finalCanvas: Image,
        public tags: Tag[],
        public colorCounts: ColorCount[],
        public links: Link[]
    ) { }
}

export class ColorCount {
    constructor(
        public colorVariable: string,
        public colorName: string,
        public count: number
    ) {}
}

export class Tag {
    constructor(
        public id: number,
        public type: string,
        public content: string[]
    ) {}
}

export class Link {
    constructor(
        public id: number,
        public linkText: string,
        public onClick: string,
        public classes: string,
        public external: boolean,
        public queryParams?: { [key: string]: any }
    ) { }
}

export class Image {
    constructor(
        public id: number,
        public imageURL: string,
        public imageAlt: string
    ) {}
}

export class YearStat {
    constructor(
        public userCount: number,
        public instanceCount: number,
        public totalPixels: number,
        public colorCounts: ColorCount[],
        public topPixels: number,
        public percentCovered: number,
        public pixelPerMinuteURL: string,
        public topCoordinate: string,
        public topCoordinateCount: number,
        public topCoordinateUsers: string[],
        public pixelHeatMapURL: string,
        public pixelsDeleted: number,
        public usersWhoDeleted: number,
        public usersDeletedAll: number | undefined,
        public canvasImageURL: string,
        public canvasAtlasURL: string | undefined
    ) {}
}

export class UserMain {
    public readonly type = 'UserMain';
    constructor(
        public username: string,
        public canvas2023: boolean,
        public canvas2024: boolean,
        public canvas2025: boolean
    ) {}
}