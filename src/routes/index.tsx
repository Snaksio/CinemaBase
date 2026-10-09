import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';
import { Bookmark, CalendarDays, Check, ChevronLeft, ChevronRight, Clapperboard, Clock, Heart, LogOut, Plus, Search, Star, StarHalf, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { filterMovies, genres, movies, weeklyMovies, trailerId, trailerSearchUrl, type CatalogueView, type Movie } from '@/lib/movies';
import { movieImages } from '@/lib/movie-images';

export const Route = createFileRoute('/')({
 head: () => ({ meta: [
  { title: 'CinemaBase — Odkryj swój następny film' },
  { name: 'description', content: 'Odkrywaj 37 wyjątkowych filmów. Oglądaj zwiastuny, oceniaj filmy i zapisuj ulubione filmy oraz listę do obejrzenia.' },
  { property: 'og:title', content: 'CinemaBase — Odkryj swój następny film' },
  { property: 'og:description', content: 'Twoje ulubione historie w jednym miejscu. Odkrywaj filmy i twórz własne listy.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  { property: 'og:image', content: movieImages['parasite-backdrop'] }, { name: 'twitter:image', content: movieImages['parasite-backdrop'] },
 ] }),
 component: Index,
});

function Index() {
 const [search, setSearch] = useState('');
 const [genre, setGenre] = useState('Wszystkie');
 const [view, setView] = useState<CatalogueView>('all');
 const [slide, setSlide] = useState(0);
 const [selected, setSelectedRaw] = useState<Movie | null>(null);
 const setSelected = (m: Movie | null) => { setSelectedRaw(m); setSeason(1); };
 const [user, setUser] = useState<User | null>(null);
 const [authOpen, setAuthOpen] = useState(false);
 const [signup, setSignup] = useState(false);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [authMessage, setAuthMessage] = useState('');
 const [authBusy, setAuthBusy] = useState(false);
 const [pending, setPending] = useState<string[]>([]);
 const [notice, setNotice] = useState('');
 const searchRef = useRef<HTMLInputElement>(null);
 const queryClient = useQueryClient();
  const featured = ['parasite', 'inception', 'interstellar'].map(id => movies.find(movie => movie.id === id)).filter((movie): movie is Movie => Boolean(movie));
  const weekly = weeklyMovies(new Date());
 const hero = featured[slide] ?? movies[0];
 const { data: lists = [], error: listError } = useQuery({
  queryKey: ['film-lists', user?.id], enabled: Boolean(user),
  queryFn: async () => {
   if (!user) return [];
   const { data, error } = await supabase.from('film_lists').select('movie_id,list_type').eq('user_id', user.id);
   if (error) throw error;
   return data;
  },
 });
 const { data: ratings = [] } = useQuery({
  queryKey: ['film-ratings', user?.id], enabled: Boolean(user),
  queryFn: async () => {
   if (!user) return [];
   const { data, error } = await supabase.from('film_ratings').select('movie_id,score').eq('user_id', user.id).order('updated_at', { ascending: false });
   if (error) throw error;
   return data;
  },
 });
 const myScore = (id: string) => ratings.find(r => r.movie_id === id)?.score;
 const [kind, setKind] = useState<'movie' | 'series'>('movie');
 const [season, setSeason] = useState(1);
 const filtered = filterMovies(search, genre, view, [...lists, ...ratings.map(r => ({ movie_id: r.movie_id, list_type: 'rated' }))], view === 'all' ? kind : 'any');
 const currentSeason = selected?.seasons?.find(s => s.number === season) ?? selected?.seasons?.[0];
 async function rate(id: string, score: number) {
  if (!user) { setAuthMessage('Zaloguj się, aby oceniać filmy.'); setAuthOpen(true); return; }
  try {
   const remove = myScore(id) === score;
   const result = remove ? await supabase.from('film_ratings').delete().eq('user_id', user.id).eq('movie_id', id) : await supabase.from('film_ratings').upsert({ user_id: user.id, movie_id: id, score, updated_at: new Date().toISOString() });
   if (result.error) throw result.error;
   await queryClient.invalidateQueries({ queryKey: ['film-ratings', user.id] });
   setNotice(remove ? 'Ocena usunięta.' : `Oceniono na ${score}/10.`);
  } catch { setNotice('Nie udało się zapisać oceny. Spróbuj ponownie.'); }
 }
 const isSaved = (id: string, type: string) => lists.some(entry => entry.movie_id === id && entry.list_type === type);
 useEffect(() => {
  supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user ?? null); if (session) setAuthOpen(false); });
  return () => subscription.unsubscribe();
 }, []);
 useEffect(() => {
  const listener = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key === 'k') { event.preventDefault(); searchRef.current?.focus(); } };
  window.addEventListener('keydown', listener);
  return () => window.removeEventListener('keydown', listener);
 }, []);
 useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 3500); return () => clearTimeout(timer); }, [notice]);
 async function toggle(id: string, type: 'favorite' | 'watchlist') {
  if (!user) { setAuthMessage('Zaloguj się, aby zapisać swoje filmy.'); setAuthOpen(true); return; }
  const key = `${id}-${type}`;
  if (pending.includes(key)) return;
  setPending(current => [...current, key]);
  const saved = isSaved(id, type);
  try {
   const result = saved ? await supabase.from('film_lists').delete().eq('user_id', user.id).eq('movie_id', id).eq('list_type', type) : await supabase.from('film_lists').insert({ user_id: user.id, movie_id: id, list_type: type });
   if (result.error) throw result.error;
   await queryClient.invalidateQueries({ queryKey: ['film-lists', user.id] });
   setNotice(saved ? 'Film usunięty z listy.' : type === 'favorite' ? 'Film dodany do ulubionych.' : 'Film dodany do listy „Chcę obejrzeć”.');
  } catch { setNotice('Nie udało się zapisać zmiany. Spróbuj ponownie.'); }
  finally { setPending(current => current.filter(item => item !== key)); }
 }
 function changeView(next: CatalogueView) { setView(next); setGenre('Wszystkie'); setSearch(''); }
 async function submitAuth(event: React.FormEvent) {
  event.preventDefault(); setAuthBusy(true); setAuthMessage('');
  try {
   const { data, error } = signup ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } }) : await supabase.auth.signInWithPassword({ email, password });
   if (error) { setAuthMessage(signup ? 'Nie udało się utworzyć konta. Sprawdź dane i spróbuj ponownie.' : 'Nieprawidłowy e-mail lub hasło. Sprawdź również potwierdzenie adresu e-mail.'); return; }
   if (data.session) setAuthOpen(false); else setAuthMessage('Sprawdź swoją skrzynkę i potwierdź adres e-mail, aby dokończyć rejestrację.');
  } catch { setAuthMessage('Nie udało się połączyć. Spróbuj ponownie.'); }
  finally { setAuthBusy(false); }
 }
 async function googleLogin() { setAuthBusy(true); try { const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin }); if (result.error) setAuthMessage('Nie udało się zalogować przez Google. Spróbuj ponownie.'); } catch { setAuthMessage('Nie udało się połączyć z Google.'); } finally { setAuthBusy(false); } }
 return <>
  <header className="site-header">
   <div className="brand"><span className="brand-mark"><Clapperboard size={20} /></span><span>Cinema<em>Base</em></span></div>
   <label className="search-box"><Search size={17} /><input ref={searchRef} aria-label="Szukaj filmów, gatunków, reżyserów" placeholder="Szukaj filmów, gatunków, reżyserów..." value={search} onChange={event => setSearch(event.target.value)} />{search ? <Button variant="navigation" size="icon" className="h-6 w-6" aria-label="Wyczyść wyszukiwanie" onClick={() => setSearch('')}><X /></Button> : <kbd>⌘K</kbd>}</label>
   <nav className="header-nav" aria-label="Listy filmów">
    <Button variant="navigation" className={`all-nav ${view === 'all' ? 'active' : ''}`} onClick={() => changeView('all')}>Wszystkie</Button>
    <Button variant="navigation" className={view === 'watchlist' ? 'active' : ''} onClick={() => changeView('watchlist')} aria-label="Chcę obejrzeć"><Bookmark /><span className="nav-label">Chcę obejrzeć</span>{lists.filter(e => e.list_type === 'watchlist').length > 0 && <span className="nav-count">{lists.filter(e => e.list_type === 'watchlist').length}</span>}</Button>
    <Button variant="navigation" className={view === 'favorite' ? 'active' : ''} onClick={() => changeView('favorite')} aria-label="Ulubione"><Heart /><span className="nav-label">Ulubione</span>{lists.filter(e => e.list_type === 'favorite').length > 0 && <span className="nav-count">{lists.filter(e => e.list_type === 'favorite').length}</span>}</Button>
    <Button variant="navigation" className={view === 'rated' ? 'active' : ''} onClick={() => changeView('rated')} aria-label="Ocenione"><StarHalf /><span className="nav-label">Ocenione</span>{ratings.length > 0 && <span className="nav-count">{ratings.length}</span>}</Button>
    {user && <Button variant="navigation" size="icon" title="Wyloguj się" aria-label="Wyloguj się" onClick={async () => { await supabase.auth.signOut(); queryClient.removeQueries({ queryKey: ['film-lists'] }); queryClient.removeQueries({ queryKey: ['film-ratings'] }); }}><LogOut /></Button>}
   </nav>
  </header>
  <main className="page-main">
  {hero && view === 'all' && !search && <section className="featured clickable" aria-label="Polecane filmy" onClick={() => setSelected(hero)} role="button" tabIndex={0} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(hero); } }}>
    <img className="featured-image" src={hero.backdrop} alt={`Kadr z filmu ${hero.title}`} />
    <div className="featured-copy">
     <div className="featured-tags"><span className="recommended">POLECANE</span>{hero.genres.map(tag => <span key={tag}>{tag}</span>)}</div>
     <h1>{hero.title}</h1>
     <div className="film-meta"><span className="rating"><Star size={14} /><strong>{hero.rating}</strong><span className="text-muted-foreground">/ 10</span></span><span><CalendarDays size={13} />{hero.year}</span><span>{hero.director}</span></div>
     <p className="featured-description">{hero.description}</p><p className="film-quote">{hero.quote}</p>
    </div>
    <Button variant="tool" size="icon" className="featured-arrow previous" aria-label="Poprzedni polecany film" onClick={event => { event.stopPropagation(); setSlide((slide + featured.length - 1) % featured.length); }}><ChevronLeft /></Button>
    <Button variant="tool" size="icon" className="featured-arrow next" aria-label="Następny polecany film" onClick={event => { event.stopPropagation(); setSlide((slide + 1) % featured.length); }}><ChevronRight /></Button>
    <div className="carousel-dots" onClick={event => event.stopPropagation()}>{featured.map((movie, index) => <Button key={movie.id} variant="navigation" className={slide === index ? 'current' : ''} onClick={() => setSlide(index)} aria-label={`Polecany film: ${movie.title}`} aria-pressed={slide === index} />)}</div>
    </section>}
    {view === 'all' && !search && <section className="weekly" aria-label="Filmy tygodnia">
     <div className="catalogue-heading"><div><h2>Filmy tygodnia</h2><p className="movie-count">Nowy wybór w każdy poniedziałek</p></div></div>
     <div className="weekly-grid">{weekly.map(movie => <button type="button" className="weekly-card" key={movie.id} onClick={() => setSelected(movie)} aria-label={`Szczegóły: ${movie.title}`}>
      <img src={movie.poster} alt={`Plakat filmu ${movie.title}`} loading="lazy" />
      <div className="weekly-info"><span className="rating"><Star size={12} />{movie.rating}</span><h3>{movie.title}</h3><p>{movie.year} · {movie.genres[0]}</p></div>
     </button>)}</div>
    </section>}
    <section className="catalogue" aria-label="Katalog filmów">
     <div className="catalogue-heading"><div><h2>{search ? 'Wyniki wyszukiwania' : view === 'favorite' ? 'Twoje ulubione' : view === 'watchlist' ? 'Chcę obejrzeć' : view === 'rated' ? 'Ocenione' : kind === 'series' ? 'Odkryj swój następny serial' : 'Odkryj swój następny film'}</h2><p className="movie-count">{filtered.length} {view === 'all' && kind === 'series' ? (filtered.length === 1 ? 'serial' : filtered.length > 1 && filtered.length < 5 ? 'seriale' : 'seriali') : filtered.length === 1 ? 'tytuł' : filtered.length > 1 && filtered.length < 5 ? 'tytuły' : 'tytułów'}</p></div>
      {view === 'all' && <div className="genre-list" aria-label="Rodzaj"><Button variant={kind === 'movie' ? 'selected' : 'cinema'} aria-pressed={kind === 'movie'} onClick={() => { setKind('movie'); setGenre('Wszystkie'); }}>Filmy</Button><Button variant={kind === 'series' ? 'selected' : 'cinema'} aria-pressed={kind === 'series'} onClick={() => { setKind('series'); setGenre('Wszystkie'); }}>Seriale</Button></div>}</div>
     <div className="genre-list" aria-label="Gatunki filmowe">{genres.map(tag => <Button key={tag} variant={genre === tag ? 'selected' : 'cinema'} onClick={() => setGenre(tag)} aria-pressed={genre === tag}>{tag}</Button>)}</div>
    {listError && <p className="auth-message">Nie udało się wczytać Twoich list. <Button variant="link" onClick={() => queryClient.invalidateQueries({ queryKey: ['film-lists'] })}>Spróbuj ponownie</Button></p>}
    <div className="movie-grid">{filtered.map(movie => <article className="movie-card" key={movie.id}>
     <Button variant="navigation" className="poster-button" aria-label={`Szczegóły: ${movie.title}`} onClick={() => setSelected(movie)}><img src={movie.poster} alt={`Plakat filmu ${movie.title}`} loading="lazy" /></Button>
     <span className="poster-rating"><Star />{movie.rating}</span>{myScore(movie.id) && <span className="my-score" title="Twoja ocena">Ty: {myScore(movie.id)}</span>}
     <div className="poster-actions"><Button variant="tool" size="icon" className={isSaved(movie.id, 'favorite') ? 'saved' : ''} title={isSaved(movie.id, 'favorite') ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'} aria-label={`${isSaved(movie.id, 'favorite') ? 'Usuń z' : 'Dodaj do'} ulubionych: ${movie.title}`} aria-pressed={isSaved(movie.id, 'favorite')} disabled={pending.includes(`${movie.id}-favorite`)} onClick={() => toggle(movie.id, 'favorite')}><Heart className="heart" /></Button><Button variant="tool" size="icon" className={isSaved(movie.id, 'watchlist') ? 'saved' : ''} title={isSaved(movie.id, 'watchlist') ? 'Usuń z listy do obejrzenia' : 'Chcę obejrzeć'} aria-label={`Chcę obejrzeć: ${movie.title}`} aria-pressed={isSaved(movie.id, 'watchlist')} disabled={pending.includes(`${movie.id}-watchlist`)} onClick={() => toggle(movie.id, 'watchlist')}>{isSaved(movie.id, 'watchlist') ? <Check /> : <Plus />}</Button></div>
     <div className="poster-info"><h3>{movie.title}</h3><p><CalendarDays />{movie.year}<span>· {movie.genres.join(', ')}</span></p></div>
    </article>)}</div>
    {!filtered.length && <div className="empty-state">{view === 'favorite' ? <Heart size={32} /> : view === 'watchlist' ? <Bookmark size={32} /> : view === 'rated' ? <StarHalf size={32} /> : <Search size={32} />}<h3>{search || genre !== 'Wszystkie' ? 'Nie znaleziono filmów' : 'Twoja lista jest jeszcze pusta'}</h3><p>{search || genre !== 'Wszystkie' ? 'Spróbuj innego tytułu lub gatunku.' : 'Jeszcze tyle dobrych historii przed Tobą.'}</p>{!user && view !== 'all' ? <Button onClick={() => { setAuthMessage(''); setAuthOpen(true); }}>Zaloguj się</Button> : <Button variant="selected" onClick={() => changeView('all')}>Wróć do wszystkich filmów</Button>}</div>}
   </section>
   <footer className="site-footer"><span>CinemaBase · Dobre historie zostają z Tobą.</span><span>{movies.length} filmów. Nieskończenie wiele emocji.</span></footer>
  </main>
  <Dialog open={Boolean(selected)} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="detail-dialog">{selected && <div className="detail-layout"><img className="detail-poster" src={selected.poster} alt={`Plakat: ${selected.title}`} /><div><DialogTitle className="detail-title">{selected.title}</DialogTitle><p className="detail-original">{selected.original}</p><div className="film-meta"><span className="rating"><Star size={14} />{selected.rating} / 10</span><span><CalendarDays size={13} />{selected.year}</span><span><Clock size={13} />{selected.duration}</span></div><div className="featured-tags mt-4">{selected.genres.map(tag => <span key={tag}>{tag}</span>)}</div><DialogDescription className="detail-description">{selected.description}</DialogDescription>{selected.seasons && currentSeason && <div className="season-box"><p className="detail-original">Serial · {selected.years}</p><div className="genre-list" aria-label="Sezony">{selected.seasons.map(s => <Button key={s.number} size="sm" variant={currentSeason.number === s.number ? 'selected' : 'cinema'} aria-pressed={currentSeason.number === s.number} onClick={() => setSeason(s.number)}>Sezon {s.number}</Button>)}</div><p className="season-meta">{currentSeason.year} · {currentSeason.episodes} odcinków</p><p className="season-text">{currentSeason.description}</p></div>}{trailerId(selected.id) ? <div className="trailer-box"><iframe src={`https://www.youtube-nocookie.com/embed/${trailerId(selected.id)}`} title={`Zwiastun: ${selected.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" /></div> : <a className="trailer-link" href={trailerSearchUrl(selected)} target="_blank" rel="noreferrer">▶ Obejrzyj zwiastun na YouTube</a>}<div className="rate-box"><span>{myScore(selected.id) ? `Twoja ocena: ${myScore(selected.id)}/10` : 'Oceń film:'}</span><div className="rate-stars" role="radiogroup" aria-label="Twoja ocena">{Array.from({ length: 10 }, (_, i) => i + 1).map(n => <button key={n} type="button" role="radio" aria-checked={myScore(selected.id) === n} aria-label={`Oceń na ${n}`} className={(myScore(selected.id) ?? 0) >= n ? 'on' : ''} onClick={() => rate(selected.id, n)}><Star size={20} /></button>)}</div></div><p className="detail-director"><span>{selected.kind === 'series' ? 'Twórcy: ' : 'Reżyseria: '}</span>{selected.director}</p><div className="detail-actions"><Button variant={isSaved(selected.id, 'watchlist') ? 'selected' : 'default'} disabled={pending.includes(`${selected.id}-watchlist`)} onClick={() => toggle(selected.id, 'watchlist')}>{isSaved(selected.id, 'watchlist') ? <Check /> : <Bookmark />}{isSaved(selected.id, 'watchlist') ? 'Na liście do obejrzenia' : 'Chcę obejrzeć'}</Button><Button variant={isSaved(selected.id, 'favorite') ? 'selected' : 'cinema'} disabled={pending.includes(`${selected.id}-favorite`)} onClick={() => toggle(selected.id, 'favorite')}><Heart />{isSaved(selected.id, 'favorite') ? 'W ulubionych' : 'Dodaj do ulubionych'}</Button></div></div></div>}</DialogContent></Dialog>
  <Dialog open={authOpen} onOpenChange={setAuthOpen}><DialogContent className="auth-dialog"><DialogTitle>{signup ? 'Dołącz do CinemaBase' : 'Witaj w CinemaBase'}</DialogTitle><DialogDescription>Twoje filmy, Twoje listy, Twoje historie.</DialogDescription><Button variant="outline" disabled={authBusy} onClick={googleLogin}>Kontynuuj z Google</Button><div className="auth-separator">lub przez e-mail</div><form className="auth-form" onSubmit={submitAuth}><label>E-mail<input type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="twoj@email.pl" required /></label><label>Hasło<input type="password" autoComplete={signup ? 'new-password' : 'current-password'} value={password} onChange={event => setPassword(event.target.value)} minLength={6} required /></label>{authMessage && <p role="status" className="auth-message">{authMessage}</p>}<Button type="submit" disabled={authBusy}>{authBusy ? 'Chwileczkę…' : signup ? 'Utwórz konto' : 'Zaloguj się'}</Button></form><Button variant="link" className="auth-switch" onClick={() => { setSignup(!signup); setAuthMessage(''); }}>{signup ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}</Button></DialogContent></Dialog>
  {notice && <div className="notice" role="status">{notice}</div>}
 </>;
}
