const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

(function (theme) {

    const themeScssPath = path.join(__dirname, '../src/styles/themes/themes.scss');

    function buildTheme() {
        var defaultStr = '@import "themes/default/theme";';
        var replaceStr = `@import "themes/${theme}/theme";`;

        writeFile(defaultStr, replaceStr);

        exec(`webpack --config configs/webpack.themes.config.js --theme ${theme}`, (error, stdout, stderr) => {
            if (error) {
                return console.log(error);
            }

            console.log(`################################################`);
            console.log(`### TK-THEME: ${theme} finished!!!!!!!!`);
            console.log(`################################################`);

            // cleanBundleFile();

            reset();
        });
    }

    function reset() {
        var defaultStr = `@import "themes/${theme}/theme";`;
        var replaceStr = '@import "themes/default/theme";';

        writeFile(defaultStr, replaceStr);
    }

    function writeFile(defaultStr, replaceStr) {
        var data = fs.readFileSync(themeScssPath, 'utf8');

        var result = data.toString().replace(defaultStr, replaceStr);

        fs.writeFileSync(themeScssPath, result, "utf-8");
    }

    function cleanBundleFile() {
        const bundleFilePath = path.join(__dirname, '../dist', theme, 'bundle.js');

        fs.unlinkSync(bundleFilePath);
    }

    function init() {
        buildTheme();
    }

    init();
})(process.argv[2]);
