let fs = require("fs");
let request = require("request");

module.exports = {
  echo: (args, print) => {
    print(args.join(" "));
  },
  date: (args, print) => {
    print(Date());
  },
  ls: (args, print) => {
    fs.readdir(".", (err, files) => {
      if (err) throw err;
      print(files.join("\n"));
    });
  },
  pwd: (args, print) => {
    print(process.cwd());
  },
  cat: (args, print) => {
    fs.readFile(args[0], "utf-8", (err, data) => {
      if (err) throw err;
      print(data);
    });
  },
  head: (args, print) => {
    fs.readFile(args[0], "utf-8", (err, data) => {
      if (err) throw err;
      let lines = 10;
      if (args[1]) lines = args[1];
      print(data.split("\n").splice(0, lines).join("\n"));
    });
  },
  tail: (args, print) => {
    fs.readFile(args[0], "utf8", (err, data) => {
      if (err) throw err;
      let lines = -10;
      if (args[1]) lines = args[1];
      print(data.split("\n").splice(-lines).join("\n"));
    });
  },
  curl: (args, print) => {
    request(args[0], (err, data) => {
      if (err) throw err;
      print(data.body);
    });
  },
};
