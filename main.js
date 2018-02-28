
const readline = require('readline');

const model = require('./model');
const {log,biglog,errorlog,colorize} = require("./out");
const cmds = require("./cmds");

//Mensaje inicial
biglog('CORE Quiz','green');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: colorize("quiz> ",'blue'),
    completer(line) {
        const completions = 'h help add delete edit list test p play credits q quit'.split(' ');
        const hits = completions.filter((c) => c.startsWith(line));
        // show all completions if none found
        return [hits.length ? hits : completions, line];
    }
});

rl.prompt();
rl
.on('line', (line) => {

     let args = line.split(" ");
     let cmd = args[0].toLowerCase().trim();

    switch (cmd) {
        case '':
            rl.prompt();
            break;

        case 'h':
        case 'help':
            cmds.helpCmd();
            break;

        case 'quit':
        case 'q':
            cmds.quitCmd();
            break;

        case 'add':
            cmds.addCmd();
            break;

        case 'list':
            cmds.listCmd();
            break;

        case 'show':
            cmds.showCmd(args[1]);
            break;

        case 'test':
            cmds.testCmd(args[1]);
            break;

        case 'play':
        case 'p':
            cmds.playCmd();
            break;

        case 'delete':
            cmds.deleteCmd(args[1]);
            break;

        case 'edit':
            cmds.editCmd(args[1]);
            break;

        case 'credits':
            cmds.creditsCmd();
            break;

        default:
            log(`Comando desconocido: '${colorize(cmd,'red')}'`);
            log(`Use '${colorize('help','green')}' para ver todos los comandos disponibles`);
            rl.prompt();
            break;
    }
})
.on('close', () => {
    log('Adios!');
process.exit(0);
});


