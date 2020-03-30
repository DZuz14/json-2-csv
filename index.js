const jsonToCSV = require("./examples/json2csv");
const header = require("./header");

(function() {
  const csvFiles = [];

  for (let i = 1; i < 2001; i++)
    csvFiles.push(
      jsonToCSV(header, {
        in: `./data/customers-${i}.json`,
        out: `./data/customers-${i}.csv`
      })
    );

  Promise.all(csvFiles)
    .then(() => {
      console.log("All csv files written successfully!");
    })
    .catch(err => console.log(err.message));
})();
