export class Event {
    constructor(
        public id: string,
        public name: string,
        public start: string,
        public end: string,
        public endpoints: {open: string, more_info: string},
        public logos: Logo[],
        public social: Social[]
    ) {}
}

export class Logo {
    constructor(
        public type: string,
        public url: string,
        public size: string
    ) {}
}

export class Social {
    constructor(
        public icon: string,
        public label: string,
        public url: string
    ) {}
}