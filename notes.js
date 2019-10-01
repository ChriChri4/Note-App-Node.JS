const fs = require('fs');

const getNote = function(){
    return 'Your notes...';
}

const addNote = function(title,body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title //ritorna vero o falso controllando tutti i campi title
    });

    if(duplicateNotes.length===0 )
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
    
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = function() {
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

module.exports = {
    getNote: getNote,
    addNote: addNote  
};