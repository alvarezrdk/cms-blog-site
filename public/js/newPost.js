const newPost = async (event) => {
  event.preventDefault();

  const tittle = document.querySelector('#tittle').value;
  const description = document.querySelector('#description').value;

  console.log(description);
  if (tittle && description) {
    const response = await fetch('/savepost', {
      method: 'POST',
      body: JSON.stringify({ tittle, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Post No Saved');
    }
  }
};


document
  .querySelector('.newPost-form')
  .addEventListener('submit', newPost);
