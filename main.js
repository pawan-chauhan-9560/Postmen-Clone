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
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

//If User adding some new Custom Parameters
let plusBtn = document.getElementById("plusBtn");
plusBtn.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="form-row my-2">
  <label for="parameter-box" class="col-sm-2 col-form-label"
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
  //adding a eventLisner for delete the params
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
  document.getElementById("responseJsonTxt").value =
    "Please Wait....Work in Progresss!!!";
  //Fetching value user has Entered
  let url = document.getElementById("urlBox").value;
  let requestType = document.querySelector("input[name='requestType']:checked")
    .value;
  let contentType = document.querySelector("input[name='contentType']:checked")
    .value;
  console.log("URL is ", url);
  console.log("requestType is ", requestType);
  console.log("contentType ", contentType);
});
