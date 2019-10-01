console.log('utils.js');

const name = 'Chri';

const add = function(a,b) {
    return a + b;
}

module.exports = name; //Permette di accedere a name da altri file
module.exports = add;