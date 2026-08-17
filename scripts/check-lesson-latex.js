const fs = require('fs');

const source = fs.readFileSync('lessons.js', 'utf8');
const latexCommands = [
    'begin', 'cdot', 'cos', 'Delta', 'delta', 'end', 'frac', 'geq',
    'geqslant', 'iff', 'infty', 'leq', 'leqslant', 'left', 'ln', 'log',
    'mathrm', 'overset', 'pi', 'right', 'sin', 'sqrt', 'sum', 'text',
    'triangle'
];
const commandPattern = latexCommands.join('|');
const invalidCommand = new RegExp(`(^|[^\\\\])\\\\(${commandPattern})\\b`, 'g');
const errors = [];

source.split('\n').forEach((line, index) => {
    if (invalidCommand.test(line)) {
        errors.push(`${index + 1}: ${line.trim()}`);
    }
    invalidCommand.lastIndex = 0;
});

if (errors.length) {
    console.error('Found LaTeX commands with a single backslash in lessons.js.');
    console.error('JavaScript template strings require doubled backslashes.');
    console.error(errors.join('\n'));
    process.exit(1);
}

console.log('Lesson LaTeX escape check passed.');
