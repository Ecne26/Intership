class Product {
    name;
    price;
    discountDay;
    discountPrice;

    constructor (name, price, discountDay, discountPrice) {
        this.name = name;
        this.price = price;
        this.discountDay = discountDay;
        this.discountPrice = discountPrice;
    }

    showInfo () {
        console.log("Info about product here.");
    }
}

class Milk extends Product {
    showInfo () {
        console.log("It is milk");
    }
}

class Potato extends Product {
    constructor (name, price, discountDay, discountPrice, countryFrom) {
        super(name, price, discountDay, discountPrice)
        this.countryFrom = countryFrom;
    }

    showInfo () {
        console.log(`Potato is from ${this.countryFrom}`);
    }
}

class Tomato extends Potato {
    constructor (name, price, discountDay, discountPrice, countryFrom, color) {
        super(name, price, discountDay, discountPrice, countryFrom)
        this.color = color;
    }

    showInfo () {
        console.log(`Tomato has ${this.color} color`);
    }
}

const potato = new Potato("Potato", 15, 1, 10, "Ukraine");
const tomato = new Tomato("Tomato", 25, 0, 12, "South America", "Red");
const milk = new Milk("Milk", 20, 3, 15);

class ProductBuyer {
    #money = 35;

    constructor (products) {
        this.products = products;
    }
    
    buyThings () {
        const today = new Date();

        new Promise ((res, rej) => {
            this.products.forEach(element => {
                if (today.getDay() === element.discountDay) {
                    element.price = element.discountPrice;
                }
            })
            res();
        }).finally(() => {
            for (let i = 0; i < this.products.length; i++) {
                if (this.#money - this.products[i].price >= 0) {
                    this.#money = this.#money - this.products[i].price;
                    console.log(`${this.products[i].name} bought! Money left: ${this.#money}`);
                } else {
                    continue;
                }
            }
        })
    }
}

const customer = new ProductBuyer([potato, tomato, milk]);
customer.buyThings();

[potato, tomato, milk].forEach(item => { item.showInfo() });