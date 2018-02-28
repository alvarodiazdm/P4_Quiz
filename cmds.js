

const{log,biglog,errorlog,colorize} = require("./out");
const model = require("./model");

/**
 * Muestra la ayuda.
 */
exports.helpCmd = rl => {
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
exports.listCmd = rl => {
    model.getAll().forEach((quiz, id) => {
        log(`   [${colorize(id,'magenta')}]: ${quiz.question}`);
    });
    rl.prompt();
};

/**
 * Salir del programa.
 */
exports.quitCmd = rl => {
    rl.close();
};

/**
 * Añade un nuevo quiz interactivamente.
 */
exports.addCmd = rl => {
    log('Añadir un nuevo quiz.');
    rl.prompt();
};

/**
 * Muestra la pregunta y la respuesta del quiz indicado.
 */
exports.showCmd = (rl,id) => {
    if(typeof id==="undefined"){
        errorlog(`Falta el parametro id.`);
    }else{
        try{
            const quiz = model.getByIndex(id);
            log(`[${colorize(id,'magenta')}]: ${quiz.question} ${colorize('=>','magenta')} ${quiz.answer}`);
        }catch (error){
            errorlog(error.message);
        }
    }

    rl.prompt();
};

/**
 * Prueba el quiz indicado.
 */
exports.testCmd = (rl,id) => {
    log('Probar el quiz indicado');
    rl.prompt();
};

/**
 * Jugar a preguntar aleatoriamente por los quizzes.
 */
exports.playCmd = rl => {
    log('Jugar');
    rl.prompt();
};

/**
 * Borra el quiz indicado.
 */
exports.deleteCmd = (rl,id) => {
    log('Borrar el quiz indicado');
    rl.prompt();
};

/**
 * Edita el quiz indicado.
 */
exports.editCmd = (rl,id) => {
    log('Editar el quiz indicado');
    rl.prompt();
};

/**
 * Creditos.
 */
exports.creditsCmd = rl => {
    log('Autores de la practica:');
    log('Alvaro Diaz del Mazo');
    log('Alonso Espasandin Hernan');
    rl.prompt();
};
