# Tailwind & daisyUI — Latest

This starter is set to install **latest** versions of TailwindCSS and daisyUI.

## If Tailwind v4 is installed
Tailwind v4 changes the default setup:

1) Replace `src/index.css` with `src/index.tailwind4.css` (or copy the single line below):
   ```css
   @import "tailwindcss";
   ```
2) You may **remove** `tailwind.config.js` if you don't customize (v4 works config-less).
   If you want daisyUI themes, keep the config and plugin as-is.

3) Keep `daisyui` plugin in `tailwind.config.js`. If any build warnings appear,
   update according to daisyUI docs for v4 compatibility.

## If Tailwind v3.x is installed
No changes required — the current `@tailwind base/components/utilities` file works.

---

Tip: If you see class scanning issues, ensure `tailwind.config.js` includes:
```
content: ["./index.html", "./src/**/*.{ts,tsx}"]
```
