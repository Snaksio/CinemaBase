export type Season = { number: number; year: number; episodes: number; description: string; titles?: string[] };
export type SeriesInfo = { years: string; seasons: Season[] };

const tmdb = (path: string) => `https://image.tmdb.org/t/p/w780/${path}.jpg`;

export const seriesEntries = [
 { id: 'breaking-bad', title: 'Breaking Bad', original: 'Breaking Bad', year: 2008, rating: 9.5, genres: ['Kryminał', 'Dramat', 'Thriller'], director: 'Vince Gilligan', description: 'Nauczyciel chemii Walter White, po diagnozie raka, zaczyna produkować metamfetaminę, by zabezpieczyć rodzinę. Z każdą decyzją coraz bardziej staje się kimś, kim nigdy nie chciał być.', quote: '„To ja jestem tym, który puka.”', poster: tmdb('ggFHVNu6YYI5L9pCfOacjizRGt'), trailer: 'HhesaQXLuRY', years: '2008–2013', seasons: [
  { number: 1, year: 2008, episodes: 7, description: 'Walter i jego były uczeń Jesse zaczynają gotować w kamperze na pustyni.', titles: ['Pilot', 'Cat\'s in the Bag...', '...And the Bag\'s in the River', 'Cancer Man', 'Gray Matter', 'Crazy Handful of Nothin\'', 'A No-Rough-Stuff-Type Deal'] },
  { number: 2, year: 2009, episodes: 13, description: 'Biznes rośnie, a z nim niebezpieczeństwo — Walter wkracza w świat kartelu.', titles: ['Seven Thirty-Seven', 'Grilled', 'Bit by a Dead Bee', 'Down', 'Breakage', 'Peekaboo', 'Negro y Azul', 'Better Call Saul', '4 Days Out', 'Over', 'Mandala', 'Phoenix', 'ABQ'] },
  { number: 3, year: 2010, episodes: 13, description: 'Gus Fring oferuje Walterowi nowoczesne laboratorium i ogromne pieniądze.', titles: ['No Más', 'Caballo sin Nombre', 'I.F.T.', 'Green Light', 'Más', 'Sunset', 'One Minute', 'I See You', 'Kafkaesque', 'Fly', 'Abiquiu', 'Half Measures', 'Full Measure'] },
  { number: 4, year: 2011, episodes: 13, description: 'Śmiertelna rozgrywka między Walterem a Gusem.', titles: ['Box Cutter', 'Thirty-Eight Snub', 'Open House', 'Bullet Points', 'Shotgun', 'Cornered', 'Problem Dog', 'Hermanos', 'Bug', 'Salud', 'Crawl Space', 'End Times', 'Face Off'] },
  { number: 5, year: 2012, episodes: 16, description: 'Heisenberg na szczycie imperium — i nieuchronny upadek.', titles: ['Live Free or Die', 'Madrigal', 'Hazard Pay', 'Fifty-One', 'Dead Freight', 'Buyout', 'Say My Name', 'Gliding Over All', 'Blood Money', 'Buried', 'Confessions', 'Rabid Dog', 'To\'hajiilee', 'Ozymandias', 'Granite State', 'Felina'] },
 ] },
 { id: 'stranger-things', title: 'Stranger Things', original: 'Stranger Things', year: 2016, rating: 8.7, genres: ['Sci-Fi', 'Thriller', 'Fantasy'], director: 'Bracia Duffer', description: 'W miasteczku Hawkins znika chłopiec. Przyjaciele, rodzina i tajemnicza dziewczynka Jedenastka odkrywają przerażający świat Drugiej Strony.', quote: '„Przyjaciele nie kłamią.”', poster: tmdb('49WJfeN0moxb9IPfGn8AIqMGskD'), trailer: 'b9EkMc79ZSU', years: '2016–2025', seasons: [
  { number: 1, year: 2016, episodes: 8, description: 'Zniknięcie Willa Byersa i pojawienie się Jedenastki.', titles: ['The Vanishing of Will Byers', 'The Weirdo on Maple Street', 'Holly, Jolly', 'The Body', 'The Flea and the Acrobat', 'The Monster', 'The Bathtub', 'The Upside Down'] },
  { number: 2, year: 2017, episodes: 9, description: 'Will widzi wizje potężnego Łupieżcy Umysłów.', titles: ['MADMAX', 'Trick or Treat, Freak', 'Pollywog', 'Will the Wise', 'Dig Dug', 'The Spy', 'The Mind Flayer', 'The Gate', 'The Lost Sister'] },
  { number: 3, year: 2019, episodes: 8, description: 'Lato w galerii handlowej Starcourt i rosyjski spisek.', titles: ['Suzie, Do You Copy?', 'The Mall Rats', 'The Case of the Missing Lifeguard', 'The Sauna Test', 'The Flayed', 'E Pluribus Unum', 'The Bite', 'The Battle of Starcourt'] },
  { number: 4, year: 2022, episodes: 9, description: 'Nowe zło — Vecna — poluje na mieszkańców Hawkins.', titles: ['The Hellfire Club', 'Vecna\'s Curse', 'The Monster and the Superhero', 'Dear Billy', 'The Nina Project', 'The Dive', 'The Massacre at Hawkins Lab', 'Papa', 'The Piggyback'] },
  { number: 5, year: 2025, episodes: 8, description: 'Ostateczna bitwa o Hawkins.' },
 ] },
 { id: 'game-of-thrones', title: 'Gra o tron', original: 'Game of Thrones', year: 2011, rating: 9.2, genres: ['Fantasy', 'Dramat', 'Przygodowy'], director: 'David Benioff i D.B. Weiss', description: 'Szlacheckie rody Westeros walczą o Żelazny Tron, a za Murem budzi się prastare zło.', quote: '„Nadchodzi zima.”', poster: tmdb('1XS1oqL89opfnbLl8WnZY1O1uJx'), trailer: 'KPLWWIOCOOQ', years: '2011–2019', seasons: [
  { number: 1, year: 2011, episodes: 10, description: 'Ned Stark zostaje Namiestnikiem Króla i odkrywa groźną tajemnicę.', titles: ['Winter Is Coming', 'The Kingsroad', 'Lord Snow', 'Cripples, Bastards, and Broken Things', 'The Wolf and the Lion', 'A Golden Crown', 'You Win or You Die', 'The Pointy End', 'Baelor', 'Fire and Blood'] },
  { number: 2, year: 2012, episodes: 10, description: 'Wojna Pięciu Królów ogarnia Westeros.' },
  { number: 3, year: 2013, episodes: 10, description: 'Krwawe Gody zmieniają wszystko.' },
  { number: 4, year: 2014, episodes: 10, description: 'Purpurowe Gody i proces Tyriona.' },
  { number: 5, year: 2015, episodes: 10, description: 'Daenerys rządzi w Meereen, Jon Snow staje na czele Straży.' },
  { number: 6, year: 2016, episodes: 10, description: 'Bitwa Bękartów i powrót Starków do Winterfell.' },
  { number: 7, year: 2017, episodes: 7, description: 'Daenerys przybywa do Westeros, armia umarłych rusza.' },
  { number: 8, year: 2019, episodes: 6, description: 'Ostatnia wojna o przetrwanie i o tron.' },
 ] },
 { id: 'the-last-of-us', title: 'The Last of Us', original: 'The Last of Us', year: 2023, rating: 8.6, genres: ['Dramat', 'Przygodowy', 'Sci-Fi'], director: 'Craig Mazin i Neil Druckmann', description: 'Dwadzieścia lat po upadku cywilizacji przemytnik Joel musi przeprowadzić nastoletnią Ellie przez zrujnowaną Amerykę.', quote: '„Wszystko, co trzeba, to przetrwać.”', poster: tmdb('uKvVjHNqB5VmOrdxqAt2F7J78ED'), trailer: 'uLtkt8BonwM', years: '2023–', seasons: [
  { number: 1, year: 2023, episodes: 9, description: 'Podróż Joela i Ellie przez kraj pełen zarażonych.', titles: ['When You\'re Lost in the Darkness', 'Infected', 'Long, Long Time', 'Please Hold to My Hand', 'Endure and Survive', 'Kin', 'Left Behind', 'When We Are in Need', 'Look for the Light'] },
  { number: 2, year: 2025, episodes: 7, description: 'Pięć lat później spokój w Jackson zostaje brutalnie przerwany.', titles: ['Future Days', 'Through the Valley', 'The Path', 'Day One', 'Feel Her Love', 'The Price', 'Convergence'] },
 ] },
 { id: 'the-witcher', title: 'Wiedźmin', original: 'The Witcher', year: 2019, rating: 8, genres: ['Fantasy', 'Akcja', 'Przygodowy'], director: 'Lauren Schmidt Hissrich', description: 'Geralt z Rivii, łowca potworów, splata swój los z czarodziejką Yennefer i księżniczką Ciri.', quote: '„Zło to zło. Mniejsze, większe, średnie — wszystko jedno.”', poster: tmdb('7vjaCdMw15FEbXyLQTVa04URsPm'), trailer: 'ndl1W4ltcmg', years: '2019–', seasons: [
  { number: 1, year: 2019, episodes: 8, description: 'Losy Geralta, Yennefer i Ciri w trzech liniach czasowych.', titles: ['The End\'s Beginning', 'Four Marks', 'Betrayer Moon', 'Of Banquets, Bastards and Burials', 'Bottled Appetites', 'Rare Species', 'Before a Fall', 'Much More'] },
  { number: 2, year: 2021, episodes: 8, description: 'Geralt zabiera Ciri do Kaer Morhen.' },
  { number: 3, year: 2023, episodes: 8, description: 'Ucieczka przed tymi, którzy chcą mocy Ciri.' },
  { number: 4, year: 2025, episodes: 8, description: 'Nowy Geralt i rozdzielona drużyna na wojnie.' },
 ] },
];
