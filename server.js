/**
 * This is a node server file to upload all the files
 * in the server and save the files' names in the
 * databse
 *
 * @author Mahesh Khattri A00432768
 */

/**
 * import all the required modules
 */
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const axios = require("axios");
const app = express();
const SALT_WORK_FACTOR = 10;

const PORT = process.env.PORT || 3099;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**
 * declare the directory of the files used by the form
 */
 app.use(express.static(__dirname));
 app.use(express.static(__dirname + "/public"));
 app.use(express.static(__dirname + "/CSS"));
 app.use(express.static(__dirname + "/Images"));
 app.use(express.static(__dirname + "/UPLOADS"));
// app.use("/Scripts", express.static(__dirname + "/Scripts"));
// app.use("/UPLOADS", express.static(__dirname + "/UPLOADS"));
app.use(express.static("newForm"));
// app.use(compression());

/**
 * import the database credentials in the
 * ./config/keys.MongoURI module
 */
const db = require("./config/keys").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/**
 * multer defines the destination to store the uploaded files into the ugdev
 * server which is UPLOADS directory
 */
var storeUploads = multer.diskStorage({
  destination: (req, file, cb) => {
    var dest = "UPLOADS/";
    // var dest = "https://ugdev.cs.smu.ca/~group17/Form/UPLOADS";
    cb(null, dest);
  },
  /*
     create a filename to save in the ugdev server 
    */
  filename: (req, file, cb) => {
    let name_of_file =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, name_of_file);
  },
});

/**
 * get all the inputs from the form and store the file types in
 * the predefined storeUploads and set the maxcount of each input
 * to 1
 */
var file_upload = multer({ storage: storeUploads });
var fileUpload = file_upload.fields([
  { name: "file1", maxCount: 1 },
  { name: "file2", maxCount: 1 },
  { name: "file3", maxCount: 1 },
  { name: "file4", maxCount: 1 },
  { name: "file5", maxCount: 1 },
  { name: "file6", maxCount: 1 },
  { name: "file7", maxCount: 1 },
  // { name: "file8", maxCount: 1 },
  // { name: "file9", maxCount: 1 },
  // { name: "chapter", maxCount: 1 },
  // { name: "title", maxCount: 1 },
  // { name: "author", maxCount: 1 },
]);
var Book = mongoose.model("Book", mongoose.Schema({}), "bookstore");

const identitySchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: String,
  email_id: {
    type: String,
    createIndexes: { unique: true },
  },

  contact_no: Number,
  password: String,
});

var Identity = mongoose.model("personal_details", identitySchema);
/**
 * send  the index.html file as response on get request
 */
app.get("/", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
  // res.sendFile(path.join(__dirname, "/public/login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/get", async (req, res) => {
  Book.find({}, (err, data) => {
    // data = JSON.parse(JSON.stringify(data));
    //console.log(data[0].pages[0].filenames[0])
    res.json(data);
  });
});
// app.get("/already-login-admin",  (req, res) => {
//   res.sendFile(__dirname + "/dist/navbar.html");
// });
// app.get("/", async (req, res) => {
//   res.sendFile(__dirname + "/dist/message.html");
// });

app.post("/success-login", async (req, res) => {
  email = req.body.email;
  password = req.body.password;

  if (await Identity.exists({ email_id: email })) {
    var resp = await Identity.find({ email_id: email });

    var result = await bcrypt.compare(password, resp[0].password);

    //  if(result)
    //
    // }
    // if (await Identity.exists({ 'email_id': email, 'password': password })) {
    if ((await resp[0].first_name) === "admin") {
      if (result) {
        res.sendFile(__dirname + "/dist/navbar.html");
      } else {
        res.send(
          '<script>alert("Wrong password. Please try again."); window.location.href = "/login"; </script>'
        );
      }
    } else res.sendFile(__dirname + "/dist/message.html");
  } else {
    res.send(
      '<script>alert("Could not find the account. Please create a new account."); window.location.href = "/signup"; </script>'
    );
  }
});
app.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  var password = await bcrypt.hash(req.body.password, salt);
  // var result = await(bcrypt.compare("Never1",password))
  if (req.body.fname === "admin") {
    res.send(
      "You can't sign up as an admin.Please try a different first name."
    );
  } else if (
    (await Identity.findOne({
      first_name: req.body.fname,
      _id: { $ne: this._id },
    })) &&
    (await Identity.findOne({
      last_name: req.body.lname,
      _id: { $ne: this._id },
    }))
  ) {
    res.send("This username is already taken.Please try a different one.");
  } else if (
    await Identity.findOne({ email_id: req.body.email, _id: { $ne: this._id } })
  ) {
    res.send("Email already exists. Try a new one.");
  } else {
    Identity.collection
      .insertOne({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email_id: req.body.email,
        contact_no: req.body.contact,
        password: password,
      })
      .then(() => {
        res.send("You are signed up");
      });
  }
});
/**
 * when the user submits the file, it first uploads the files
 * to the ugdev server and then saves the files' names in the
 * database
 * On success, it send the sucessful message with a link to
 * return to the home menu of the project
 * If found a error, it prints the error in the console
 */
var allfiles;
var story;
var storyTranslation;
var firstOption;
var secondOption;
var thirdOption;
app.post("/uploadfile", fileUpload, (req, res) => {
  allfiles = req.files;
  var chapterNum = req.body.chapter;
  var titleName = req.body.title;
  var authorName = req.body.author;
  story = req.body.story;
  storyTranslation = req.body.storyTranslation;
  firstOption = req.body.firstOption;
  secondOption = req.body.secondOption;
  thirdOption = req.body.thirdOption;
  var chapter = {};
  chapter["chapter"] = chapterNum;
  /**
   * if found a existing chapter in the database, push all the uploaded files'
   * names to the book collection
   */
  Book.collection
    .findOneAndUpdate(
      chapter,
      { $push: { pages: { filenames: makeFileNames() } } },
      { updateExiting: true }
    )
    .then((data) => {
      console.log(data);
      /**
       * if the chapter doesn't exist, create a new chapter and
       * then push all the files' names to the recently created chapter
       */
      if (data.value == null) {
        Book.collection
          .insertOne({
            chapter: chapterNum,
            author: authorName,
            title: titleName,
            pages: [],
          })
          .then(() => {
            console.log("inserted new chapters");
            Book.collection
              .findOneAndUpdate(
                chapter,
                { $push: { pages: { filenames: makeFileNames() } } },
                { updateExiting: true }
              )
              .then((data) => {
                console.log(data);
              });
          });
      }
    })
    .then(() => {
      res.send("sent");
    })
    //    .then(() =>
    //      res.send(`<p><h1>Congratulation! Files Uploaded Successfully</h1></p>
    // <button onclick="location.href='http://ugdev.cs.smu.ca/~group17'" ><h3>Lets go back to the home menu</h3></button>
    // `)
    //    )
    .catch((err) => {
      console.error(err);
    });
});

/**
 * make a files array to store all the files' names
 *
 * @returns files
 */
function makeFileNames() {
  let files = [];
  let fileName = "file";
  for (let i = 0; i < 12; i++) {
    // if(i==2 ){
    // files[2]=storyContent;

    // }
    // else{
    if (i < 7) {
      fileName += i + 1;
      files[i] = allfiles[fileName][0].filename;
      fileName = "file";
    } else {
      files[7] = story;
      files[8] = storyTranslation;
      files[9] = firstOption;
      files[10] = secondOption;
      files[11] = thirdOption;
    }
  }
  console.log(files);
  return files;
}

app.listen(PORT, () => {
  console.log("Nodesjs server running on PORT: " + PORT);
});
