import { describe, expect, it } from 'vitest';
import { filterMovies, movies } from './movies';
describe('Movie catalogue', () => {
 it('contains 28 films', () => expect(movies).toHaveLength(28));
 it('includes both Top Gun films', () => expect(filterMovies('top gun', 'Wszystkie', 'all', []).map(m => m.id)).toEqual(['top-gun', 'top-gun-maverick']));
 it('searches Polish and original titles without case sensitivity', () => expect(filterMovies('INCEPTION', 'Wszystkie', 'all', []).map(m => m.id)).toEqual(['inception']));
 it('searches directors', () => expect(filterMovies('Bong Joon-ho', 'Wszystkie', 'all', []).map(m => m.id)).toEqual(['parasite']));
 it('filters genres', () => expect(filterMovies('', 'Historyczny', 'all', []).map(m => m.id)).toEqual(['gladiator']));
 it('keeps favorites separate from watchlist', () => expect(filterMovies('', 'Wszystkie', 'favorite', [{ movie_id: 'matrix', list_type: 'favorite' }, { movie_id: 'joker', list_type: 'watchlist' }]).map(m => m.id)).toEqual(['matrix']));
 it('combines saved lists with search and genre', () => expect(filterMovies('Joker', 'Sci-Fi', 'watchlist', [{ movie_id: 'joker', list_type: 'watchlist' }])).toEqual([]));
});