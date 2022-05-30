// function readFile() {
//   let input = document.querySelector(".text-files");
//   let textarea = document.querySelector(".text-area");

//   input.addEventListener("change", () => {
//     let files = input[0].files;

//     if (files.length == 0) return;

//     const file = files[0];

//     let reader = new FileReader();

//     reader.onload = (e) => {
//       const file = e.target.result;
//       const lines = file.split(/\r\n|\n/);
//       textarea[0].value = lines.join("\n");
//     };

//     reader.onerror = (e) => alert(e.target.error.name);

//     reader.readAsText(file);
//   });
// }
// readFile();
