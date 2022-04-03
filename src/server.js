const app = require("./index");

const connect = require("./configs/db");

app.listen(5432, async ()=> {
  try {
    await connect();
    console.log("listening on port 5432");
  } catch (err) {
    console.error("Error connecting" + err);
  }
});