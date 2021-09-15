const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#exercise-name').value.trim();
  const description = document.querySelector('#exercise-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/exercise`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/exercise/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-exercise-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.exercise-list')
  .addEventListener('click', delButtonHandler);
