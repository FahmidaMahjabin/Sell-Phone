// function = find searched url 
// step1:get the input value 
// step2: put the searchedValue into url as dynamic 

const getURL = () =>{
    const searchText = document.getElementById("searchText").value;
    const searchURL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    return searchURL
}

// function = show phones 
// output = search e jei phone pabo ta show korbo browser e 
// step1:url e jeta pabo tar data array pabo 
// step2:oi data loop through kore oikoyta card create kore parent div e append korbo
// Corner case:jodi kono result na pawa jay tahole error show korte hobe 
showPhonesOnBrowser = () => {
    toggleElement("spinner", "block")
    fetch(`${getURL()}`)
    .then(response => response.json())
    .then(data =>{
        if(data.status){
            console.log("length of phones:", data.data.length);
            showPhones(data.data)
            toggleElement("spinner", "none")}
        else{
            toggleElement("alert", "block");
            toggleElement("phones", "none");
        }

    })
}
const toggleElement = (elemntId, displayState) =>{
    document.getElementById(elemntId).style.display = displayState;
}
const showPhones = (listOfPhone) =>{
    toggleElement("alert", "none");
    document.getElementById("phones").innerHTML = "";
    listOfPhone.forEach(showEachPhone)
    toggleElement("phones", "flex")
}

const showEachPhone = (phone) =>{
    const aPhone = document.createElement("div");
    aPhone.innerHTML = `<div class = "card p-2 bg-light"><img src=${phone.image} class="card-img-top img-fluid" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <h5 class="card-text">${phone.brand}</h5>
      <a  onclick = 'showPhoneDetail("${phone.slug}")'  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >See Details</a>
    </div>
    </div>`;
    document.getElementById("phones").appendChild(aPhone);
}
// function = show one phone detailes when click 
// step1:when click on the phone details :
//     step1.1:get the phone.slug property and add that to the url 
//     step1.2:fetch url and get data 
//     step1.3:get phone image and all data into toe body and show in a div

const showPhoneDetail = (phoneModel) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneModel}`)
    .then(response => response.json())
    .then(data => showEachDetails(data.data))

}
// showPhoneDetail()
// step1:ekta card add korbo jate phone er shob detaile add korbo 
// step2: card ta browser e innerHTML e add korbo
const showEachDetails = (phone) => {
    console.log(phone);
    document.getElementById("modalTitle").innerHTML = `
    <h5 class = "text-center text-primary">${phone.name}</h5>`;
    document.getElementById("modalBody").innerHTML = `
    <div class= "text-center"><img class = "img-fluid" src = "${phone.image}">
    <p class = "fw-bold">Brand: ${phone.brand}</p>
    </div>
    <p class= "text-primary">released date: ${phone.releaseDate}</p>
    <p class = "text-secondary">mainFeatures:
     ${getKeyValueOfObject(phone.mainFeatures)}</p>
    <br>
    <p class = "text-secondary">Others:
    ${getKeyValueOfObject(phone.others)}</p>
    `

       

}

function getKeyValueOfObject(object){
    let keyValues = `<br>`;
    for(let key in object){
        // if(typeof(object[key] == "object")){
        //     return getKeyValueOfObject(object.object[key])
        // }
        // else{
            keyValues += `${key}: ${object[key]} `;
        // }
        
    }
    return keyValues;
}
// getKeyValueOfObject()

