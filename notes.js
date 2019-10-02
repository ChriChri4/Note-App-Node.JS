const fs = require('fs');
const chalk = require('chalk');

const getNote = () => 'Your notes...';

const addNote = (title,body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter( (note) => note.title === title) //ritorna vero o falso controllando tutti i campi title)
    const duplicateNote = notes.find((note) => note.title === title) //find() a differenza di filter si ferma appena trova l'elemento ricercato mentre filter crea un nuovo array con tutti gli elementi che rispettano la regola
    //duplicateNotes
    /*if(duplicateNotes.length===0 )
    {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note title taken by another note');
    }*/
    //duplicateNote
    if(!duplicateNote)
    {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note title taken by another note');
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = () => {
    // se all'interno di try trova un errore passa a catch

    try { //Provo ad aprire il file e vedere quindi se esiste
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch (e) {
        return [] //esce dalla funzione così lo crea dopo nuovo in saveNotes
        //fs.writeFileSync('notes.json');
    }

}

const removeNotes = (title) =>{
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note) {
        return note.title !== title //ritorna vero o falso controllando tutti i campi title
    });
    if(notesToKeep.length < notes.length)
    {
        saveNotes(notesToKeep);  
        console.log(chalk.bgGreen('Note deleted!'));
    } else {
        console.log(chalk.bgRed('Note not found!'));
    }

}

const listNotes = () => {
    console.log(chalk.bgBlue('Your Notes:'));
    const notes = loadNotes();
    notes.forEach((notes) => {
        console.log(notes.title);
    })
    }

const readNotes = (title) => {
    const notes = loadNotes();
    const noteFind = notes.find((noteFind) => noteFind.title === title)

    if(noteFind)
    {
        console.log(noteFind.title)
    } else {
        console.log(chalk.bgRed('Note not found during the reading'))
    }

}

module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
};