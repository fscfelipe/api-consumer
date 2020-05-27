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
      return object.name.first.includes(inputValue);
    });
    showSearchResults(results);
  });
}

function showSearchResults(searchResults) {
  console.log(searchResults);
  // TODO
}

startEvents();
