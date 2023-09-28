const newPost = async (event) => {
  event.preventDefault();

  const tittle = document.querySelector('#email-login').value.trim();
  const description = document.querySelector('#password-login').value.trim();

  
  if (tittle && description) {
    const response = await fetch('/newPost', {
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
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
