var faker = require("faker");

console.log("=====================");
console.log("WELCOME TO MY SHOP");
console.log("=====================");

for (var i = 0; i < 11; i++){
    console.log(faker.fake("{{commerce.productName}}: ${{commerce.price}}"));
}
