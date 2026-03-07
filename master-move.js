const fs = require('fs');
const path = require('path');

const ROOT_PACKAGES = ['app', 'AI', 'API', 'Animation', 'Backend', 'Frontend', 'Images', 'Java'];

// 1. Clean up potentially broken packages from previous aborts
ROOT_PACKAGES.forEach(pkg => {
    if (fs.existsSync(pkg)) {
        fs.rmSync(pkg, { recursive: true, force: true });
    }
});

// 2. Create fresh packages
ROOT_PACKAGES.forEach(pkg => fs.mkdirSync(pkg, { recursive: true }));

// Helper to move file/folder safely across devices/existing dirs
function safeMove(srcPath, destPath) {
    if (fs.existsSync(srcPath)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        // Use copy then remove to avoid Windows cross-device link/existing dir EPERM issues
        fs.cpSync(srcPath, destPath, { recursive: true, force: true });
        fs.rmSync(srcPath, { recursive: true, force: true });
    } else {
        console.log('Skipping missing source:', srcPath);
    }
}

// --- MOVEMENT LOGIC ---
// a) Java
safeMove('java-backend', 'Java'); // Whole dir

// b) Frontend
safeMove('src/components', 'Frontend/components');
safeMove('src/hooks', 'Frontend/hooks');
safeMove('src/lib', 'Frontend/lib');

// c) Animation (extract from Frontend/components/ui)
const animations = [
    'animated-counter.tsx', 'animated-section.tsx', 'carousel.tsx',
    'color-splash.tsx', 'motion.tsx', 'snow-particles.tsx', 'typewriter.tsx'
];
animations.forEach(anim => {
    safeMove(`Frontend/components/ui/${anim}`, `Animation/${anim}`);
});

// d) Images (extract from Frontend/lib)
const dataFiles = [
    'placeholder-images.json', 'placeholder-images.ts', 'destinations-data.ts',
    'services-data.ts', 'testimonials-data.ts', 'himachal-knowledge.ts'
];
dataFiles.forEach(file => {
    safeMove(`Frontend/lib/${file}`, `Images/${file}`);
});

// e) Backend (Firebase + actions)
safeMove('src/firebase', 'Backend/firebase');
safeMove('src/app/actions', 'Backend/actions');

// f) AI
safeMove('src/ai', 'AI/ai'); // Moving whole src/ai to AI/ai to match imports

// g) API (extract from app)
safeMove('src/app/api', 'API/api');

// h) App (what remains)
safeMove('src/app', 'app');

// i) Cleanup src
if (fs.existsSync('src')) fs.rmSync('src', { recursive: true, force: true });


// --- tsconfig.json update ---
const tsconfigPath = 'tsconfig.json';
if (fs.existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    tsconfig.compilerOptions = tsconfig.compilerOptions || {};
    tsconfig.compilerOptions.paths = {
        "@/frontend/*": ["./Frontend/*"],
        "@/backend/*": ["./Backend/*"],
        "@/ai/*": ["./AI/*"],
        "@/animation/*": ["./Animation/*"],
        "@/images/*": ["./Images/*"],
        "@/api/*": ["./API/*"],
        "@/*": ["./*"]
    };
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
}

// --- FIX IMPORTS ---
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

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // 1. Animations
    content = content.replace(/@\/components\/animations\//g, '@/animation/');
    content = content.replace(/@\/components\/ui\/(animated-counter|animated-section|carousel|color-splash|motion|snow-particles|typewriter)/g, '@/animation/$1');

    // 2. Images/Data
    content = content.replace(/@\/lib\/(placeholder-images|destinations-data|services-data|testimonials-data|himachal-knowledge)/g, '@/images/$1');

    // 3. Backend (Firebase)
    content = content.replace(/@\/firebase\//g, '@/backend/firebase/');

    // 4. AI
    content = content.replace(/@\/ai\//g, '@/ai/ai/');

    // 5. API
    content = content.replace(/@\/app\/api\//g, '@/api/api/');

    // 6. Actions
    content = content.replace(/@\/app\/actions\//g, '@/backend/actions/');

    // 7. Frontend
    content = content.replace(/@\/components\//g, '@/frontend/components/');
    content = content.replace(/@\/hooks\//g, '@/frontend/hooks/');
    // careful not to overwrite images that were originally mapped
    content = content.replace(/@\/lib\/(?!placeholder-images|destinations-data|services-data|testimonials-data|himachal-knowledge)/g, '@/frontend/lib/');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('SUCCESS');
