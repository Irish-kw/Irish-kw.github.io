# Personal research site

Plain HTML, CSS and JavaScript. No build step, no dependencies, no trackers.

## Layout

```
index.html            all content (hero, about, research, project, publications, contact)
assets/css/style.css  design tokens on :root (light and dark); edit colours there
assets/js/main.js     theme toggle, publication filters, nav highlight, reveal-on-scroll
assets/img/           avatar.jpg, execweave.jpg
favicon.svg           site icon and header mark
.nojekyll             tells GitHub Pages to serve the files as they are
```

The page is fully readable with JavaScript disabled; the script only adds the
theme toggle, the publication filters, the active-section highlight and the
fade-in on scroll.

## Editing

- **Publications**: each paper is one `<li class="pub">` inside its year group in
  `index.html`. `data-first="true"` marks first-author papers and `data-kind` is one of
  `journal`, `conference`, `poster`, `preprint`; these drive the filter buttons. A
  "Just Accepted" paper uses `badge-accepted`; when it is published, replace that badge and
  the venue line with the final volume, pages and DOI.
- **Google Scholar**: the band above About is a plain link to the profile; there are no
  numbers to keep up to date. Change the `href` if the profile URL changes.
- **News**: the banner above About is newest first. The lead line (`news-lead`) is the
  highlighted "New" announcement; older items are plain `<li><time>…</time><span>…</span></li>`
  entries in `news-list`. When there is newer news, make it the lead and move the old lead into the list.
- **Contact and links**: search `index.html` for `mailto:` and `github.com/Irish-kw`.
- **Photo**: replace `assets/img/avatar.jpg` (square, at least 480 px), or delete the
  `.avatar-wrap` block in the hero.
- **Colours**: change `--accent`, `--accent-2` and the related tokens at the top of `style.css`.

## Local preview

```
python3 -m http.server 8000
```

then open http://localhost:8000.

## Deploying to GitHub Pages

A user site must live in a repository named `<username>.github.io`. Put these files at the
root of that repository's default branch, then in the repository settings choose
Pages, "Deploy from a branch", and select that branch with the `/ (root)` folder.
