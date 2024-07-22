const apiUrl = 'http://localhost:3000/auth';
const apiUrlPost = 'http://localhost:3000/posts'; // backend URL

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
      window.location.href = 'index.html';
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
      window.location.href = 'index.html';
    } else {
      alert('Invalid username or password');
    }
  });
}

// Load Profile Info
function showProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    document.getElementById('login-section').style.display = 'none';
    const profileSection = document.getElementById('profile-section');
    profileSection.style.display = 'block';

    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
      <img src="./img/boy.png" style="width: 100px; height: 100px;">
      <a href="./login.html" id="logoutButton">
        <img src="./img/logout.png" style="width: 20px; height: 20px;">
      </a>
      <h2>${user.firstname} ${user.lastname}</h2>
      <p>Username: ${user.username}</p>
      <p>Followers: ${user.followers.length}</p>
      <p>Following: ${user.following.length}</p>
    `;
  } else {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('profile-section').style.display = 'none';
  }
}

// Load Timeline Posts
function loadTimelinePosts() {
  const timelinePosts = document.getElementById('timelinePosts');
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    fetch(`${apiUrlPost}/${user._id}/timeline`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((posts) => {
        posts.forEach((post) => {
          const postElement = document.createElement('div');
          postElement.className = 'Postsection';
          postElement.innerHTML = `
          <p style="font-size: 9px">Date: ${post.createdAt}</p>
            <div class="PostImages">
              <img src="./img/PostImage/umesha.png" alt="Post Image" />
            </div>
            <div class="userFeed">
              <p>${post.desc}</p>
              <p>Likes: ${post.likes.length}</p>
              <div class="likeSession">
                <img src="./img/like.png" alt="Like Icon" />
                <img src="./img/comment.png" alt="Comment Icon" />
                <img src="./img/share.png" alt="Share Icon" />
              </div>
            </div>
          `;
          timelinePosts.appendChild(postElement);
        });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  } else {
    window.location.href = 'login.html';
  }
}

window.onload = function() {
  const user = localStorage.getItem('user');
  if (user) {
    showProfile();
    loadTimelinePosts();
  } else {
    document.getElementById('login-section').style.display = 'block';
  }
};
