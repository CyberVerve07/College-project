const fs = require('fs');
const path = require('path');

const directories = ['app', 'Frontend', 'Backend', 'AI', 'Animation', 'Images', 'API'];

function getAllFiles(dirPath, arrayOfFiles) {
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
directories.forEach(dir => {
    if (fs.existsSync(dir)) {
        allFiles = getAllFiles(dir, allFiles);
    }
});

let modifiedFiles = 0;

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // 1. Animations
    content = content.replace(/@\/components\/animations\//g, '@/animation/');
    content = content.replace(/@\/components\/ui\/(animated-counter|animated-section|carousel|color-splash|motion|snow-particles|typewriter)/g, '@/animation/$1');

    // 2. Images/Data
    content = content.replace(/@\/lib\/(placeholder-images|destinations-data|services-data|testimonials-data|himachal-knowledge)/g, '@/images/$1');

    // 3. Backend (Firebase)
    content = content.replace(/@\/firebase\//g, '@/backend/');

    // 4. AI
    content = content.replace(/@\/ai\//g, '@/ai/');

    // 5. API
    content = content.replace(/@\/app\/api\//g, '@/api/');

    // 6. Actions
    content = content.replace(/@\/app\/actions\//g, '@/backend/actions/');

    // 7. Frontend
    content = content.replace(/@\/components\//g, '@/frontend/components/');
    content = content.replace(/@\/hooks\//g, '@/frontend/hooks/');
    // Ensure we don't duplicate frontend/lib for everything, but replace @/lib/ except those already converted
    content = content.replace(/@\/lib\/(?!images\/|frontend\/)/g, '@/frontend/lib/');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedFiles++;
    }
});

console.log('Modified ' + modifiedFiles + ' files.');
