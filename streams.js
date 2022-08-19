const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // //solution 1
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  //Solution 2: streams
  const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    //signals no more data will be written
    res.end();
  });
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode(500);
    res.end("file not found!");
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...");
});
