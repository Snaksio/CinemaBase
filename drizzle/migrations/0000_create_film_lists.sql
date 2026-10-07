CREATE TABLE public.film_lists (
 user_id uuid NOT NULL,
 movie_id text NOT NULL,
 list_type text NOT NULL CHECK (list_type IN ('favorite', 'watchlist')),
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (user_id, movie_id, list_type)
);
GRANT SELECT, INSERT, DELETE ON public.film_lists TO authenticated;
GRANT ALL ON public.film_lists TO service_role;
ALTER TABLE public.film_lists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own film lists" ON public.film_lists FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Add own films" ON public.film_lists FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Remove own films" ON public.film_lists FOR DELETE TO authenticated USING (auth.uid() = user_id);