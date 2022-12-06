import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";

console.log("ok");

const container = document.getElementById("viewer-container");

const viewer = new IfcViewerAPI({
  container
});



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
  const model = await viewer.IFC.loadIfcUrl(url, true);
  viewer.shadowDropper.renderShadow(model.modelID);
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



  


  