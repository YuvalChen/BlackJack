var fs = require('fs');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
PORT = 8000;
app.use(bodyParser.json());
app.use(express.static('./Client'));
var usersFileName = './Db/Users.json';
var cards = [];
var sortedCards = [];
var shapes = [];
shapes.push("heart");
shapes.push("rhombus");
shapes.push("leaf");
shapes.push("clover");


app.listen(PORT, function () {
    console.log('Application listening on port ' + PORT)
});

app.get('/getStack', function (req, res) {
    sortedCards = [];
    cards = [];

    for (var i = 1; i <= 13; i++) {
        for (var j = 1; j <= 4; j++) {
            cards.push({"value": i, "shape": shapes[j - 1], "picture": "/Images/" + i + "_" + j + ".png"});
        }
    }
    while (cards.length != 0) {
        var valueRandom = parseInt(Math.random() * cards.length);
        InsertRandomCard(valueRandom);
    }
    // sortedCards = [({"value": 11, "shape": cards[0].shape, "picture": cards[0].picture}),
    //     ({"value": 11, "shape": cards[0].shape, "picture": cards[1].picture}),
    //     ({"value": 11, "shape": cards[0].shape, "picture": cards[2].picture}),
    //     ({"value": 11, "shape": cards[0].shape, "picture": cards[3].picture}),
    //     ({"value": 11, "shape": cards[0].shape, "picture": cards[3].picture}),
    //     ({"value": 11, "shape": cards[0].shape, "picture": cards[2].picture}),
    //     ({"value": 11, "shape": cards[0].shape, "picture": cards[1].picture}),
    //     ({"value": 11, "shape": cards[0].shape, "picture": cards[0].picture})];

    res.send(sortedCards);
});

function InsertRandomCard(valueRandom) {
    var cardToRemove;
    if (cards[valueRandom].value > 10) {
        cardToRemove = ({"value": 10, "shape": cards[valueRandom].shape, "picture": cards[valueRandom].picture});
    }
    else if (cards[valueRandom].value == 1) {
        cardToRemove = ({"value": 11, "shape": cards[valueRandom].shape, "picture": cards[valueRandom].picture});
    }
    else {
        cardToRemove = ({
            "value": cards[valueRandom].value,
            "shape": cards[valueRandom].shape,
            "picture": cards[valueRandom].picture
        });
    }

    sortedCards.push(cardToRemove);
    cards = cards.filter(function (p) {
        return JSON.stringify(p) != JSON.stringify(cards[valueRandom]);
    });
};