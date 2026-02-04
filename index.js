const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const pkg = require('./package.json');

const { addNote, printNotes, removeNote } = require('./notes.controller');

const argv = yargs(hideBin(process.argv));
argv.version(pkg.version);

argv.command({
    command: 'add',
    describe: 'Add new note to list',
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});

argv.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
        printNotes();
    },
});
argv.command({
    command: 'remove',
    describe: 'Remove note to list',
    builder: {
        id: {
            describe: 'Note id',
            type: 'string',
            demandOption: true,
        },
    },
    async handler({ id }) {
        removeNote(id);
    },
});

argv.parse();
