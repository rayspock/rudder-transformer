const integration = "intercom";
const name = "Intercom";

const fs = require("fs");
const path = require("path");

const transformer = require(`../v0/destinations/${integration}/transform`);

// TODO: Add cases for group, reset, etc. Also for events with order_id, etc.
test(`${name} Tests`, async () => {
  const inputDataFile = fs.readFileSync(
    path.resolve(__dirname, `./data/${integration}_input.json`)
  );
  const outputDataFile = fs.readFileSync(
    path.resolve(__dirname, `./data/${integration}_output.json`)
  );
  const inputData = JSON.parse(inputDataFile);
  const expectedData = JSON.parse(outputDataFile);
  await Promise.all(
    inputData.map(async (input, index) => {
      const output = await transformer.process(input);
      expect(output).toEqual(expectedData[index]);
    })
  );
});
