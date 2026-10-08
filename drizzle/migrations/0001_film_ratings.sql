CREATE TABLE public.film_ratings (
 user_id uuid NOT NULL,
 movie_id text NOT NULL,
 score smallint NOT NULL CHECK (score BETWEEN 1 AND 10),
 updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (user_id, movie_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.film_ratings TO authenticated;
GRANT ALL ON public.film_ratings TO service_role;
ALTER TABLE public.film_ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own ratings" ON public.film_ratings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Add own ratings" ON public.film_ratings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update own ratings" ON public.film_ratings FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Delete own ratings" ON public.film_ratings FOR DELETE TO authenticated USING (auth.uid() = user_id);