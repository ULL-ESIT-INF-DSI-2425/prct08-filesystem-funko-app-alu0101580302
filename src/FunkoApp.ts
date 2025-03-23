import  fs from "fs";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import { FunkoTypes } from "./enums/FunkoTypes.js";
import { Genre } from "./enums/Genre.js";
import { Funko } from "./classes/Funko.js";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
    .command('add', 'Añade un Funko', {
        user: {
            description: 'Usuario',
            type: 'string',
            demandOption: true
        },
        name: {
            description: 'Nombre del Funko',
            type: 'string',
            demandOption: true
        },
        description: {
            description: 'Descripción del Funko',
            type: 'string',
            demandOption: true
        },
        type: {
            description: 'Tipo de Funko',
            type: 'string',
            demandOption: true
        },
        genre: {
            description: 'Género del medio de origen del personaje del Funko',
            type: 'string',
            demandOption: true
        },
        franchise: {
            description: 'Franquicia del personaje del Funko',
            type: 'string',
            demandOption: true
        },
        number: {
            description: 'Número del Funko',
            type: 'number',
            demandOption: true
        },
        exclusive: {
            description: 'Exclusividad del Funko',
            type: 'boolean',
            demandOption: true
        },
        properties: {
            description: 'Características especiales del Funko',
            type: 'string',
            demandOption: true
        },
        price: {
            description: 'Precio del Funko',
            type: 'number',
            demandOption: true
        }
    }, (argv) => {
        try {
            const funko: Funko = new Funko(argv.name, argv.description, argv.type as FunkoTypes, argv.genre as Genre, argv.franchise, argv.number, argv.exclusive, argv.properties, argv.price)
            
            fs.writeFile(`**/src/users/${argv.user}/funkos.json`, JSON.stringify(funko), 'utf8', (err) => {
                if (err) { 
                    console.log(err);
                } else {
                    console.log(`¡Nuevo Funko añadido a la colección de ${argv.user}!`);
                }
            });
        } catch {
            console.error("Error");
            return;
        }
    })
    .help()
    .argv;