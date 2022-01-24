const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const axios = require('axios');

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
