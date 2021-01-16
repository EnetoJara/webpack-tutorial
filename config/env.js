"use strict";

const fs = require("fs");

/**
 * archivos de variables de entorno.
 *
 * @type {string[]}
 **/
const dotenvFiles = [`.env.${process.env.NODE_ENV}`];

// Iteramos en todos los archivos
dotenvFiles.forEach((file) => {
    if (fs.existsSync(file)) {
        require("dotenv-expand")(
            require("dotenv").config({
                path: file,
            })
        );
    }
});

/**
 * Prefijo que deberan de tener todas nuestras variables.
 *
 * @summary Puesto que **process.env** cuenta con todas las variables de entorno del sistema operativo, es indispensable que le coloquemos un prefijo a nuestras variables
 *
 * @type {RegExp}
 * */
const ENETO_VARS = /^ENETO_/i;


/**
 * Funcion para obtener todas las variables de entorno que contentan el prefijo **`ENETO_VARS`**
 *
 * @returns
 */
function variables() {

    // obtenemos todas las variables del **process.env**
    const raw = Object.keys(process.env)
        // filtramos las variables y solo obtenemos aquellas que tengan nuestro prefijo.
        .filter((key) => ENETO_VARS.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];

                return env;
            },
            // Variables de entorno que no cuentan con el prefijo, pero de igualmanera queremos cargar.
            {
                NODE_ENV: process.env.NODE_ENV || "development",
                PUBLIC_URL: process.env.PUBLIC_URL || "/",
                NODE_PATH: "",
                PORT: process.env.PORT,
            }
        );

    // El objeto generado lo pasamos a cadena de texto.
    const stringified = {
        "process.env": Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);

            return env;
        }, {}),
    };

    // exportamos el objeto crudo "raw data" y el objeto stringifiado xD.
    return { raw, stringified };
}

module.exports = variables();
