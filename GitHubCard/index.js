const cardsElement = document.querySelector('.cards')
const myGithubUserName = 'BkAngel201'
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/
axios.get(`https://api.github.com/users/${myGithubUserName}`)
.then(response => {
  cardsElement.appendChild(cardMaker(response))
  const followersText = document.createElement('h4')
  followersText.textContent = `Followers:`
  cardsElement.appendChild(followersText)
  return axios.get(`https://api.github.com/users/${response.data.login}/followers`)
})
.then(response => {
  for (const iterator of response.data) {
    axios.get(`https://api.github.com/users/${iterator.login}`)
    .then(response => {
      cardsElement.appendChild(cardMaker(response))
    })
  }
})





// const followersArray = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];
// followersArray.forEach((el) => {
//   axios.get(`https://api.github.com/users/${el}`)
//   .then(response => {
//     cardsElement.appendChild(cardMaker(response))
//   })
// })

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
const cardMaker = (response) => {
  const card = document.createElement('div')
  card.classList.add('card')

  const img = document.createElement('img')
  img.src = response.data.avatar_url
  card.appendChild(img)

  const cardInfo = document.createElement('div')
  cardInfo.classList.add('card-info')
  card.appendChild(cardInfo)

  const headerName = document.createElement('h3')
  headerName.classList.add('name')
  headerName.textContent = response.data.name
  cardInfo.appendChild(headerName)

  const userName = document.createElement('p')
  userName.classList.add('username')
  userName.textContent = response.data.login
  cardInfo.appendChild(userName)

  const userLocation = document.createElement('p')
  userLocation.textContent = `Location: ${response.data.location}`
  cardInfo.appendChild(userLocation)

  const userProfile = document.createElement('p')
  userProfile.textContent = `Profile: `
  const profileLink = document.createElement('a')
  profileLink.href = response.data.html_url
  profileLink.textContent = response.data.html_url
  userProfile.appendChild(profileLink)
  cardInfo.appendChild(userProfile)

  const userFollowers = document.createElement('p')
  userFollowers.textContent = `Followers: ${response.data.followers}`
  cardInfo.appendChild(userFollowers)

  const userFollowing = document.createElement('p')
  userFollowing.textContent = `Following: ${response.data.following}`
  cardInfo.appendChild(userFollowing)

  const userBio = document.createElement('p')
  userBio.textContent = `Bio: ${response.data.bio}`
  cardInfo.appendChild(userBio)

  const userContribution = document.createElement('img')
  userContribution.src = ``
  userContribution.alt = `Constribution Chart <${response.data.login}>`
  userContribution.classList.add('contribution')
  card.appendChild(userContribution)

  const expandBtn = document.createElement('a')
  expandBtn.textContent = 'Constribution Graph'
  expandBtn.classList.add('expand-btn')
  card.appendChild(expandBtn)

  return card
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
