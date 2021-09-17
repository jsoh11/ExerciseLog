const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("test")
  const name = document.querySelector('#exercise-name').value.trim();
  const distance = document.querySelector('#exercise-distance').value.trim();
  const time = document.querySelector('#exercise-time').value.trim();
  const description = document.querySelector('#exercise-desc').value.trim();

  if (name && distance && time && description) {
    const response = await fetch(`/api/exercises`, {
      method: 'POST',
      body: JSON.stringify({ name, distance, time, description }),
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

    const response = await fetch(`/api/exercises/${id}`, {
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

// document
//   .querySelector('.exercise-list')
//   //.addEventListener('click', delButtonHandler);
