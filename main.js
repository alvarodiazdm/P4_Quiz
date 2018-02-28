
const readline = require('readline');
console.log("CORE Quiz");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'quiz> ',
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
            console.oog(`Comando desconocido: '${cmd}'`);
            console.log('Use "help" para ver todos los comandos disponibles');
            rl.prompt();
            break;
    }
})
.on('close', () => {
    console.log('Adios');
process.exit(0);
});


/**
 * Muestra la ayuda.
 */
const helpCmd = () => {
    console.log("Comandos:");
    console.log(" h | help - Muestra esta ayuda.");
    console.log(" list - Listar los quizzes existentes.");
    console.log(" show <id> - Muestra la pregunta y la respuesta del quiz indicado.");
    console.log(" add - Añadir un nuevo quiz interactivamente.");
    console.log(" delete <id> - Borrar el quiz indicado.");
    console.log(" edit <id> - Editar el quiz indicado.");
    console.log(" test <id> - Probar el quiz indicado.");
    console.log(" p | play - Jugar a preguntar aleatoriamente por los quizzes.");
    console.log(" credits - Créditos.");
    console.log(" q | quit - Salir del programa.");
    rl.prompt();
};

/**
 *Lista todos los quizzes existentes en el modelo.
 */
const listCmd = () => {
    console.log('Listar todos los quizzes existentes');
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
    console.log('Añadir un nuevo quiz.');
    rl.prompt();
};

/**
 * Muestra la pregunta y la respuesta del quiz indicado.
 */
const showCmd = id => {
    console.log('Mostrar el quiz indicado');
    rl.prompt();
};

/**
 * Prueba el quiz indicado.
 */
const testCmd = id => {
    console.log('Probar el quiz indicado');
    rl.prompt();
};

/**
 * Jugar a preguntar aleatoriamente por los quizzes.
 */
const playCmd = () => {
    console.log('Jugar');
    rl.prompt();
};

/**
 * Borra el quiz indicado.
 */
const deleteCmd = id => {
    console.log('Borrar el quiz indicado');
    rl.prompt();
};

/**
 * Edita el quiz indicado.
 */
const editCmd = id => {
    console.log('Editar el quiz indicado');
    rl.prompt();
};

/**
 * Creditos.
 */
const creditsCmd = () => {
    console.log('Autores de la practica:');
    console.log('Alvaro Diaz del Mazo');
    console.log('Alonso Espasandin Hernan');
    rl.prompt();
};