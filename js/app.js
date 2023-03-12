//sistema de ruta y climna  calcular complejida distncia y tiempo clima+ carretera + ideal 
//para tal bicicleta ruta mtb o gravel como usuario pueda escribir notas de la ruta 
//por experiencia de usuario esta parte lleva login

//CLIMA

const api = {
  key: '9e122cd782b2d0333f5fe4e7fa192062',
  url: `https://api.openweathermap.org/data/2.5/weather`
}

const card = document.getElementById('card')
const city = document.getElementById('city');
const date = document.getElementById('date').innerHTML = Date();
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImages(data) {
  const temp = toCelsius(data.main.temp);
  let src = './img/clima/temp-mid.png';
  if (temp > 26) {
    src = './img/clima/temp-high.png';
  } else if (temp < 20) {
    src = './img/clima/temp-hlow.png';
  }
  tempImg.src = src;
}

async function search(query) {
  try {
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await response.json();
    card.style.display = 'block';
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    data.innerHTML = (new Date()).toLocaleDateString('es', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    temp.innerHTML = `${toCelsius(data.main.temp)}c`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c`;
    updateImages(data);
  } catch (err) {
    console.log(err);
    alert('Hubo un error');
  }
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
  event.preventDefault();
  search(searchbox.value);
}

const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
searchform.addEventListener('submit', onSubmit, true);

// OBTENER UBICACION

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("location").innerHTML = "La geolocalización no es compatible con este navegador.";
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  document.getElementById("location").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
}


// OBTENER UBICACION 2
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function calculateDistance() {
  const latitude1 = toRadians(Number(document.getElementById("latitude1").value));
  const longitud1 = toRadians(Number(document.getElementById("longitud1").value));
  const latitude2 = toRadians(Number(document.getElementById("latitude2").value));
  const longitud2 = toRadians(Number(document.getElementById("longitud2").value));

  const R = 6371; // Radius of the earth in km
  const dLat = latitude2 - latitude1;
  const dLon = longitud2 - longitud1;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(latitude1) * Math.cos(latitude2) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  document.getElementById("result").textContent = `La distantancia entre(${latitude1}, ${longitud1}) y (${latitude2}, ${longitud2}) es ${distance.toFixed(2)} kilometros.`;
}

// MENU

const brandLogo = document.querySelector('.brand-logo');
const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  showcase.classList.toggle('active');
})


document.querySelector('.toggle').addEventListener('click', ()=>{
  document.querySelector('.brand-logo').classList.toggle('hide')
 })
 

// LOGIN & REGISTRO

// LOGIN

function login() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  

  if(username.value === 'admin' && password.value === 'admin') {
      window.location.href = '../index.html';
  } else {
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.classList.remove('hide');
  }
}


// REGISTRO

function checkIn(){
    window.location.href = '../pages/register.html';    
      const dataUser = {
        title: dataUser[0].value, 
        lastName: dataUser [1].value, 
        user: dataUser[2].value,
        date: dataUser[3].value,
        description: dataUser[4].value, 
        colorUser: dataUser[5].value, 
        password: dataUser[6].value 
      }
  }

  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
    });
  }

// PROBABILIDAD

class Trayectos{
     constructor(dist, eleva, roadCon, clim){
      this.dist = dist;
      this.eleva = eleva;
      this.roadCon = roadCon;
      this.clim = clim;
     }
}

//let trayectos = new Trayectos("10 a 50", "0-100", "asfalto", "seco")

const arrayObject = [
  //distance
  //--1 
  {
    distance: "10-20",
    elevation: "10-100",
    roadCondition: "asfalto",
    clima: "soleado",
    dificulty: "Facil",      
  },
  {
    distance: "10-20",
    elevation: "10-100",
    roadCondition: "asfalto",
    clima: "nublado",
    dificulty: "Facil moderado",      
 },
 {
    distance: "10-20",
    elevation: "10-100",
    roadCondition: "asfalto",
    clima: "lluvioso",
    dificulty: "Moderado",  
  },
  //-
  {
    distance: "10-20",
    elevation: "10-100",
    roadCondition: "trillo",
    clima: "soleado",
    dificulty: "Facil",      
  },
  {
    distance: "10-20",
    elevation: "10-100",
    roadCondition: "trillo",
    clima: "nublado",
    dificulty: "Facil moderado",      
 },
 {
    distance: "10-20",
    elevation: "10-100",
    roadCondition: "trillo",
    clima: "lluvioso",
    dificulty: "Moderado",  
  }, 
  //--2
  {
    distance: "20-60",
    elevation: "10-100",
    roadCondition: "asfalto",
    clima: "soleado",
    dificulty: "Facil moderado",      
  },
  {
    distance: "20-60",
    elevation: "10-100",
    roadCondition: "asfalto",
    clima: "nublado",
    dificulty: "Facil intermedia",      
 },
 {
    distance: "20-60",
    elevation: "10-100",
    roadCondition: "asfalto",
    clima: "lluvioso",
    dificulty: "Moderado intermedio",  
  },
  //-
  {
    distance: "20-60",
    elevation: "10-100",
    roadCondition: "trillo",
    clima: "soleado",
    dificulty: "Facil moderado",      
  },
  {
    distance: "20-60",
    elevation: "10-100",
    roadCondition: "trillo",
    clima: "nublado",
    dificulty: "Facil intermedia",      
 },
 {
    distance: "20-60",
    elevation: "10-100",
    roadCondition: "trillo",
    clima: "lluvioso",
    dificulty: "Moderado intermedio",  
  }, 
    //--3
    {
      distance: "60-100",
      elevation: "10-100",
      roadCondition: "asfalto",
      clima: "soleado",
      dificulty: "Dificil",      
    },
    {
      distance: "60-100",
      elevation: "10-100",
      roadCondition: "asfalto",
      clima: "nublado",
      dificulty: "Dificil moderado",      
   },
   {
      distance: "60-100",
      elevation: "10-100",
      roadCondition: "asfalto",
      clima: "lluvioso",
      dificulty: "Dificil intermedia",  
    },
    //-
    {
      distance: "60-100",
      elevation: "10-100",
      roadCondition: "trillo",
      clima: "soleado",
      dificulty: "Dificil",      
    },
    {
      distance: "60-100",
      elevation: "10-100",
      roadCondition: "trillo",
      clima: "nublado",
      dificulty: "Dificil moderado",      
   },
   {
      distance: "60-100",
      elevation: "10-100",
      roadCondition: "trillo",
      clima: "lluvioso",
      dificulty: "Dificil intermedia",  
    },
    //elevation
  //--1 
  {
    distance: "10-20",
    elevation: "101-200",
    roadCondition: "asfalto",
    clima: "soleado",
    dificulty: "Facil moderado",      
  },
  {
    distance: "10-20",
    elevation: "101-200",
    roadCondition: "asfalto",
    clima: "nublado",
    dificulty: "Facil moderado",      
 },
 {
    distance: "10-20",
    elevation: "101-200",
    roadCondition: "asfalto",
    clima: "lluvioso",
    dificulty: "Moderado",  
  },
  //-
  {
    distance: "10-20",
    elevation: "101-200",
    roadCondition: "trillo",
    clima: "soleado",
    dificulty: "Facil moderado",      
  },
  {
    distance: "10-20",
    elevation: "101-200",
    roadCondition: "trillo",
    clima: "nublado",
    dificulty: "Facil moderado",      
 },
 {
    distance: "10-20",
    elevation: "101-200",
    roadCondition: "trillo",
    clima: "lluvioso",
    dificulty: "Moderado",  
  }, 
  //--2
  {
    distance: "20-60",
    elevation: "101-200",
    roadCondition: "asfalto",
    clima: "soleado",
    dificulty: "Facil moderado",      
  },
  {
    distance: "20-60",
    elevation: "101-200",
    roadCondition: "asfalto",
    clima: "nublado",
    dificulty: "Facil intermedia",      
 },
 {
    distance: "20-60",
    elevation: "101-200",
    roadCondition: "asfalto",
    clima: "lluvioso",
    dificulty: "Moderado intermedio",  
  },
  //-
  {
    distance: "20-60",
    elevation: "101-200",
    roadCondition: "trillo",
    clima: "soleado",
    dificulty: "Facil intermedia",      
  },
  {
    distance: "20-60",
    elevation: "101-200",
    roadCondition: "trillo",
    clima: "nublado",
    dificulty: "Facil intermedia",      
 },
 {
    distance: "20-60",
    elevation: "101-200",
    roadCondition: "trillo",
    clima: "lluvioso",
    dificulty: "Dificil moderado",  
  }, 
    //--3
    {
      distance: "60-100",
      elevation: "101-200",
      roadCondition: "asfalto",
      clima: "soleado",
      dificulty: "Dificil",      
    },
    {
      distance: "60-100",
      elevation: "101-200",
      roadCondition: "asfalto",
      clima: "nublado",
      dificulty: "Dificil moderado",      
   },
   {
      distance: "60-100",
      elevation: "101-200",
      roadCondition: "asfalto",
      clima: "lluvioso",
      dificulty: "Dificil intermedia",  
    },
    //-
    {
      distance: "60-100",
      elevation: "101-200",
      roadCondition: "trillo",
      clima: "soleado",
      dificulty: "Dificil",      
    },
    {
      distance: "60-100",
      elevation: "101-200",
      roadCondition: "trillo",
      clima: "nublado",
      dificulty: "Dificil moderado",      
   },
   {
      distance: "60-100",
      elevation: "101-200",
      roadCondition: "trillo",
      clima: "lluvioso",
      dificulty: "Dificil intermedia",  
    },    
        //elevation 2
  //--1 
  {
    distance: "10-20",
    elevation: "201-300",
    roadCondition: "asfalto",
    clima: "soleado",
    dificulty: "Dificil",      
  },
  {
    distance: "10-20",
    elevation: "201-300",
    roadCondition: "asfalto",
    clima: "nublado",
    dificulty: "Dificil",      
 },
 {
    distance: "10-20",
    elevation: "201-300",
    roadCondition: "asfalto",
    clima: "lluvioso",
    dificulty: "Dificil",  
  },
  //-
  {
    distance: "10-20",
    elevation: "201-300",
    roadCondition: "trillo",
    clima: "soleado",
    dificulty: "Dificil",      
  },
  {
    distance: "10-20",
    elevation: "201-300",
    roadCondition: "trillo",
    clima: "nublado",
    dificulty: "Dificil",      
 },
 {
    distance: "10-20",
    elevation: "201-300",
    roadCondition: "trillo",
    clima: "lluvioso",
    dificulty: "Dificil",  
  }, 
  //--2
  {
    distance: "20-60",
    elevation: "201-300",
    roadCondition: "asfalto",
    clima: "soleado",
    dificulty: "Dificil",      
  },
  {
    distance: "20-60",
    elevation: "201-300",
    roadCondition: "asfalto",
    clima: "nublado",
    dificulty: "Dificil",      
 },
 {
    distance: "20-60",
    elevation: "201-300",
    roadCondition: "asfalto",
    clima: "lluvioso",
    dificulty: "Dificil",  
  },
  //-
  {
    distance: "20-60",
    elevation: "201-300",
    roadCondition: "trillo",
    clima: "soleado",
    dificulty: "Dificil",      
  },
  {
    distance: "20-60",
    elevation: "201-300",
    roadCondition: "trillo",
    clima: "nublado",
    dificulty: "Dificil",      
 },
 {
    distance: "20-60",
    elevation: "201-300",
    roadCondition: "trillo",
    clima: "lluvioso",
    dificulty: "Dificil",  
  }, 
    //--3
    {
      distance: "60-100",
      elevation: "201-300",
      roadCondition: "asfalto",
      clima: "soleado",
      dificulty: "Dificil",      
    },
    {
      distance: "60-100",
      elevation: "201-300",
      roadCondition: "asfalto",
      clima: "nublado",
      dificulty: "Dificil",      
   },
   {
      distance: "60-100",
      elevation: "201-300",
      roadCondition: "asfalto",
      clima: "lluvioso",
      dificulty: "Dificil",  
    },
    //-
    {
      distance: "60-100",
      elevation: "201-300",
      roadCondition: "trillo",
      clima: "soleado",
      dificulty: "Dificil",      
    },
    {
      distance: "60-100",
      elevation: "201-300",
      roadCondition: "trillo",
      clima: "nublado",
      dificulty: "Dificil",      
   },
   {
      distance: "60-100",
      elevation: "201-300",
      roadCondition: "trillo",
      clima: "lluvioso",
      dificulty: "Dificil",  
    },        
]


function caldificulty(){
  const distance = document.getElementById("distance").value;
  const elevation = document.getElementById("elevation").value;
  const roadCondition = document.getElementById("roadCondition").value;
  const clima = document.getElementById("clima").value;

  console.log(distance);
  console.log(elevation);
  console.log(roadCondition);
  console.log(clima);
  
  let trayectos = new Trayectos(distance, elevation, roadCondition, clima); 
  let encontrado = arrayObject.find(arrayObject => arrayObject.distance === trayectos.dist && 
  arrayObject.elevation === trayectos.eleva && arrayObject.roadCondition === trayectos.roadCon 
  && arrayObject.clima === trayectos.clim);

  //console.log(encontrado);
  if (encontrado === undefined) {
    document.getElementById("dificulty").innerHTML = "Esta seleccion no esta en la lista";
   
  } else  {  document.getElementById("dificulty").innerHTML = encontrado.dificulty;
}
} 




 