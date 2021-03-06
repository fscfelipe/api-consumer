const users = getUsers();

const startEvents = () => {
  let searchUserInput = document.querySelector('#userSearchInput');
  searchUserInput.addEventListener('keyup', searchUser);

  let btnPesquisar = document.querySelector('#btnPesquisar');
  btnPesquisar.addEventListener('click', searchUser);
};

async function getUsers() {
  const users = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  return await users.json();
}

async function searchUser(target) {
  if (
    target.key === 'Enter' ||
    (event.target.id === 'btnPesquisar' && event.type === 'click')
  ) {
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
      showStatistics(results);
    });
  }
}

// refatorar para utilizar template strings
function showSearchResults(searchResults) {
  // Recreate the users list
  let usersUl = document.querySelector('.usersList');
  eraseUsersList(usersUl);

  searchResults.forEach((user) => {
    let divUser = document.createElement('div');
    divUser.classList.add('card-panel');
    divUser.classList.add('hoverable');

    // List element
    let userLi = document.createElement('li');
    userLi.classList.add('collection-item');
    userLi.classList.add('avatar');
    userLi.classList.add('valign-wrapper');

    // Picture element
    let userPic = document.createElement('img');
    userPic.src = user.picture.medium;
    userPic.classList.add('circle');
    userPic.classList.add('responsive-img');
    // Span (Name) element
    let userName = document.createElement('span');
    userName.innerText = `${user.name}, `;
    // Span (Age) element
    let userAge = document.createElement('span');
    userAge.innerText = user.age;
    // Appending user to list
    userLi.appendChild(userPic);
    userLi.appendChild(userName);
    userLi.appendChild(userAge);
    divUser.appendChild(userLi);
    usersUl.appendChild(divUser);
  });
}

function showStatistics(users) {
  let men = 0;
  let women = 0;
  let sumAge = 0;
  let avgAge = 0;

  users.forEach((user) => {
    sumAge += user.age;

    if (user.gender === 'female') women++;
    else if (user.gender === 'male') men++;
  });

  //Number of user found
  document.getElementById('numUsersFound').innerText = users.length;

  document.getElementById('numMen').innerText = men;
  document.getElementById('numWomen').innerText = women;
  document.getElementById('sumAge').innerText = sumAge;

  avgAge = users.length > 0 ? sumAge / users.length : 0;
  document.getElementById('avgAge').innerText = avgAge;
}

function eraseUsersList(usersList) {
  while (usersList.firstChild) {
    usersList.removeChild(usersList.firstChild);
  }
}

startEvents();
