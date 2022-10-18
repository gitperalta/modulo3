const commands = require("./commands/index.js");
// commands = {echo, date, ls, ...}
let print = (output) => {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
};
// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", (data) => {
  let args = data.toString().trim().split(" "); // remueve la nueva línea
  // ["echo", "hola"]
  let cmd = args.shift();
  // args = ["hola"]
  if (commands[cmd]) {
    commands[cmd](args, print);
  }
  // if (cmd === "echo") {
  //   process.stdout.write(args.join(" "));
  // } else if (cmd === "ls") {
  // } else if (cmd === "pwd") {
  // } else if (cmd === "date") {
  // }
  else {
    print("ERROR: command not found");   
  }
});
