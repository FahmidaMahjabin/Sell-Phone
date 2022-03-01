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
function showPhonesOnBrowser(){
    fetch(`${getURL()}`)
    .then(response => response.json())
    .then(data =>{
        if(data.status){
        showPhones(data.data)}
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
    listOfPhone.forEach(showEachPhone)
    toggleElement("phones", "flex")
}

const showEachPhone = (phone) =>{
    const aPhone = document.createElement("div");
    aPhone.innerHTML = `<div class = "card p-2 bg-light"><img src=${phone.image} class="card-img-top img-fluid" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <h5 class="card-text">${phone.brand}</h5>
      <a href="https://openapi.programming-hero.com/api/phone/${phone.slug}" target = "_blank" class="btn btn-primary">See Details</a>
    </div></div>`;
    document.getElementById("phones").appendChild(aPhone);
}

