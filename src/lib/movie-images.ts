export const posterFallback = (title: string) =>
  `https://placehold.co/780x1170/111827/ffffff?text=${encodeURIComponent(title)}`;

export const backdropFallback = (title: string) =>
  `https://placehold.co/1600x900/111827/ffffff?text=${encodeURIComponent(title)}`;

export const normalizeImageUrl = (value: string | undefined, fallback: string) => {
  if (!value || value.startsWith('/__l5e/')) return fallback;
  return value;
};

export const movieImages: Record<string, string> = {
  inception: 'https://image.tmdb.org/t/p/w780/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
  'dark-knight':'https://image.tmdb.org/t/p/w780/pKKvCaL1TPTVtbI6EeliyND3api.jpg',
  'dark-knight-rises': 'https://image.tmdb.org/t/p/w780/gegAwg4aVl3jpS3oi8sij7fpArL.jpg',
  joker: 'https://image.tmdb.org/t/p/w780/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
  matrix: 'https://image.tmdb.org/t/p/w780/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg',
  avengers: 'https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
  avatar: 'https://image.tmdb.org/t/p/w780/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg',
  nemo: 'https://image.tmdb.org/t/p/original/7DvDbBOwEF6wFCeXlbM9cnx2d1g.jpg',
  'pulp-fiction':'https://image.tmdb.org/t/p/w780/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
  'fight-club': 'https://image.tmdb.org/t/p/w780/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg',
  shawshank: 'https://image.tmdb.org/t/p/w780/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
  'shawshank-redemption': 'https://image.tmdb.org/t/p/w780/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
  'forrest-gump': 'https://image.tmdb.org/t/p/w780/jfoTBFYD8OEI1a0pdLpuJ90cGTt.jpg',
  'lotr': 'https://image.tmdb.org/t/p/w780/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
  gladiator: 'https://image.tmdb.org/t/p/w780/aDb548BOkFfI4nFm0kx8A3Ezh7H.jpg',
  'spirited-away': 'https://image.tmdb.org/t/p/w780/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
  parasite: 'https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  'parasite-backdrop': 'https://image.tmdb.org/t/p/original/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg',
  'inception-backdrop': 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
  'interstellar-backdrop': 'https://image.tmdb.org/t/p/original/rAiYTsq0q27Voiy85bDoXhaC8Aq.jpg',
  'interstellar': 'https://image.tmdb.org/t/p/original/nrSaXF39nDfAAeLKksRCyvSzI2a.jpg',
  'top-gun': 'https://image.tmdb.org/t/p/w780/fmXOY1bdRJ9CmzroeaTXRyr6qyz.jpg',
  'top-gun-maverick': 'https://image.tmdb.org/t/p/w780/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
  dune: 'https://image.tmdb.org/t/p/w780/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
  oppenheimer: 'https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  titanic: 'https://image.tmdb.org/t/p/w780/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
  'django-unchained': 'https://image.tmdb.org/t/p/w780/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg',
  whiplash: 'https://image.tmdb.org/t/p/w780/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
  'la-la-land': 'https://image.tmdb.org/t/p/w780/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
  godfather: 'https://image.tmdb.org/t/p/w780/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 
  'jurassic-park': 'https://image.tmdb.org/t/p/w780/maFjKnJ62hDQ9E66dKqDZgbUy0H.jpg',
  'back-to-the-future': 'https://image.tmdb.org/t/p/w780/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg',
  'avengers-ultron': 'https://image.tmdb.org/t/p/w780/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg',
  'avengers-infinity-war': 'https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  'avengers-endgame': 'https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
  'spiderman-brand-new-day': 'https://image.tmdb.org/t/p/w780/ghF1JYv7P5BgWHYfq9dqhqqNfz8.jpg',
  shrek: 'https://image.tmdb.org/t/p/w780/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg',
  'harry-potter': 'https://image.tmdb.org/t/p/w780/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
  'dune-part-two': 'https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
  'spider-man-no-way-home': 'https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'the-batman': 'https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg',
  'days-of-thunder': 'https://image.tmdb.org/t/p/w780/8UvcoeMJag8UWGF8sg7eYspzq0Q.jpg',
  'spider-man-far-from-home': 'https://image.tmdb.org/t/p/w780/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
  'shrek-2': 'https://image.tmdb.org/t/p/w780/vi9KpZLupFmLZZWBlS6ed4G1nR5.jpg',
  vaiana: 'https://image.tmdb.org/t/p/w780/4JeejGugONWpJkbnvL12hVoYEDa.jpg',
};
