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

async function searchUser() {
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
      });

    showSearchResults(results);
  });
}

function showSearchResults(searchResults) {
  console.log(searchResults);
  let usersUl = document.querySelector('usersList');
  let userLi = document.createElement('li');
  searchResults.forEach((element) => {});
}

startEvents();
