

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
    model.getAll().forEach((quiz,id) => {
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
    rl.question(colorize(' Introduce una pregunta: ', 'red'), question => {
        rl.question(colorize(' Introduzca la respuesta: ', 'red'), answer => {
            model.add(question, answer);
            log(`${colorize('Se ha añadido', 'magenta')}: ${question} ${colorize('=>', 'magenta')} ${answer}`);
            rl.prompt();
        });
    });
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
    if(typeof id === "undefined"){
        errorlog(`Falta el parametro id.`);
        rl.prompt();
    }else {
        try{
            const quiz = model.getByIndex(id);
            rl.question(`${colorize(quiz.question,'red')}${colorize('? ','red')}` , resp => {
                if((resp.trim()).toLowerCase() === (quiz.answer).toLowerCase()){
                    log('Correcta','green');
                }else{
                    log('Incorrecta','red');
                }
                rl.prompt();
            })
        }catch(err){
            errorlog(err.message);
            rl.prompt();
        }
    }
};

/**
 * Jugar a preguntar aleatoriamente por los quizzes.
 */
exports.playCmd = rl => {
    let score = 0;
    let toBeResolved = []; //Guardan los id de todas las preguntas que existen
    for(var i=0; i<model.count();i++){
        toBeResolved[i]= i;
    }

    const playOne = () => {
        if (toBeResolved.length == 0) {
            log(colorize('No hay nada mas que preguntar.', 'red'));
            log(`Su puntuación final es:`);
            log(score,'blue');
            rl.prompt();
        } else {
            let id = toBeResolved.splice(Math.floor(Math.random() * toBeResolved.length),1);
            let quiz = model.getByIndex(id);
            rl.question(`${colorize(quiz.question ,'red')}${colorize(':' ,'red')} ` , resp => {
                if (resp.trim().toLowerCase() === quiz.answer.toLowerCase()) {
                    score++;
                    log(`CORECTO - Lleva ${score} aciertos.`);
                    playOne();
                } else {
                    log('INCORRECTO');
                    log('Fin del examen. Aciertos:');
                    log(score,'magenta');
                    rl.prompt();
                }
            });
        }
    };
    playOne();
};

/**
 * Borra el quiz indicado.
 */
exports.deleteCmd = (rl,id) => {
    if(typeof id ==="undefined"){
        errorlog(`Falta el parametro id.`);
    }else{
        try{
            model.deleteByIndex(id);
        }catch (error){
            errorlog(error.message);
        }
    }
    rl.prompt();
};

/**
 * Edita el quiz indicado.
 */
exports.editCmd = (rl,id) => {
    if (typeof id === "undefined"){
        errorlog(`Falta el parametro id.`);
    }else{
        try{
            const quiz = model.getByIndex(id);
            process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)},0);
            rl.question(colorize(' Introduce una pregunta: ', 'red'), question => {

                process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)},0);
                rl.question(colorize(' Introduzca la respuesta: ', 'red'), answer => {
                    model.update(id,question, answer);
                    log(`Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question} ${colorize('=>', 'magenta')} ${answer}`);
                    rl.prompt();
                });
            });
        } catch (error){
            errorlog(error.message);
            rl.prompt();
        }
    }
};

/**
 * Creditos.
 */
exports.creditsCmd = rl => {
    log('Autores de la practica:');
    log(colorize('Alvaro Diaz del Mazo','green'));
    log(colorize('Alonso Espasandin Hernan','green'));
    rl.prompt();
};
