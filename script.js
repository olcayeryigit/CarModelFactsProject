document.addEventListener("DOMContentLoaded", function () {
  console.log("Sayfa yüklendi!"); // Sayfa yüklendiğinde log basılır
  addCars();
  filter();
});
const divCars = document.querySelector("#cars");

//****FETCH CARS*/
function fetchCars(url) {
  return new Promise((resolve,reject)=>{
 fetch(url)
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(err=>reject(err));
    })
  }


 //console.log("fetchCars");
 //console.log(fetchCars("carsData.json"));
 
      


//*****ADDCARS********/
function addCars() {

  fetchCars("carsData.json")
  .then(data=> {
      //console.log("data");
      //console.log(data);
      // console.log(typeof data);
      data.forEach((item) => {
       //console.log(item);
        createCarCards(item);
      });
    })
    .catch((err) => console.error(err)); // Hata durumu loglanır
}


//
divCars.addEventListener("click", function (e) {
  carCard = e.target.closest("#car-card"); //En yakın car-card elementi seçildi
  if (carCard) {
    console.log("carCard:" + carCard);
    let ID = carCard.dataset.id;
    console.log("ID:" + ID);
    fetchCarDetails(ID);
  }
});

//****************FETCH CAR DETAİLS*********************** */

//FETCH
function fetchCarDetails(ID) {
  fetchCars("carsData.json")
  .then(data=>{
      data.forEach((item) => {
        //console.log("item:");
        //console.log(item);
       // console.log("itemID:" + item.id);
        const car = data.find((item) => item.id == ID); // ID eşleşen araba bulunur
       // console.log("car:");
       // console.log(car);

        if (car) {
          displayCarDetails(car); // Detaylar gösterilir
        }
      });
    })
    .catch((err) => console.error(err)); // Hata durumu loglanır
}
//****************DİSPLAY CAR DETAİLS*********************** */

function displayCarDetails(car) {
  const divDetails = document.querySelector("#detailsDiv");
  // console.log(divDetails);
  let iconDiv = document.querySelector("#iconDiv");
  document.querySelector(
    "#model"
  ).innerText = `${car.car_make}-${car.car_model}`;
  divDetails.innerHTML = `
  <div>
  <img src=${car.image} class="img-fluid" id="detailImg" alt="${car.car_make} ${car.car_model}">
  </div>
  
  <div class="d-flex flex-column m-auto g-3 px-4 pt-3" id="textDiv" >
  <p class="">Model Year:<span class=""> ${car.car_model_year}</span></p>
  <p class="">Fuel Type:<span class=""> ${car.fuel_type}</span></p>
  <p class="">Transmission:<span class=""> ${car.transmission}</span></p>
  <p class="">Seating Capacity:<span class=""> ${car.seats}</span></p>
  </div>

  `;
  divDetails.classList.remove("d-none"); // Detaylar görünür hale getirilir
  iconDiv.classList.remove("d-none"); // İkon görünür hale getirilir
  window.scrollTo(0, 0); // Sayfa en üste kaydırılır
  document.querySelector("#down").classList.add("d-none"); //down butonu gizlenir
}

//*******DETAYLARI GİZLEME*******/
document.querySelector("#closeIcon").addEventListener("click", function () {
  document.querySelector("#detailsDiv").classList.add("d-none"); // Detaylar gizlenir
  document.querySelector("#iconDiv").classList.add("d-none"); // İkon gizlenir
  document.querySelector("#down").classList.remove("d-none"); //down butonu gösterilir
});
//****************UP İŞLEMİ*********/

document.querySelector("#up").addEventListener("click", function () {
  window.scrollTo(0, 0); // Sayfa en üste kaydırılır
});

document.querySelector("#down").addEventListener("click", function () {
  window.scrollTo(0, document.body.scrollHeight); // Sayfa en alta kaydırılır
});
/*

//********HEADER TEXT COLOR*********/
var colors = ["#C8C5C6", "#7D91A9", "#B5BABF", "#C8C5C6", "#EAECF0"]; // Değişecek renkler
var currentIndex = 0; // Başlangıçta kullanılacak renk dizini

function changeColor() {
  var textElement = document.querySelector(".header h3");
  textElement.style.color = colors[currentIndex]; // Yazı rengini değiştir
  currentIndex = (currentIndex + 1) % colors.length; // Bir sonraki renge geç
}
// Belirli bir aralıkta renk değiştirme fonksiyonunu çağırma
setInterval(changeColor, 1000); //saniyede bir çağır

//****************FİLTER İŞLEMİ*********/
function filter() {
  let inputFilter = document.querySelector("#inputFilter");
  //console.log(inputFilter);
  //input eventi:Kullanıcı bir input alanının değerini değiştirdiğinde tetiklenir
  inputFilter.addEventListener("input", function () {
    let filterValue = inputFilter.value
      .replace(/\s/g, "")
      .toLowerCase(); //hatf ve sayı dışındakiler "" ile değiştirilir;
    console.log("filtervalue:" + filterValue);
    divCars.innerHTML = "";

    fetchCars("carsData.json")
      .then((data) => {
        //console.log(data);
        data.forEach((item) => {
          //console.log(item);
          //console.log(item.car_make);
          //console.log(item.car_model);
          let makeAndModel = (item.car_make + item.car_model)
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase(); //hatf ve sayı dışındakiler "" ile değiştirilir
          console.log(makeAndModel);
          if (makeAndModel.includes(filterValue)) {
            createCarCards(item);
          }
        });
      })
      .catch((err) => console.error(err)); // Hata durumu loglanır
  });
}

function createCarCards(item) {
  divCars.innerHTML += `
  <div class="d-flex flex-column justify-content-end bg-white pb-0 rounded-4 mb-2 border border-white border-2 car-card" data-id="${item.id}" style="height:15rem;" id="car-card">  
<div class="my-auto">
<img src=${item.image} class="img-fluid" id="img" style="width:16rem; overflow:hidden;" alt="${item.car_make} ${item.car_model}">
</div>
<div class="text-center bg-black mb-0 pt-2 rounded-bottom-4 py-2" id="carModel";> ${item.car_make}-${item.car_model}</div>
</div>
`;
}
