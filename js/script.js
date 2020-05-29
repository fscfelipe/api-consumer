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
    results = object.results.filter((object) => {
      let name = `${object.name.first} ${object.name.last}`.toLowerCase();
      if (name.includes(inputValue.toLowerCase())) return object;
    });

    var idades = results.reduce((acc, val) => acc + val.dob.age, 0);
    console.log(idades);

    showSearchResults(results);
  });
}

function showSearchResults(searchResults) {
  console.log(searchResults);
  // TODO
}

startEvents();
