const users = getUsers();

const startEvents = () => {
  let searchUserInput = document.querySelector('#userSearchInput');
  searchUserInput.addEventListener('keyup', searchUser);
};

async function getUsers() {
  const users = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  return await users.json();
}

async function searchUser(target) {
  if (target.key === 'Enter') {
    let searchUserInput = document.querySelector('#userSearchInput');
    let inputValue = searchUserInput.value;

    users.then((object) => {
      // Filtering and mapping users
      results = object.results
        .filter(({ name, picture, dob, gender }) => {
          let nameUser = `${name.first} ${name.last}`.toLowerCase();
          if (nameUser.includes(inputValue.toLowerCase())) return object;
        })
        .map((user) => {
          return {
            name: `${user.name.first} ${user.name.last}`,
            gender: user.gender,
            picture: user.picture,
            age: user.dob.age,
            gender: user.gender,
          };
        })
        .sort(function (a, b) {
          // Sort by name
          return a.name.localeCompare(b.name);
        });

      showSearchResults(results);
    });
  }
}

function showSearchResults(searchResults) {
  // Recreate the users list
  let usersUl = document.querySelector('.usersList');
  eraseUsersList(usersUl);
  let userLi;

  searchResults.forEach((user) => {
    // List element
    userLi = document.createElement('li');
    // Picture element
    let userPic = document.createElement('img');
    userPic.src = user.picture.medium;
    // Span (Name) element
    let userName = document.createElement('span');
    userName.innerText = `${user.name}, `;
    // Span (Age) element
    let userAge = document.createElement('span');
    userAge.innerText = user.age;
    userAge.innerText = user.age;
    // Appending user to list
    userLi.appendChild(userPic);
    userLi.appendChild(userName);
    userLi.appendChild(userAge);
    usersUl.appendChild(userLi);
  });
}

function eraseUsersList(usersList) {
  while (usersList.firstChild) {
    usersList.removeChild(usersList.firstChild);
  }
}

startEvents();
