const nodeCron = require("node-cron");
const fetch = require("node-fetch");

const getSavedItems = async () => {
  const res = await fetch(`http://localhost:3000/api/user`);
  console.log("res res", res);
  return res;
};

const job = nodeCron.schedule("30 5 1 * * *", () => {
  console.log("yes it should work!!");
  getSavedItems();
});