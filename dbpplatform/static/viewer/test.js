


const input = document.getElementById("ifc-input-form");

input.addEventListener("change", (changed) => {
  console.log(changed.target.files[0])
});