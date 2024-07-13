document.addEventListener("DOMContentLoaded", () => {
    const followers = [
      { name: "Void Umesha", username: "VoidUmesha", img: "../img/profileImages/image1.png" },
      { name: "Umesha Rukshan", username: "UmeshaRukshan", img: "../img/profileImages/image2.png" },
      { name: "Crypto Sudda", username: "CryptoSudda", img: "../img/profileImages/image3.png" },
      { name: "Pravini Herath", username: "PraviniHera", img: "../img/profileImages/image4.png" },
    ];
  
    const followersList = document.getElementById("followersList");
  
    followers.forEach(follower => {
      const followerDiv = document.createElement("div");
      followerDiv.classList.add("follower");
  
      const followerInfoDiv = document.createElement("div");
  
      const img = document.createElement("img");
      img.src = follower.img;
      img.alt = follower.name;
      img.classList.add('followerImage');
  
      const nameDiv = document.createElement("div");
      nameDiv.classList.add("name");
      nameDiv.innerHTML = `<span>${follower.name}</span><span>@${follower.username}</span>`;
  
      followerInfoDiv.appendChild(img);
      followerInfoDiv.appendChild(nameDiv);
  
      const followButton = document.createElement("button");
      followButton.classList.add('button', 'fc-button');
      followButton.textContent = 'Follow';
  
      followerDiv.appendChild(followerInfoDiv);
      followerDiv.appendChild(followButton);
  
      followersList.appendChild(followerDiv);
    });
  });
  