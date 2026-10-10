import { describe, expect, it } from 'vitest';
import { filterMovies, movies, weeklyMovies } from './movies';
describe('Movie catalogue', () => {
 it('contains 42 films', () => expect(movies).toHaveLength(42));
 it('includes all four Avengers films', () => expect(filterMovies('avengers', 'Wszystkie', 'all', []).map(m => m.id)).toEqual(['avengers', 'avengers-ultron', 'avengers-infinity-war', 'avengers-endgame']));
 it('includes both Top Gun films', () => expect(filterMovies('top gun', 'Wszystkie', 'all', []).map(m => m.id)).toEqual(['top-gun', 'top-gun-maverick']));
 it('searches Polish and original titles without case sensitivity', () => expect(filterMovies('INCEPTION', 'Wszystkie', 'all', []).map(m => m.id)).toEqual(['inception']));
 it('searches directors', () => expect(filterMovies('Bong Joon-ho', 'Wszystkie', 'all', []).map(m => m.id)).toEqual(['parasite']));
 it('filters genres', () => expect(filterMovies('', 'Historyczny', 'all', []).map(m => m.id)).toEqual(['gladiator', 'oppenheimer', 'titanic']));
 it('shows only rated films in rated view', () => expect(filterMovies('', 'Wszystkie', 'rated', [{ movie_id: 'joker', list_type: 'rated' }, { movie_id: 'matrix', list_type: 'favorite' }]).map(m => m.id)).toEqual(['joker']));
 it('keeps favorites separate from watchlist', () => expect(filterMovies('', 'Wszystkie', 'favorite', [{ movie_id: 'matrix', list_type: 'favorite' }, { movie_id: 'joker', list_type: 'watchlist' }]).map(m => m.id)).toEqual(['matrix']));
 it('combines saved lists with search and genre', () => expect(filterMovies('Joker', 'Sci-Fi', 'watchlist', [{ movie_id: 'joker', list_type: 'watchlist' }])).toEqual([]));
 it('picks 4 distinct movies of the week', () => {
  const weekly = weeklyMovies(new Date('2026-10-07'));
  expect(weekly).toHaveLength(4);
  expect(new Set(weekly.map(m => m.id)).size).toBe(4);
 });
 it('rotates the weekly selection every week', () => {
  const thisWeek = weeklyMovies(new Date('2026-10-07')).map(m => m.id);
  const nextWeek = weeklyMovies(new Date('2026-10-14')).map(m => m.id);
  expect(thisWeek).not.toEqual(nextWeek);
 });
 it('keeps the same selection within one week', () => {
  expect(weeklyMovies(new Date('2026-10-05')).map(m => m.id)).toEqual(weeklyMovies(new Date('2026-10-11')).map(m => m.id));
 });
});import { trailerId } from './movies';
it('has a trailer for Inception', () => expect(trailerId('inception')).toBe('YoHD9XEInc0'));
it('shows series only in the series catalogue', () => expect(filterMovies('', 'Wszystkie', 'all', [], 'series').map(m => m.id)).toEqual(['breaking-bad', 'stranger-things', 'game-of-thrones', 'the-last-of-us', 'the-witcher']));
it('keeps saved series in lists', () => expect(filterMovies('', 'Wszystkie', 'favorite', [{ movie_id: 'breaking-bad', list_type: 'favorite' }], 'any').map(m => m.id)).toEqual(['breaking-bad']));
