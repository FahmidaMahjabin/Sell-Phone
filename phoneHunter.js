// function = find searched url 
// step1:get the input value 
// step2: put the searchedValue into url as dynamic 

const getURL = () =>{
    const searchText = document.getElementById("searchText").value;
    const searchURL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    document.getElementById("searchText").value  = "";
    return searchURL
}

// function = show phones 
// output = search e jei phone pabo ta show korbo browser e 
// step1:url e jeta pabo tar data array pabo 
// step2:oi data loop through kore oikoyta card create kore parent div e append korbo
// step3:jodi data 20 er beshi hoy tahole 20 porjonto slice kore show korbo 
// step4:20 er por er gulo ekta button click korle show korbo
// Corner case:jodi kono result na pawa jay tahole error show korte hobe 

showPhonesOnBrowser = () => {
    toggleElement("spinner", "block")
    fetch(`${getURL()}`)
    .then(response => response.json())
    .then(data =>{
        if(data.status){
            if(data.data.length <= 20){
                showPhones(data.data)
                
            }
            else{
                showPhonesMoreThan20(data.data)
                
            }
            toggleElement("spinner", "none")
            }

            
        else{
            toggleElement("alert", "block");
            toggleElement("phones", "none");
            toggleElement("spinner", "none")
        }
        
        

    })
}
// function = show phones on browser when phone more than 20 
// step1: listOfPhone k 2 ta list korte hobe list1 = 1 to 20 , list2 = 21 to last
// step2:first20 er jonno shob phone show korbo 
// step3:ekta button show korbo jeta click korle baki phones show korbe 
// step4:ager 20 phones khali kora jabe na
function showPhonesMoreThan20(listOfPhone){
    const first20 = listOfPhone.slice(0, 20);
    const phoneAbove20 = listOfPhone.slice(20, listOfPhone.length)
    document.getElementById("phones").innerHTML = "";
    toggleElement("alert", "none");
    showPhones(first20)
    toggleElement("seeMore", "inline-block");
    document.getElementById("seeMore").addEventListener("click", function(){
        document.getElementById("phones").innerHTML = "";
        console.log("see the last phones:", phoneAbove20 )
        showPhones(listOfPhone)
        toggleElement("phones", "flex")
        
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
    <p class = "text-primary">mainFeatures:
     ${getKeyValueOfObject(phone.mainFeatures)}</p>
    <br>
    <p class = "text-primary">Others:
    ${getKeyValueOfObject(phone.others)}</p>
    `

       

}

function getKeyValueOfObject(object){
    let keyValues = "";
    for(let key in object){
        keyValues += `<p>${key}: ${object[key]} </p>`;   
    }
    return keyValues;
}


