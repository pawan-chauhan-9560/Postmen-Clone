//PostMan Clone

//Create function to get dom element from String

function getElmtStr(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

//variable for adding new parameters
let addNewParamCount = 0;

// Hide parameterBox intially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

//If user click on parameter box, hide json box
let customRadio = document.getElementById("customRadio");
customRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

//If user click on json box, hide parameter box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "block";
  document.getElementById("parametersBox").style.display = "none";
});

//If User adding some new Custom Parameters
let plusBtn = document.getElementById("plusBtn");
plusBtn.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="form-row my-2">
  <label for="url" class="col-sm-2 col-form-label"
    >Parameter${addNewParamCount + 2}</label
  >
  <div class="col-md-4">
    <input
      type="text"
      class="form-control"
      id="parameterKey${addNewParamCount + 2}"
      placeholder="Enter Parameter Key"
    />
  </div>
  <div class="col-md-4">
    <input
      type="text"
      class="form-control"
      id="parameterValue${addNewParamCount + 2}"
      placeholder="Enter Parameter Value"
    />
  </div>
  <button class="button btn btn-primary dltBtn">-</button>
</div>`;
  //convert the element string to dom node
  let paramElement = getElmtStr(string);
  params.appendChild(paramElement);

  //adding a eventLisner for delete the parameters
  let dltBtn = document.getElementsByClassName("dltBtn");
  for (item of dltBtn) {
    item.addEventListener("click", (e) => {
      let x = confirm("Are you sure you want to delete this parameter ?");
      if (x == true) {
        return e.target.parentElement.remove();
      } else {
        return false;
      }
    });
  }
  addNewParamCount++;
});

// If User Click Submit btn
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // document.getElementById("responseJsonTxt").value =
  //   "Please Wait....Work in Progresss!!!";

  document.getElementById("code").innerHTML =
    "Please Wait....Work in Progresss!!!";
  Prism.highlightAll();
  //Fetching value user has Entered
  let url = document.getElementById("urlBox").value;
  let requestType = document.querySelector("input[name='requestType']:checked")
    .value;
  let contentType = document.querySelector("input[name='contentType']:checked")
    .value;

  //If user Select Custom Parameters ,collect all the parameters in object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addNewParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
      data = JSON.stringify(data);
    }
  } else {
    data = document.getElementById("requestJsonTxt").value;
  }
  //log all the values
  console.log("URL is ", url);
  console.log("requestType is ", requestType);
  console.log("contentType ", contentType);
  console.log("data is ", data);

  //if request is get, invoke fetch api
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById("responseJsonTxt").value = text;
        document.getElementById("code").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById("responseJsonTxt").value = text;
        document.getElementById("code").innerHTML = text;
        Prism.highlightAll();
      });
  }
});
