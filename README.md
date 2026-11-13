# DAIRY-FARM-

An English-language dairy farm website for Nain Dairy Farm, built with HTML, CSS, and JavaScript.

The site includes responsive product showcases, farm storytelling, contact links,
and a review carousel with clearly marked placeholders until genuine customer
reviews are available. Product artwork is drawn in CSS; replace it with approved
farm and product photography when available.

## Run locally

Open `index.html` in a browser, or start a local server from this folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Public website

The site is deployed to GitHub Pages when changes are pushed to the `main`
branch. After the first deployment completes, it will be available at
https://nainlakshya22.github.io/DAIRY-FARM-/.

Before using the contact section, replace the sample phone number, email address,
and location in `index.html` with your farm's contact details. The contact form
opens an email draft in the visitor's default mail app.

To configure the floating WhatsApp button, update its `data-phone` value in
`index.html` to the farm's country code and phone number using digits only.
