const figlet = require('figlet');
const chalk = require('chalk');

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

exports = module.exports = {
    colorize,
    log,
    biglog,
    errorlog
};