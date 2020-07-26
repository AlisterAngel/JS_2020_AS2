//JavaScript

let incompList = document.getElementById("incomplete_tasks_list");
let compList = document.getElementById("completed_tasks_list");

let task = document.getElementById("new_task");
let addBtn = document.getElementById("add_btn");

function createNewTaskElement(){
  let list = document.createElement("li");
  list.setAttribute("class","incomp");

  let checkBox = document.createElement("input");
  checkBox.setAttribute("type","checkbox");
  checkBox.setAttribute("onclick","moveTask(this)");

  let text = document.createTextNode(" " + task.value.trim() + " ");

  let deleteBtn = document.createElement("input");
  deleteBtn.setAttribute("type","button");
  deleteBtn.setAttribute("value","Delete");
  deleteBtn.setAttribute("onclick","deleteTask(this)");

  list.appendChild(checkBox);
  list.appendChild(text);
  list.appendChild(deleteBtn);

  incompList.appendChild(list);
}

//Delete task.
function deleteTask(li){

		var listItem = li.parentNode;
		var ul = listItem.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);

}

//Move task to proper list
function moveTask(li){

  var listItem = li.parentNode;
  var list = listItem.parentNode;

  if (list.id == compList.id) {
    incompList.appendChild(listItem);
    listItem.setAttribute("class","incomp");
  }else{
    compList.appendChild(listItem);
    listItem.setAttribute("class","comp");
  }
}

function callForWeather() {
  // Get Location
  navigator.geolocation.getCurrentPosition(success, error);
}

function success(pos) {
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    weather(lat, long);
}


function error() {
    console.log('There was an error');
}

// Call Weather
function weather(lat, long) {
    var URL = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long;

    let request = new XMLHttpRequest();

    request.open("GET",URL);

    request.responseType = "json";

    request.send();

    request.onload = function(){
      let data = request.response;

      updateDOM(data);
    }
}

// Update Dom
function updateDOM(data) {
    var city = data.name;
    var temp = Math.round(data.main.temp_max);
    var desc = data.weather[0].description;
    var icon = data.weather[0].icon;
    document.getElementById("cityName").innerHTML = city;
    document.getElementById("temp").innerHTML = temp + "&#176;";
    document.getElementById("desc").innerHTML = desc;
    document.getElementById("icon").setAttribute('src',icon);
}
