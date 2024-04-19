const { exec } = require("node:child_process");

const front = exec("npm run front");
const back = exec("npm run back");

front.stdout.on("data", data => console.log(`Front: ${data}`));

back.stdout.on("data", data => console.log(`Back: ${data}`));

front.stderr.on("data", data => console.error(`Front: ${data}`));

back.stderr.on("data", data => console.error(`Back: ${data}`));

front.on("close", code => console.log(`Front: child process exited with code ${code}`));

back.on("close", code => console.log(`Back: child process exited with code ${code}`));