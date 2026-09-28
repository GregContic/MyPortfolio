

MyPortfolio - Harry Gregson Denesia
===================================

A static HTML, CSS, and JavaScript portfolio hosted on GitHub Pages.

Local preview
-------------
Open `index.html` directly for a quick preview, or serve the repository root so
relative paths behave like production:

	python -m http.server 8000

Then visit http://localhost:8000.

Active files
------------
- `index.html` - homepage, contact form, and project highlights
- `projects.html` - project archive and category filters
- `css/portfolio-refresh.css` - active visual system and responsive styles
- `css/fonts.css` - local Lora and Poppins font declarations
- `js/portfolio-motion.js` - scroll, reveal, and reduced-motion behavior
- `js/contact-form.js` - optional hosted contact-form integration
- `images/` - active portfolio and profile images
- `resume/` - downloadable resume PDF

Contact form setup
------------------
The contact form is prepared for a hosted static form service such as Formspree,
but it is intentionally not connected to an endpoint in the repository. To enable
submissions, add your Formspree endpoint to the `data-endpoint` attribute on the
form in `index.html`, for example:

	data-endpoint="https://formspree.io/f/your-form-id"

Do not put private API keys or credentials in the frontend. Until configured, the
form explains that setup is pending and the mailto fallback remains available.

Deployment
----------
GitHub Pages publishes the repository as a static site at:

	https://gregcontic.github.io/MyPortfolio/

Push changes to the published branch and wait for GitHub Pages to redeploy. Verify
the homepage, project archive, resume link, images, favicon, `robots.txt`, and
`sitemap.xml` after deployment.

Contact
-------
harrydenesia44@gmail.com

License
-------
Use as you like; attribution appreciated.
