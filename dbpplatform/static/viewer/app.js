import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";
import Stats from 'stats.js/src/Stats';

console.log("ok");

const container = document.getElementById("viewer-container");

let viewer = new IfcViewerAPI({
  container
});

//memory visualization
const stats = new Stats();
addStats();
function addStats() {
    stats.showPanel(2);
    document.body.append(stats.dom);
    viewer.context.stats = stats;
};


const input = document.getElementById("ifc-input");

window.addEventListener("dblclick", async function(event){
  const { modelID, id } = await viewer.IFC.selector.pickIfcItem(true);

  console.log(modelID);
  console.log(id);
  
  const props = await viewer.IFC.getProperties(modelID, id, true, false);

  console.log(props);
  alert(props);
});


window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
viewer.clipper.active = true;

window.onkeydown = (event) => {
  if (event.code === "KeyP") {
    viewer.clipper.createPlane();
  } else if (event.code === "KeyO") {
    viewer.clipper.deletePlane();
  }
};


async function loadIfc(url) {
  // await viewer.IFC.setWasmPath("./wasm/");

  const loader_spinner = document.getElementById("load-spinner");
  const container = document.getElementById("viewer-container");

  container.style.display = "none";
  loader_spinner.classList.toggle("visually-hidden");

  const model = await viewer.IFC.loadIfcUrl(url, true);
  
  loader_spinner.classList.toggle("visually-hidden");
  container.style.display = "block";
  
  console.log('ok!');
  await viewer.shadowDropper.renderShadow(model.modelID);
  clean_button.classList.toggle("has-model");
  loader_spinner.style.display = "none";
}


input.addEventListener(
  "change",

  async (changed) => {
    console.log("loading")
    const file = changed.target.files[0];
    const ifcURL = URL.createObjectURL(file);
    loadIfc(ifcURL);
  },

  false
);

const grid_button = document.getElementById("activate-grid");

grid_button.addEventListener("click", async function() {

  if (this.classList.contains("grid-active")){
    viewer.grid.dispose()
    this.classList.toggle("grid-active")
  }
  else {
    await viewer.grid.setGrid(400, 100)
    this.classList.toggle("grid-active")
  }
}
)

// function createSideMenuButton(iconSource){
//   const button = document.createElement('button');
//   button.classList.add('basic-button-ifc');

//   const image = document.createElement("img");
//   image.setAttribute("src", iconSource);
//   image.classList.add('icon');
//   button.appendChild(image);

//   const sideMenu = document.getElementById('side-menu-left');
//   sideMenu.appendChild(button);

//   return button;
// }

// const loadButton = createSideMenuButton(logo);
// loadButton.addEventListener('click', () => {
//   loadButton.blur();
//   inputElement.click();
// });

async function releaseMemory() {
  viewer.dispose();
  viewer = null;
  viewer = new IfcViewerAPI({
    container
  });
  addStats();
}

const clean_button = document.getElementById("clean-viewer");

clean_button.addEventListener("click", async function() {

  if (this.classList.contains("has-model")){
    releaseMemory()
    this.classList.toggle("has-model")
  }
  else {
    alert("viewer already clean!")
  }
}
)



  


  