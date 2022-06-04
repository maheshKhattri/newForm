
var result_resp = document.getElementById('img');

axios.get('/get').then((response) => {
    console.log(response.data);
    var getChapter = response.data[0].chapter;
    var getFiles = response.data[0].pages[0].filenames[0];
    var pageLength = response.data.length;
    result_resp.innerHTML += `<p>${getChapter}<br>    ${getFiles}<br>${pageLength}</p><br>`
 
   
//     for (let i = 0; i < pageLength; i++) {
//         for (let j = 0; j < 9; j++) {
//             // var file_names = JSON.stringify(response.data.filenames[i][j]).replace(/"/g,"");
//             var file_names = response.data[0].pages[0].filenames[j]

//             console.log("files are" + file_names.split('.').pop());
//             if (j == 1 || j == 2) {
//                 result_resp.innerHTML += `<iframe src= "/UPLOADS/${file_names}"" width="500" height="200">
// </iframe>`;
//                 }
//             else if (j == 6 || j == 7 || j == 8) {
//                 result_resp.innerHTML += `<audio controls autoplay muted>
//     <source src="/UPLOADS/${file_names}"" type="audio/mp3"></audio>`;
//             }
//             else {
//                 result_resp.innerHTML += `<img src ="/UPLOADS/${file_names}" width="900px"><br>`;
//             }
//         }
//     }
}).catch((error) => {
    // result_resp.innerHTML += error;
    console.log(error)
})


