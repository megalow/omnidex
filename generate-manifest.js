const fs = require('fs-extra');
const path = require('path');

const folders = ['complete', 'wip', 'community'];
const manifest = {};

folders.forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (fs.existsSync(folderPath)) {
    manifest[folder] = fs.readdirSync(folderPath)
      .filter(file => !file.startsWith('.') && !fs.lstatSync(path.join(folderPath, file)).isDirectory());
  } else {
    manifest[folder] = [];
  }
});

fs.writeJsonSync('manifest.json', manifest, { spaces: 2 });
console.log('✅ Manifest generated successfully.');
