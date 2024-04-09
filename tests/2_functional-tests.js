const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);


suite('Functional Tests', function() {
    suite("5 functional get request tests", () => {
        // Viewing one stock: GET request to /api/stock-prices/
        test("Viewing one stock: GET request to /api/stock-prices/", (done) => {
            chai
                .request(server).get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({ stock: "GOOG" })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData.stock, "GOOG")
                    assert.exists(res.body.stockData.price, "GOOG has a price")
                    done()
                })
        })

        // Viewing one stock and liking it: GET request to /api/stock-prices/
        test("Viewing one stock and liking it: GET request to /api/stock-prices/", (done) => {
            chai
                .request(server).get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({ stock: "GOOG", like: true })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData.stock, "GOOG")
                    assert.equal(res.body.stockData.likes, 1)
                    assert.exists(res.body.stockData.price, "GOOG has a price")
                    done()
                })
        })

        // Viewing the same stock and liking it again: GET request to /api/stock-prices/
        test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", (done) => {
            chai
                .request(server).get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({ stock: "GOOG", like: true })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData.stock, "GOOG")
                    assert.equal(res.body.stockData.likes, 1)
                    assert.exists(res.body.stockData.price, "GOOG has a price")
                    done()
                })
        })

        // Viewing two stocks: GET request to /api/stock-prices/
        test("Viewing two stocks: GET request to /api/stock-prices/", (done) => {
            chai
                .request(server).get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({ stock: ["MSFT", "AMZN"] })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData[0].stock, "MSFT")
                    assert.equal(res.body.stockData[1].stock, "AMZN")
                    assert.exists(res.body.stockData[0].price, "MSFT has a price")
                    assert.exists(res.body.stockData[1].price, "AMZN has a price")
                    done()
                })
        })

        // Viewing two stocks and liking them: GET request to /api/stock-prices/
        test("Viewing two stocks and liking them: GET request to /api/stock-prices/", (done) => {
            chai
                .request(server).get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({ stock: ["MSFT", "AMZN"] })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData[0].stock, "MSFT")
                    assert.equal(res.body.stockData[1].stock, "AMZN")
                    assert.exists(res.body.stockData[0].price, "MSFT has a price")
                    assert.exists(res.body.stockData[1].price, "AMZN has a price")
                    assert.exists(res.body.stockData[0].rel_likes, "has rel_likes")
                    assert.exists(res.body.stockData[1].rel_likes, "has rel_likes")
                    done()
                })
        })

    })
});
