import { exec } from "child_process";

export function deployServer(req, res) {
  exec("git pull", (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  });
  res.sendStatus(200);
}
