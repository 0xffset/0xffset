const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const axios = require('axios');

// read equations JSON file
let rawEquations = fs.readFileSync('equations.json');
let EQUATIONS = JSON.parse(rawEquations);

let equations = {
    1: {
        name: "Cauchy's Integral Formula",
        img: "./images/equation1.gif"
    },
    2: {
        name: "Quadratic Formula",
        img: "./images/equation2.gif"
    },
    3: {
        name: "Euler’s Identity",
        img: "./images/equation3.gif"
    },
    4: {
        name: "The Euler Product Formula",
        img: "./images/equation4.gif"
    },
    5: {
        name: "The Gaussian Integral",
        img: "./images/equation5.gif"
    },
    6: {
        name: "The Cardinality of the Continuum",
        img: "./images/equation6.PNG"
    },
    7: {
        name: "The Analytic Continuation of the Factorial",
        img: "./images/equation7.gif"
    },
    8: {
        name: "The Pythagorean Theorem",
        img: "./images/equation8.gif"
    },
    9: {
        name: " The Explicit Formula for the Fibonacci Sequence",
        img: "./images/equation9.PNG"
    },
    10: {
        name: "The Basel Problem",
        img: "./images/equation10.gif"
    },
    11: {
        name: "The Harmonic Series",
        img: "./images/equation11.gif"
    },
    12: {
        name: "The Explicit Formula for the Prime Counting Function",
        img: "./images/equation12.gif"
    }
};

let greeting = ['Hello', 'Hola', 'Привет', 'Salam']

let DATA = {
    cheers: greeting[Math.floor(Math.random() * greeting.length)],
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
    const values = Object.values(equations)
    const randValue = values[parseInt(Math.random() * values.length)];
    const latexEquation = randValue["img"];
    DATA.latex = randValue["img"]
    DATA.nameEquation = randValue["name"];

}

async function buildReadMe() {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
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