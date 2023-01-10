const searchWordBtn = document.querySelector("#searchWordBtn");
const searchWordinput = document.querySelector("#searchWordinput");
const display = document.querySelector("#display");

const apiEndPoint = "https://inshorts.deta.dev/news?category=";

searchWordBtn.addEventListener("click", () => {
  displayResult();
});

searchWordinput.addEventListener("keypress", (event) => {
  if (event.code === "Enter") {
    displayResult();
  }
});

function displayResult() {
  let searchWord = searchWordinput.value;
  if (searchWord === "" || searchWord === " " || searchWord.length < 2) {
    displayAlert("Wrong word", "Input at least 2 symbol", "error");
    return;
  }
  searchWordinput.value = "";
  getResponse(searchWord.trim());
}

function getResponse(endPoint) {
  const xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET", `${apiEndPoint}${endPoint}`);
  // xmlRequest.onloadstart = () => {
  //   console.log("Request send loading ...");
  // };
  xmlRequest.onloadend = () => {
    if (xmlRequest.status === 200) {
      displayAlert(
        "Wrong word",
        `We wasn't able to find ${endPoint} in our server`,
        "warning"
      );
    } else {
      addDataToTable(JSON.parse(xmlRequest.responseText));
    }
  };
  xmlRequest.send();
}

function addDataToTable(response) {
  console.log(response);
  for (let i = 0; i < response.data.length; i++) {
    let data = response.data[i];
    display.innerHTML += `
      <div class="card" style="width: 18rem;">
      <img src="${data.imageUrl}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Author: ${data.author}</h5>
        <p class="card-text">Title: ${data.title}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">date: ${data.date}</li>
      </ul>
      <div class="card-body">
        <a target="_blank" href="${data.url}" class="card-link">More information</a>
      </div>
    </div>
      `;
  }
}

function displayAlert(title, text, icon) {
  Swal.fire({ title, text, icon });
}
