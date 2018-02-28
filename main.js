
const readline = require('readline');
const figlet = require('figlet');
const chalk = require('chalk');

const model = require('./model');

/**
 * Dar color a un string.
 * @param msg, String al que hay que dar color
 * @param color, color que le queremos dar al string
 * @returns {String}, Devuelve el string con el color indicado
 */
const colorize = (msg,color) => {
    if(typeof color !== "undefined"){
        msg = chalk[color].bold(msg);
    }
    return msg;
};

/**
 * Escribe un mensaje
 *
 * @param msg, El string a escribir
 * @param color, Color con el que queremos escribir el string.
 */
const log = (msg,color) =>{
    console.log(colorize(msg,color))
};

/**
 * Escribe un mensaje en grande
 * @param msg, mensaje que queremos escribir
 * @param color, color en el que queremos escribir el mensaje
 */
const biglog = (msg,color) => {
    log(figlet.textSync(msg, {horizontalLayout:'full'}),color);
};

/**
 * Escribe el mensaje de error emsg.
 * @param emsg, Texto del mensaje de error.
 */
const errorlog =(emsg) => {
    console.log(`${colorize("Error","red")}: ${colorize(colorize(emsg,"red"), "bgYellowBright")}`);
};



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
            helpCmd();
            break;

        case 'quit':
        case 'q':
            quitCmd();
            break;

        case 'add':
            addCmd();
            break;

        case 'list':
            listCmd();
            break;

        case 'show':
            showCmd(args[1]);
            break;

        case 'test':
            testCmd(args[1]);
            break;

        case 'play':
        case 'p':
            playCmd();
            break;

        case 'delete':
            deleteCmd(args[1]);
            break;

        case 'edit':
            editCmd(args[1]);
            break;

        case 'credits':
            creditsCmd();
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


/**
 * Muestra la ayuda.
 */
const helpCmd = () => {
    log("Comandos:");
    log(" h | help - Muestra esta ayuda.");
    log(" list - Listar los quizzes existentes.");
    log(" show <id> - Muestra la pregunta y la respuesta del quiz indicado.");
    log(" add - Añadir un nuevo quiz interactivamente.");
    log(" delete <id> - Borrar el quiz indicado.");
    log(" edit <id> - Editar el quiz indicado.");
    log(" test <id> - Probar el quiz indicado.");
    log(" p | play - Jugar a preguntar aleatoriamente por los quizzes.");
    log(" credits - Créditos.");
    log(" q | quit - Salir del programa.");
    rl.prompt();
};

/**
 *Lista todos los quizzes existentes en el modelo.
 */
const listCmd = () => {
    log('Listar todos los quizzes existentes');
    rl.prompt();
};

/**
 * Salir del programa.
 */
const quitCmd = () => {
    rl.close();
};

/**
 * Añade un nuevo quiz interactivamente.
 */
const addCmd = () => {
    log('Añadir un nuevo quiz.');
    rl.prompt();
};

/**
 * Muestra la pregunta y la respuesta del quiz indicado.
 */
const showCmd = id => {
    log('Mostrar el quiz indicado');
    rl.prompt();
};

/**
 * Prueba el quiz indicado.
 */
const testCmd = id => {
    log('Probar el quiz indicado');
    rl.prompt();
};

/**
 * Jugar a preguntar aleatoriamente por los quizzes.
 */
const playCmd = () => {
    log('Jugar');
    rl.prompt();
};

/**
 * Borra el quiz indicado.
 */
const deleteCmd = id => {
    log('Borrar el quiz indicado');
    rl.prompt();
};

/**
 * Edita el quiz indicado.
 */
const editCmd = id => {
    log('Editar el quiz indicado');
    rl.prompt();
};

/**
 * Creditos.
 */
const creditsCmd = () => {
    log('Autores de la practica:');
    log('Alvaro Diaz del Mazo');
    log('Alonso Espasandin Hernan');
    rl.prompt();
};