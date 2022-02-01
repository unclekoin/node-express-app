const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    id: Date.now().toString(),
    title,
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen(' Note has been added '));
}

async function getNotes() {
  const data = await fs.readFile(notesPath, 'utf8');
  const notes = JSON.parse(data);
  return Array.isArray(notes) ? notes : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlueBright(' Here is the list of notes: '));
  notes.forEach((note) => {
    console.log(chalk.bgBlue(` ・ id: ${ note.id } title: ${ note.title } `));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  if (newNotes.length < notes.length) {
    console.log(chalk.bgGreen(' Note deleted successfully! '));
  } else {
    console.log(chalk.bgRed(` The note with id: ${id} does not exist! `));
  }
}

module.exports = {
  addNote, printNotes, removeNote
};
