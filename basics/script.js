const fs = require("node:fs");

// writefile
// Appendnfile
// rename
// copyfile
// unlink
//rmdir

// fs.writeFile(
//   "filename.txt",
//   "hello there, this is first file annd line",
//   function (err) {
//     if (err) console.error(err);
//     else console.log("done, file created");
//   }
// );

// fs.appendFile("filename.txt", "this is from appennd file",
//     function (err) {
//   if (err) console.error(err);
//   else console.log("done. file appended");
// });

// fs.rename("filename.txt", "newFileName.txt",
//     function (err) {
//   if (err) console.error(err);
//   else console.log("done, file renamed");
// });

// fs.copyFile("newFilename.txt", "./copyFile.txt",
//     function (err) {
//   if (err) console.error(err);
//   else console.log("done, file copied");
// });

// fs.mkdir("newFolder",
//     function (err) {
//   if (err) console.error(err);
//   else console.log("done with folder creation");
// });

// fs.unlink("newFilename.txt",
//     function (err) {
//   if (err) console.error(err);
//   else console.log("done, deleted file");
// });

// fs.unlink("copyFile.txt",
//     function (err) {
//   if (err) console.error(err);
//   else console.log("done, deleted copied file");
// });

// fs.rm("./newFolder", {recursive: true},
//     function (err) {
//   if (err) console.error(err.message);
//   else console.log("done, removed directory");
// });

// fs.readdir("./newFolder",
//     function (err,files) {
//           if (err) console.error(err.message);
//           else {console.log("done, reading folder")
//             console.log(files)
//           };
//     }
// )

fs.readFile("copyFile.txt","utf8", function callback(err, data) {
  if (err) console.error(err.message);
  else {
    console.log("done reading file");
    console.log(data);
  }
});
