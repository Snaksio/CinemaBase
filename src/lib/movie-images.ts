const posterFallback = (title: string) =>
  `https://placehold.co/780x1170/111827/ffffff?text=${encodeURIComponent(title)}`;

const backdropFallback = (title: string) =>
  `https://placehold.co/1600x900/111827/ffffff?text=${encodeURIComponent(title)}`;

const normalizeImageUrl = (value: string | undefined, fallback: string) => {
  if (!value || value.startsWith('/__l5e/')) return fallback;
  return value;
};

export const movieImages: Record<string, string> = {
  inception: 'https://image.tmdb.org/t/p/w780/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
  'dark-knight':'https://image.tmdb.org/t/p/w780/pKKvCaL1TPTVtbI6EeliyND3api.jpg',
  'dark-knight-rises': 'https://image.tmdb.org/t/p/w780/gegAwg4aVl3jpS3oi8sij7fpArL.jpg',
  joker: normalizeImageUrl(undefined, posterFallback('Joker')),
  matrix: normalizeImageUrl(undefined, posterFallback('The Matrix')),
  avengers: normalizeImageUrl(undefined, posterFallback('The Avengers')),
  avatar: normalizeImageUrl(undefined, posterFallback('Avatar')),
  nemo: normalizeImageUrl(undefined, posterFallback('Finding Nemo')),
  'pulp-fiction': normalizeImageUrl(undefined, posterFallback('Pulp Fiction')),
  interstellar: normalizeImageUrl(undefined, posterFallback('Interstellar')),
  'fight-club': normalizeImageUrl(undefined, posterFallback('Fight Club')),
  shawshank: normalizeImageUrl(undefined, posterFallback('The Shawshank Redemption')),
  'forrest-gump': normalizeImageUrl(undefined, posterFallback('Forrest Gump')),
  lotr: normalizeImageUrl(undefined, posterFallback('The Lord of the Rings')),
  gladiator: normalizeImageUrl(undefined, posterFallback('Gladiator')),
  'spirited-away': normalizeImageUrl(undefined, posterFallback('Spirited Away')),
  parasite: normalizeImageUrl(undefined, posterFallback('Parasite')),
  'parasite-backdrop': normalizeImageUrl(undefined, backdropFallback('Parasite')),
  'inception-backdrop': normalizeImageUrl(undefined, backdropFallback('Inception')),
  'interstellar-backdrop': normalizeImageUrl(undefined, backdropFallback('Interstellar')),
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
