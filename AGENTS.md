<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep the curated film catalogue in a browser-safe data module; it is fixed editorial content, not user-managed data.
- Store personal film-list entries in Cloud with owner-scoped RLS; browser queries use the generated client and never privileged credentials.
- Keep catalogue views on the home screen as filter state, since all views share the same browsing experience.
