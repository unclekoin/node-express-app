const modal = document.getElementById('modal');
const editInput = document.getElementById('edit');
const notes = document.querySelectorAll('.list-group-item-text');
const alertMessage = document.querySelector('.alert-message');
let noteId;

document.addEventListener('click', (e) => {
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id;

    remove(id).then(() => {
      e.target.closest('.list-group-item').remove();
      showAlert(id, 'removed');
    });
  }

  if (e.target.dataset.type === 'edit') {
    noteId = e.target.dataset.id;
    modal.classList.add('show');
    modal.style.display = 'block';
  }

  if (e.target.classList.contains('close')) {
    closeModalWidow();
  }

  if (e.target.classList.contains('save')) {
    if (editInput.value.trim()) {
      const title = editInput.value;
      update(noteId, title).then(() => {
        const [note] = [...notes].filter((item) => item.dataset.id === noteId);
        note.textContent = title;
        showAlert(noteId, 'changed')
      });
      editInput.value = '';
      closeModalWidow();
    }
  }
});

function closeModalWidow() {
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 200);
}

async function remove(id) {
  await fetch(`/${ id }`, { method: 'DELETE' });
}

async function update(id, title) {
  await fetch(`/${ id }`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
}

function showAlert(id, action) {
  alertMessage.style.display = 'block';
  alertMessage.textContent = `Note with id ${ id } ${action} successfully!`;
  setTimeout(() => {
    alertMessage.style.display = 'none';
  }, 3000);
}
