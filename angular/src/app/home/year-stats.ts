import { ColorCount, ContentPair, YearStat, StatImage } from "../models";

export const canvas2025: YearStat[] = [
    new YearStat(
        'text', 'left', 'person', undefined,
        [
            new ContentPair('p', '638 users from 435 instances placed pixels on the canvas in 2025. (Down 1,274 users from 2024)'),
            new ContentPair('p', '185 returning users from 2024 and 47 users who have participated in all 3 Canvas events.')
        ]
    ),
    new YearStat(
        'text', 'right', 'grid_view', undefined,
        [
            new ContentPair('p', '313408 total pixels placed on the canvas. (Down 329,235 pixels from 2024, but the canvas was twice as big in 2024)')
        ]
    ),
    new YearStat(
        'colorCount', 'left', undefined, 'Pixels by color', [new ContentPair('year', '2025')]
    ),
    new YearStat(
        'text', 'left', 'layers', undefined,
        [new ContentPair('p', '225444 are the final pixels on the canvas, making the canvas 90.1776% covered at the end of the event. (Up 8.3684% from 2024)')]
    ),
    new YearStat(
        'image', 'right', undefined, 'Pixels placed per minute', [
            new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2025/pixelsPerMinute.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2025/pixelsPerMinute.png" alt="Pixels placed per minute" /></a>'),
        ]
    ),
    new YearStat(
        'text', 'right', 'kid_star', undefined,
        [new ContentPair('p', '158 pixels were placed at (304, 40) making it the coordinate with the most pixels')]
    ),
    new YearStat(
        'userList', 'left', undefined, 'The users that contributed to the top pixel were:',
        [
            new ContentPair('li', 'Dexruus@chaos.social',),
            new ContentPair('li', 'DmMacniel@feddit.org',),
            new ContentPair('li', 'Sonne@feddit.org',),
            new ContentPair('li', 'adlerweb@social.adlerweb.info'),
            new ContentPair('li', 'flughoernchen@feddit.org'),
            new ContentPair('li', 'hazyskies@toast.ooo'),
            new ContentPair('li', 'Adopon@lemmy.world'),
            new ContentPair('li', 'nuko147@lemmy.world'),
            new ContentPair('li', 'xantater@fbsweb.de'),
            new ContentPair('li', 'marius851000@mariusdavid.fr'),
            new ContentPair('li', 'irelephant@app.wafrn.net'),
            new ContentPair('li', 'Lokloy@lemmy.world'),
            new ContentPair('li', 'D_a_X@feddit.org'),
            new ContentPair('li', 'viviansequeira@mastodon.world'),
            new ContentPair('li', 'elvith@feddit.org'),
            new ContentPair('li', 'ace_garp@lemmy.world'),
            new ContentPair('li', 'rrconkle@lemmy.zip'),
        ]
    ),
    new YearStat(
        'image', 'right', undefined, 'Pixel Heat Map', 
        [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2025/heatmapPlaceholder.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2025/heatmapPlaceholder.png" alt="2025 Pixel Heat Map" /></a>')]
    ),
    new YearStat(
        'text', 'left', 'undo', undefined,
        [new ContentPair('p', '4969 pixels were undone by 360 users. (Down 10,755 pixels from 2024)')]
    ),
    new YearStat(
        'text', 'right', 'delete_forever', undefined,
        [new ContentPair('p', '0 users undid every pixel they placed. (Last year there were 13 users)')]
    ),
    new YearStat(
        'image', 'left', undefined, undefined, [
            new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2025/final.png" target="_blank" title="Click to enlarge"><img class="canvas" src="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2025/final.png" alt="Canvas 2025 at the end of the event" /></a>')
        ]
    ),
    // new YearStat(
    //     'customCanvas', 'right', undefined, 'Generate Custom Canvas Image',
    //     [
    //         new ContentPair('Pixels that made it from the "megatemplate" to the end of the even', 'compare'),
    //         new ContentPair('Reverse Order', 'reverse'),
    //         new ContentPair('Uncontested pixels', ''),
    //         new ContentPair('just the pixels that where undone', ''),
    //         new ContentPair('any more to add?', '')
    //     ]
    // ),
    new YearStat(
        'externalLinks', 'left', undefined, undefined, [
            new ContentPair('View the 2025 Atlas', 'https://atlas2025.mariusdavid.fr/')
        ]
    )
];

export const colorCounts2025: ColorCount[] = [
    new ColorCount('black', 'Black', 54027),
    new ColorCount('blue', 'Blue', 21426),
    new ColorCount('white', 'White', 20892),
    new ColorCount('red', 'Red', 20788),
    new ColorCount('yellow', 'Yellow', 19925),
    new ColorCount('azure', 'Azure', 12089),
    new ColorCount('aqua', 'Aqua', 11301),
    new ColorCount('light-grey', 'Light Grey', 11099),
    new ColorCount('medium-grey', 'Medium Grey', 10523),
    new ColorCount('dark-green', 'Dark Green', 10519),
    new ColorCount('dark-grey', 'Dark Grey', 8519),
    new ColorCount('dark-purple', 'Dark Purple', 8464),
    new ColorCount('deep-grey', 'Deep Grey', 7658),
    new ColorCount('navy', 'Navy', 7563),
    new ColorCount('pink', 'Pink', 6879),
    new ColorCount('purple', 'Purple', 6486),
    new ColorCount('pastel-yellow', 'Pastel Yellow', 5991),
    new ColorCount('brown', 'Brown', 5419),
    new ColorCount('rose', 'Rose', 5120),
    new ColorCount('green', 'Green', 4841),
    new ColorCount('beige', 'Beige', 4546),
    new ColorCount('dark-teal', 'Dark Teal', 4431),
    new ColorCount('chocolate', 'Chocolate', 4341),
    new ColorCount('rust', 'Rust', 4313),
    new ColorCount('magenta', 'Magenta', 4291),
    new ColorCount('orange', 'Orange', 3864),
    new ColorCount('lime', 'Lime', 3669),
    new ColorCount('forest', 'Forest', 3425),
    new ColorCount('light-teal', 'Light Teal', 2980),
    new ColorCount('dark-chocolate', 'Dark Chocolate', 2884),
    new ColorCount('watermelon', 'Watermelon', 2801),
    new ColorCount('peach', 'Peach', 2583),
    new ColorCount('maroon', 'Maroon', 2532),
    new ColorCount('mauve', 'Mauve', 2250)
];

export const canvas2024: YearStat[] = [
    new YearStat(
        'text', 'left', 'person', undefined, 
        [
            new ContentPair('p', '1912 users from 305 instances placed pixels on the canvas in 2024. (Down 292 users from 2023)'),
            new ContentPair('p', '206 returning users from 2023')]
    ),
    new YearStat(
        'text', 'right', 'grid_view', undefined, [new ContentPair('p', '642643 total pixels placed on the canvas. (Up 14,227 pixels from 2023)')]
    ),
    new YearStat(
        'colorCount', 'left', undefined, 'Pixels by color', [new ContentPair('year', '2024')]
    ),
    new YearStat(
        'text', 'right', 'layers', undefined,
        [new ContentPair('p', '409046 are the final pixels on the canvas, making the canvas 81.8092% covered at the end of the event. (Up 27.6436% from 2023, but the canvas was twice as big in 2023')]
    ),
    new YearStat(
        'image', 'right', undefined, 'Pixels placed per minute', [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/main/2024/graphs/pixels-placed-per-minute.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/main/2024/graphs/pixels-placed-per-minute.png" alt="Pixels placed per minute" /></a>')]
    ),
    new YearStat(
        'text', 'right', 'kid_star', undefined,
        [new ContentPair('p', '1427 pixels were placed at (10,262) making it the coordinate with the most pixels')]
    ),
    new YearStat(
        'userList', 'left', undefined, 'The users that contributed to the top pixel were:',
        [
            new ContentPair('li', '142446@toast.ooo: 1414 times'),
            new ContentPair('li', 'Kelo@lemmy.world: 7 times'),
            new ContentPair('li', 'hemko@lemmy.dbzer0.com: 2 times'),
            new ContentPair('li', 'ategon@programming.dev: 1 time'),
            new ContentPair('li', 'grant@grants.cafe: 1 time'),
            new ContentPair('li', 'EXtremeExploit@lemmy.world: 1 time'),
            new ContentPair('li', 'hdggDalton@toast.ooo: 1 time'),
        ]
    ),
    new YearStat(
        'image', 'right', undefined, 'Pixel Heat Map', 
        [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/main/2024/graphs/heatmap-with-legend.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/main/2024/graphs/heatmap-with-legend.png" alt="2024 Pixel Heat Map" /></a>')]
    ),
    new YearStat(
        'text', 'left', 'undo', undefined,
        [new ContentPair('p', '15724 pixels were undone by 1101 users (Up 5,009 pixels from 2023)')]
    ),
    new YearStat(
        'text', 'right', 'delete_forever', undefined,
        [new ContentPair('p', '13 users undid every pixel they placed. (Up 9 users from 2023)')]
    ),
    new YearStat(
        'image', 'left', undefined, undefined, [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2024/final2024.png" target="_blank" title="Click to enlarge"><img class="canvas" src="https://raw.githubusercontent.com/TheRealMonte/images/refs/heads/main/2024/final2024.png" alt="Canvas 2024 at the end of the event" /></a>')]
    ),
    // Do I want to do custom images for 2024?
    new YearStat(
        'externalLinks', 'left', undefined, undefined, [
            new ContentPair('View the 2024 Atlas', 'https://atlas.mariusdavid.fr/')
        ]
    )
];

export const colorCounts2024: ColorCount[] = [
    new ColorCount('black', 'Black', 119773),
    new ColorCount('white', 'White', 55152),
    new ColorCount('red', 'Red', 54053),
    new ColorCount('yellow', 'Yellow', 35911),
    new ColorCount('blue', 'Blue', 34210),
    new ColorCount('azure', 'Azure', 32045),
    new ColorCount('aqua', 'Aqua', 28753),
    new ColorCount('navy', 'Navy', 27663),
    new ColorCount('pink', 'Pink', 23204),
    new ColorCount('light-grey', 'Light Grey', 20011),
    new ColorCount('dark-green', 'Dark Green', 15849),
    new ColorCount('green', 'Green', 15535),
    new ColorCount('medium-grey', 'Medium Grey', 13057),
    new ColorCount('dark-grey', 'Dark Grey', 12810),
    new ColorCount('deep-grey', 'Deep Grey', 12730),
    new ColorCount('pastel-yellow', 'Pastel Yellow', 12417),
    new ColorCount('orange', 'Orange', 12336),
    new ColorCount('purple', 'Purple', 12185),
    new ColorCount('dark-purple', 'Dark Purple', 10896),
    new ColorCount('rose', 'Rose', 8750),
    new ColorCount('chocolate', 'Chocolate', 8724),
    new ColorCount('magenta', 'Magenta', 8536),
    new ColorCount('beige', 'Beige', 8040),
    new ColorCount('rust', 'Rust', 7950),
    new ColorCount('brown', 'Brown', 6996),
    new ColorCount('mauve', 'Mauve', 6421),
    new ColorCount('forest', 'Forest', 5975),
    new ColorCount('dark-chocolate', 'Dark Chocolate', 5388),
    new ColorCount('dark-teal', 'Dark Teal', 5216),
    new ColorCount('light-teal', 'Light Teal', 5153),
    new ColorCount('maroon', 'Maroon', 4887),
    new ColorCount('lime', 'Lime', 4168),
    new ColorCount('peach', 'Peach', 4138),
    new ColorCount('watermelon', 'Watermelon', 3711)
];

export const canvas2023: YearStat[] = [
    new YearStat(
        'text', 'left', 'person', undefined, 
        [
            new ContentPair('p', '2204 users from 132 instances placed pixels on the canvas in 2023'),]
    ),
    new YearStat(
        'text', 'right', 'grid_view', undefined, [new ContentPair('p', '628416 total pixels placed on the canvas')]
    ),
    new YearStat(
        'colorCount', 'left', undefined, 'Pixels by color', [new ContentPair('year', '2023')]
    ),
    new YearStat(
        'text', 'right', 'layers', undefined,
        [new ContentPair('p', '541666 are the final pixels on the canvas, making the canvas 54.1666% covered at the end of the event')]
    ),
    new YearStat(
        'image', 'right', undefined, 'Pixels placed per minute', [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/graphs/pixels-placed-per-minute.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/graphs/pixels-placed-per-minute.png" alt="Pixels placed per minute" /></a>')]
    ),
    new YearStat(
        'text', 'right', 'kid_star', undefined,
        [new ContentPair('p', '170 pixels were placed at (175, 171) making it the coordinate with the most pixels')]
    ),
    new YearStat(
        'userList', 'left', undefined, 'The users that contributed to the top pixel were:',
        [
            new ContentPair('li', 'Depress_mode@lemmy.world: 83 times'),
            new ContentPair('li', 'Kalcifer@lemmy.world: 77 times'),
            new ContentPair('li', 'anonymous1691293996@lemmy.world: 4 times'),
            new ContentPair('li', 'anonymous1691294527@lemmy.world: 3 times'),
            new ContentPair('li', 'anonymous1691296202@lemmy.world: 1 time'),
            new ContentPair('li', 'bstix@feddit.dk: 1 time'),
            new ContentPair('li', 'Wilker@lemmy.blahaj.zone: 1 time'),
        ]
    ),
    new YearStat(
        'image', 'right', undefined, 'Pixel Heat Map', 
        [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/graphs/heatmap-with-legend.png" target="_blank" title="Click to enlarge"><img class="graph" src="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/graphs/heatmap-with-legend.png" alt="2023 Pixel Heat Map" /></a>')]
    ),
    new YearStat(
        'text', 'left', 'undo', undefined,
        [new ContentPair('p', '10715 pixels were undone by 1000 users')]
    ),
    new YearStat(
        'text', 'right', 'delete_forever', undefined,
        [new ContentPair('p', '4 users undid every pixel they placed')]
    ),
    new YearStat(
        'image', 'left', undefined, undefined, [new ContentPair('img', '<a href="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/final2023.png" target="_blank" title="Click to enlarge"><img class="canvas" src="https://raw.githubusercontent.com/TheRealMonte/images/main/2023/final2023.png" alt="Canvas 2023 at the end of the event" /></a>')]
    ),
    // Do I want to do custom images for 2023?
];

export const colorCounts2023: ColorCount[] = [
    new ColorCount('black', 'Black', 121862),
    new ColorCount('blue', 'Blue', 58026),
    new ColorCount('red', 'Red', 54855),
    new ColorCount('azure', 'Azure', 33077),
    new ColorCount('yellow', 'Yellow', 32074),
    new ColorCount('white', 'White', 23617),
    new ColorCount('light-grey', 'Light Grey', 19997),
    new ColorCount('dark-grey', 'Dark Grey', 19331),
    new ColorCount('dark-green', 'Dark Green', 19041),
    new ColorCount('rust', 'Rust', 18874),
    new ColorCount('pink', 'Pink', 18315),
    new ColorCount('navy', 'Navy', 17385),
    new ColorCount('purple', 'Purple', 17095),
    new ColorCount('medium-grey', 'Medium Grey', 15380),
    new ColorCount('orange', 'Orange', 14582),
    new ColorCount('deep-grey', 'Deep Grey', 13601),
    new ColorCount('aqua', 'Aqua', 12381),
    new ColorCount('green', 'Green', 12366),
    new ColorCount('rose', 'Rose', 10791),
    new ColorCount('mauve', 'Mauve', 9951),
    new ColorCount('chocolate', 'Chocolate', 9491),
    new ColorCount('forest', 'Forest', 9253),
    new ColorCount('pastel-yellow', 'Pastel Yellow', 8397),
    new ColorCount('brown', 'Brown', 8384),
    new ColorCount('watermelon', 'Watermelon', 7127),
    new ColorCount('peach', 'Peach', 5668),
    new ColorCount('light-teal', 'Light Teal', 5596),
    new ColorCount('lime', 'Lime', 5450),
    new ColorCount('beige', 'Beige', 4723),
    new ColorCount('dark-teal', 'Dark Teal', 4601),
    new ColorCount('magenta', 'Magenta', 4430),
    new ColorCount('maroon', 'Maroon', 4143)
];