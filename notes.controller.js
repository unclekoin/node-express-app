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
  await saveNotes(notes);
  console.log(chalk.bgGreen(' Note has been added '));
}

async function getNotes() {
  const data = await fs.readFile(notesPath, 'utf8');
  const notes = JSON.parse(data);
  return Array.isArray(notes) ? notes : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
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
  const filtered = notes.filter((note) => note.id !== id);
  await saveNotes(filtered);
  if (filtered.length < notes.length) {
    console.log(chalk.bgGreen(` Note with id: ${id} deleted successfully! `));
  } else {
    console.log(chalk.bgRed(` The note with id: ${id} does not exist! `));
  }
}

async function updateNote(id, title) {
  const notes = await getNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);
  notes[noteIndex].title = title;
  await saveNotes(notes);
  console.log(chalk.bgGreen(` Note with id: ${id} updated successfully! `));
}

module.exports = {
  addNote, printNotes, removeNote, getNotes, updateNote
};
