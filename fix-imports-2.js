const fs = require('fs');
const path = require('path');

const ROOT_PACKAGES = ['app', 'AI', 'API', 'Animation', 'Backend', 'Frontend', 'Images', 'Java'];

function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

let allFiles = [];
ROOT_PACKAGES.forEach(dir => {
    allFiles = getAllFiles(dir, allFiles);
});

let modifiedFiles = 0;

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Replace usages that don't have trailing slashes
    content = content.replace(/@\/firebase(['"])/g, '@/backend/firebase$1');
    content = content.replace(/@\/ai(['"])/g, '@/ai/ai$1');
    content = content.replace(/@\/components(['"])/g, '@/frontend/components$1');
    content = content.replace(/@\/lib(['"])/g, '@/frontend/lib$1');
    content = content.replace(/@\/hooks(['"])/g, '@/frontend/hooks$1');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedFiles++;
    }
});

console.log('Modified ' + modifiedFiles + ' files.');
