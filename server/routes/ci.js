import { exec } from "child_process";

export function deployServer(req, res) {
  exec("git pull", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log("deploy endpoint called");
  });
  res.sendStatus(200);
}