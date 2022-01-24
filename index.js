const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const axios = require('axios');

// read equations JSON file
let rawEquations = fs.readFileSync('equations.json');
let EQUATIONS = JSON.parse(rawEquations);


let greeting = ['Hello', 'Hola', 'Привет', 'Salam']

let DATA = {
    cheers: greeting[Math.floor(Math.random()*greeting.length)],
    name: 'rolEYder',
    date: new Date().toLocaleDateString('en-GB', {
        weekeday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: 'Europe/Stockholm',
    }),
};


async function getQuotes() {
    await axios.get('https://api.quotable.io/random?tags=technology,famous-quotes')
    .then(r => {
        DATA.quote = r.data.content,
        DATA.quoteAuthor = r.data.author
    });
};

async function loadEquations() {
    const values = Object.values(EQUATIONS)
    const randValue = values[parseInt(Math.random() * values.length)];
    const latexEquation = randValue["latex"];
    const buf = Buffer.from(latexEquation, 'base64');
    DATA.latex = buf.toString('utf-8');
    DATA.nameEquation = randValue["nameEquation"]; 

}

async function buildReadMe() {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data)=> {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output); 
    });
}


async function execute() {

    /*
     *
     * Build Equations
     *
     * */
    
    await loadEquations();

    /*
     *
     * Get Quotes
     *
     * */

    await getQuotes();
    
    /*
    *
    * Generate README
    *
    **/
    
    await buildReadMe()

}

execute()
