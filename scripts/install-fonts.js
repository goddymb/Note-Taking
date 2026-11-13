// Installs the app's fonts locally so the interface looks right offline.
// Each font goes into its own folder; a font that fails to install is skipped (the app falls back to system fonts).
const { execSync } = require('node:child_process');
const path = require('node:path');
const fonts = ['inter', 'sora', 'plus-jakarta-sans', 'fraunces', 'manrope', 'newsreader'];
for (const f of fonts) {
  const dir = path.join(__dirname, '..', 'vendor-fonts', f);
  try {
    execSync(`npm install --prefix "${dir}" --no-audit --no-fund --omit=dev @fontsource-variable/${f}@5`, { stdio: 'inherit' });
  } catch (e) {
    console.warn(`(skipped font ${f})`);
  }
}
