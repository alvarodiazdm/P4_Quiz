
const fs = require("fs");
const DB_FILENAME = "quizzes.json";

//Modelo de datos.
//
//En esta variable se mantienen todos los quizzes existentes.
//Es un array de objetos, donde cada objeto tiene los atributos question
//y answer para guardar el texto de la pregunta y la respuesta.
let quizzes = [
    {
        question: "Capital de Italia",
        answer: "Roma"
    },
    {
        question: "Capital de Francia",
        answer: "Paris"
    },
    {
        question: "Capital de España",
        answer: "Madrid"
    },
    {
        question: "Capital de Portugal",
        answer: "Lisboa"
    }
];

const load = () => {
    fs.readFile(DB_FILENAME, (err,data) => {
        if(err){
            //La primera vez no existe el fichero
            if(err.code=="ENOENT"){
                save();  //valores iniciales
                return;
            }
            throw err;
        }
        let json = JSON.parse(data);
        if(json){
            quizzes = json;
        }
    });
};

const save = () => {
    fs.writeFile(DB_FILENAME,
        JSON.stringify(quizzes),
        err => {
        if(err) throw err;
        });
};

/**
 * Cuenta el numero de preguntas que tenemos guardadas
 */
exports.count = () => quizzes.length;

/**
 * Nos permite añadir nuevos quizzes
 * @param question, pregunta que queremos añadir, espacio en blanco en caso de que no haya parametro
 * @param answer, respuesta a la pregunta. Espacio en blanco en caso de que no se pase como parametro
 */
exports.add = (question,answer) => {
    quizzes.push({
        question: (question || "").trim(),
        answer: (answer||"").trim()
    });
    save();
};

/**
 * Nos permite actualizar o modificar la pregunta-respuesta que se encuentre en la posicion id
 * siempre y cuando dicha posicion sea valida
 * @param id, posicion del array que queremos modificar
 * @param question, pregunta con la que la queremos modificar
 * @param answer, respuesta con la que lo qureremos modificar
 */
exports.update = (id,question,answer) =>{
    const quiz = quizzes[id];
    if(typeof quiz === "undefined"){
        throw new Error(`El valor del parametro id no es valido.`);
    }
    quizzes.splice(id,1,{
        question: (question || "").trim(),
        answer: (answer||"").trim()
    });
    save();
};

/**
 * Devuelve todos los quizzes existentes
 *
 * Devuelve un clon del valor fuardado en la variable quizzes, es decir devuelve un
 * onjeto nuevo con todas las preguntas existentes.
 * Para clonar quizzes se usa stringify + parse
 *
 * Esto lo hacemos para evitar problemas de tocar el quiz original.
 *
 * return {any}
 */
exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

/**
 * Devuelve un clon del quiz que se encuentra en la posicion id.
 * @param id, clave que identifica el quiz a devolver.
 * @returns {question, answer}, Devuelve el ojeto quiz de la posicion dada
 */
exports.getByIndex = id => {
    const quiz = quizzes[id];
    if(typeof quiz === "undefined"){
        throw new Error(`El valor del parametro id no es valido.`);
    }
    return JSON.parse(JSON.stringify(quiz));
};

/**
 * Elimina el quiz situado en la posicion dada
 * @param id, clave que identifica el quiz a borrar
 */
exports.deleteByIndex = id => {
    const quiz = quizzes[id];
    if(typeof quiz === "undefined"){
        throw new Error(`El valor del parametro id no es valido.`);
    }
    quizzes.splice(id,1);
    save();
};

//Carga los quizzes almacenados en el fichero
load();