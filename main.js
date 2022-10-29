  
function dogFacts()   {

  let randomFact = document.getElementById("randomFact")

  fetch (`https://api.allorigins.win/raw?url=https://dog-api.kinduff.com/api/facts`)
  .then ((response) => response.json())
  .then ((data) => randomFact.innerHTML = data.facts);
    
  }


let urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "a2JzDls1AvsZqC9U4H1UL8g5xwZxaLAGXVMUQLIGxUAbApWBFL");
    urlencoded.append("client_secret", "eC6WcexILEcgtDFr4LdjxXNC5g1xXteU5Jh6xHj1");

    let bearerToken = ""

    let requestOptionsBearer = {
      method: 'POST',
      body: urlencoded
    };

    fetch("https://api.petfinder.com/v2/oauth2/token", requestOptionsBearer)
      .then(response => response.json())
      .then(result => {
  
        bearerToken = result.access_token;      

      })

      .catch(error => console.log('error', error));  

const petForm = document.getElementById("pet-form");
petForm.addEventListener('submit', fetchDogs);

function fetchDogs(event) {
  event.preventDefault();

  const zip = document.getElementById("zip").value;
   
  fetch(`https://api.petfinder.com/v2/animals?type=dog&page=2&location=${zip}&distance=50`, {

   headers: {
   Authorization: `Bearer ${bearerToken}`

  }})

.then(res => res.json())
.then ((data) => {
  console.log(data) 

  listDogs(data.animals)

})
.catch(err => console.log(err));

}

function listDogs(animals)  {
  const results = document.getElementById("results");
 results.innerHTML='';

  for (let i = 0; i < animals.length; i++) {
    console.log(animals[i])
    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    results.innerHTML+= `
      
       <div class="col-sm-4" mt-2>
         <h4>${animals[i].name} (${animals[i].age})</h4>
         <span class="text-secondary">${animals[i].gender}, ${animals[i].breeds.primary}</span>
         <a href="${animals[i].url}" target="_blank">See More</a>
         
        <div class="col-sm-4">
          <img class="img-fluid mt-2" src="${animals[i].primary_photo_cropped !==null ? animals[i].primary_photo_cropped.medium : "no_photo.png"}">

        </div>
    `;}}

