const { execSync } = require('child_process');

try {
    console.log("Scanning repository for all changes...");

    // 1. Stage everything first so Git discovers all nested files inside new folders
    execSync('git add -A');

    // 2. Get the list of every single file that was added, modified, or deleted
    const filesOutput = execSync('git diff --name-only --cached').toString();
    const files = filesOutput.split('\n').filter(line => line.trim() !== '');

    // 3. Unstage them so we can commit them one by one
    execSync('git reset');

    console.log(`Found ${files.length} individual file changes. Generating commits...`);

    let count = 0;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const cleanFile = file.trim().replace(/^"|"$/g, ''); // Fix paths with quotes

        try {
            // Add the specific file
            execSync(`git add "${cleanFile}"`);

            // Determine file name for the message
            const fileName = cleanFile.split('/').pop();

            // Generate some professional sounding randomized commit messages
            const commitTypes = ['refactor', 'chore', 'style', 'fix', 'build'];
            const actionWords = ['Migrated', 'Updated', 'Reorganized', 'Relocated', 'Adjusted', 'Setup'];

            const type = commitTypes[Math.floor(Math.random() * commitTypes.length)];
            const action = actionWords[Math.floor(Math.random() * actionWords.length)];

            const commitCmd = `git commit -m "${type}: ${action.toLowerCase()} ${fileName}" -m "Modular architecture reorganization for ${cleanFile}"`;

            execSync(commitCmd);
            count++;

            // Print progress
            if (count % 20 === 0) {
                console.log(`... ${count}/${files.length} commits created ...`);
            }
        } catch (e) {
            // Ignore files that fail (e.g., if git add did nothing)
        }
    }

    // Catch any remaining unchecked items
    try {
        execSync('git add -A');
        execSync(`git commit -m "chore: final synchronization of root package structure"`);
        count++;
    } catch (e) { }

    console.log(`\n🎉 SUCCESS! Successfully generated ${count} commits!`);
    console.log(`Now you can run 'git push' to send these ${count} commits to GitHub.`);
} catch (error) {
    console.error('Error:', error.message);
}
