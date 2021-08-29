const faker = require("faker");

function userSchema(ln) {
  return {
    id: ln + 1,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    address: {
      street: faker.address.streetAddress(),
      suite: "Apt. "+ Math.ceil(Math.random()*1000),
      city: faker.address.city(),
      pincode: faker.address.zipCode(),
      geo: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      }
    },
    phone: faker.phone.phoneNumber(),
    website: faker.internet.domainName() ,
    company: {
      name: faker.company.companyName(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.bs(),
    }
  };
}

function generateUsers(count) {
  let users = [];
  for (let i = 0; i < count; i++) {
    users.push(userSchema(users.length));
  }
  return users;
}

module.exports = generateUsers;
