const{LoginPage} = require('./LoginPage');
const{ProductPage} = require('./ProductPage');
const{CheckOutPage} = require('./CheckOutPage');
const{OrderConfirmationPage} = require('./OrderConfirmationPage');

class POManager{

    constructor(page){

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productPage = new ProductPage(this.page);
        this.checkOutPage = new CheckOutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
    }

    getLoginPage(){

        return this.loginPage;
    }

    getProductPage(){

        return this.productPage;
    }

    getCheckOutPage(){

        return this.checkOutPage;
    }

    getOrderConfirmationPage(){

        return this.orderConfirmationPage;
    }

}
module.exports = {POManager};