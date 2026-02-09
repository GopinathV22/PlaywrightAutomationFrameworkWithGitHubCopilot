const base = require('@playwright/test');

exports.customTest = base.test.extend({
 testFixtureDataForOrder : {
    userName : "gopinathv@gmail.com",
    password : "Gopiecom@123",
    productName : "ADIDAS ORIGINAL",
    url : "https://rahulshettyacademy.com/client/#/auth/login"
}

})