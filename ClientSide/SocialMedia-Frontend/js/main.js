const apiUrl = 'http://localhost:3000'; // Your backend URL

// Register User
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;

    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, firstname, lastname }),
    });

    if (response.ok) {
      alert('User registered successfully');
      window.location.href = 'login.html';
    } else {
      alert('Error registering user');
    }
  });
}

// Login User
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'profile.html';
    } else {
      alert('Invalid username or password');
    }
  });
}

// Load Profile Info
const profileInfo = document.getElementById('profileInfo');
if (profileInfo) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    profileInfo.innerHTML = `
      <h2>${user.firstname} ${user.lastname}</h2>
      <p>Username: ${user.username}</p>
      <p>Followers: ${user.followers.length}</p>
      <p>Following: ${user.following.length}</p>
    `;
  } else {
    window.location.href = 'login.html';
  }
}

// Load Timeline Posts
const timelinePosts = document.getElementById('timelinePosts');
if (timelinePosts) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    fetch(`${apiUrl}/posts/${user._id}/timeline`)
      .then((response) => response.json())
      .then((posts) => {
        posts.forEach((post) => {
          const postElement = document.createElement('div');
          postElement.innerHTML = `
            <p>${post.desc}</p>
            <p>Likes: ${post.likes.length}</p>
          `;
          timelinePosts.appendChild(postElement);
        });
      });
  } else {
    window.location.href = 'login.html';
  }
}
