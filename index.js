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
        img: "./images/equation1.gif",
        description: `Cauchy's integral formula, 
        named after Augustin-Louis Cauchy, is a central statement in complex analysis. 
        It expresses the fact that a holomorphic function defined on a disk is completely 
        determined by its values on the boundary of the disk, and it provides integral 
        formulas for all derivatives of a holomorphic function. Cauchy's formula shows that, 
        in complex analysis, "differentiation is equivalent to integration": complex differentiation, like integration,
         behaves well under uniform limits – a result that does not hold in real analysis. `,
        source: "https://en.wikipedia.org/wiki/Cauchy%27s_integral_formula"
    },
    2: {
        name: "Quadratic Formula",
        img: "./images/equation2.gif",
        description: `In algebra, a quadratic equation (from Latin quadratus 'square') 
        is any equation that can be rearranged in standard form as a x 2 + b x + c = 0 
        where x represents an unknown, and a, b, and c represent known numbers, where a ≠ 0. If a = 0, then the equation is linear, not quadratic, as there is no a x 2 {\displaystyle ax^{2}} ax^2 term. The numbers a, b, and c are the coefficients of the equation and may be distinguished by calling them, respectively,
     the quadratic coefficient, the linear coefficient and the constant or free term.`,
        source: "https://en.wikipedia.org/wiki/Quadratic_equation"
    },
    3: {
        name: "Euler’s Identity",
        img: "./images/equation3.gif",
        description: `A very famous equation, Euler’s identity relates the seemingly random 
        values of pi, e, and the square root of -1. It is considered by many to be the most beautiful equation in mathematics. A more general formula is e^(ix) = cos(x)+isin(x)
        When x = π , the value of cos x is -1, while isin x is 0, resulting in Euler’s identity, as -1 + 1 = 0. `,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    },
    4: {
        name: "The Euler Product Formula",
        img: "./images/equation4.gif",
        description: `The symbol on the left is an infinite sum, while the one on the right is an infinite product. 
        Theorized by Leonhard Euler once again, this equation relates the natural numbers (n = 1, 2, 3, 4, 5, etc.) on the left side to the prime numbers (p = 2, 3, 5, 7, 11, etc.) on the right side. Moreover, 
        we can choose s to be any number greater than 1, and the equation is true.
        The left side is the common representation of the Riemann zeta function.`,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    },
    5: {
        name: "The Gaussian Integral",
        img: "./images/equation5.gif",
        description: `The function e^{-x^2} in itself is a very ugly function to integrate, but when done across the entire real line, i.e. from minus infinity to infinity, it gives a bizarrely clean answer. 
        It is certainly not obvious at first glance that the area under the curve is the square root of pi.
        This formula is of extreme importance in statistics, as it represents the normal distribution.`,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    },
    6: {
        name: "The Cardinality of the Continuum",
        img: "./images/equation6.PNG",
        description: `This states that the cardinality of the real numbers is equal to the cardinality of all subsets of natural numbers. This was shown by Georg Cantor, the founder of set theory. It is remarkable in that it states a continuum is not countable, as 2^{N} > N .

        A related statement is the Continuum Hypothesis, which states there is no cardinality between N and R . Interestingly, this statement has a very strange property: it can be neither proved nor disproved.`,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    },
    7: {
        name: "The Analytic Continuation of the Factorial",
        img: "./images/equation7.gif",
        description: `The factorial function is commonly defined as n! = n(n-1)(n-2)…1, but this definition only “works” for positive integers. The integral equation makes factorial work for fractions and decimals as well. And negative numbers, and complex numbers…

        The same integral for n-1 is defined as the gamma function.`,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    },
    8: {
        name: "The Pythagorean Theorem",
        img: "./images/equation8.gif",
        description: `Probably the most familiar equation on this list, the Pythagorean theorem relates the sides of a right triangle, where a and b are the lengths of the legs and c is the length of the hypotenuse. It also relates triangles to squares.`,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    },
    9: {
        name: " The Explicit Formula for the Fibonacci Sequence",
        img: "./images/equation9.PNG",
        description: `where φ = \frac{1 + \sqrt{5}}{2} (note that this number is the Golden Ratio). While many people are familiar with the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, etc., where each number is the sum of the previous two numbers), few know there is a formula to figure out any given Fibonacci number: the formula that we have above, where F(n) is the nth Fibonacci number.
         That is, to find the 100th Fibonacci number, you don’t have to calculate the first 99 numbers. You can just throw 100 into the formula.`,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    },
    10: {
        name: "The Basel Problem",
        img: "./images/equation10.gif",
        description: `This equation says that if you take the reciprocal of all the square numbers, and then add them all together, you get pi squared over six. This was proved by Euler. Notice that this sum is just the function on the left hand side of Equation 2 (the Euler product formula) earlier in this post, with s = 2. That formula is the Riemann zeta function, we can say that zeta of 2 is pi squared over six.`,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    },
    11: {
        name: "The Harmonic Series",
        img: "./images/equation11.gif",
        description: `This is somewhat unintuitive, because it says that if you add a bunch of numbers that keep getting smaller (and eventually become zero), they still reach infinity. Yet if you square all the numbers, it doesn’t add up to infinity (it adds up to pi squared over six). The harmonic series, if you look carefully, is actually just zeta of 1.`,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    },
    12: {
        name: "The Explicit Formula for the Prime Counting Function",
        img: "./images/equation12.gif",
        description: `Here is the significance of this equation, in English:

        Prime numbers are numbers that have no divisors other than 1 and themselves. The primes below 100 are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97. From this, it is already clear that there is no apparent pattern to the primes: in some runs of numbers you will get a lot of primes, in other runs you will find no primes, and whether a run has a lot of primes or no primes seems to be totally at random.
        
        For a very long time, mathematicians have been trying to find a pattern to the prime numbers. The equation above is an explicit function for the number of primes less than or equal to a given number.`,
        source: "https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/"
    }
};
let greeting = ['Hello', 'Hola', 'Привет', 'Salam']
let DATA = {
    cheers: greeting[Math.floor(Math.random() * greeting.length)],
    name: '0xffset',
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
    DATA.description = randValue["description"]
    DATA.source = randValue["source"]

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