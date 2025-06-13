export class Beta {
    constructor(
        public timestamp: string,
        public canvasXDimension: string,
        public canvasYDimension: string,
        public percentCovered: string,
        public colors: Color[]

    ) {}
}

export class Color {
    constructor(
        public name: string,
        public className: string,
        public count: number
    ) {}
}

