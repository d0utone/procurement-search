var faker = require("faker");
const fs = require("fs");

const DATA_COUNT = 1000000;
const SUPPLIER_COUNT = 38000;
const INDEX_NAME = "requisition-data";

let suppliers = [];
for (let i = 0; i < SUPPLIER_COUNT; i++) {
  suppliers.push(
    faker.company.companyName() + " " + faker.company.companySuffix()
  );
}

let dString = "";
for (let i = 1; i < DATA_COUNT + 1; i++) {
  dString += `{ "index": { "_index": ${INDEX_NAME}, "_id": ${i} } }
${JSON.stringify({
  id: "PO" + String(i).padStart(10, "0"),
  date: faker.date.past(),
  purchase_department: faker.commerce.department(),
  supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
  purchase: faker.commerce.productName(),
  purchase_description: faker.commerce.productDescription(),
  quantity: faker.random.number(16),
  category: faker.commerce.productAdjective(),
  price: faker.random.number(15000),
})}
`;
}

fs.writeFileSync("./fake-data.json", dString);
console.log(DATA_COUNT + " fake orders generated.");
