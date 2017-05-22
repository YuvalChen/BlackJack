var cards = [];
var result;
GetData();
var player = {"sum": 0, "cards": []};
var computer = {"sum": 0, "cards": []};

function GetStack() {
    return axios.get('/getStack');
};

function GetData() {
    axios.all([GetStack()])
        .then(axios.spread(function (acct) {
            cards = acct.data;
            ManageGame();
        }));
};

function ManageGame() {
    InitGame();
    if (player.sum == 21 && computer.sum == 21) {
        result = "Tie!"
    }
    else if (player.sum == 21) {
        result = "Player Won!"
    }
    else if (computer.sum == 21) {
        result = "Computer Won!"
    }
    else {
        $('#TakeCardButton').attr("disabled", false);
        $('#CheckButton').attr("disabled", false);
    }
};

function InitGame() {
    var computerCard = cards.pop();
    var img = document.createElement('img');
    img.src = computerCard.picture;
    document.getElementById("ComputerPictures").appendChild(img);
    computer.sum += computerCard.value;
    computer.cards.push(computerCard);
    $("#ComputerHand").val(computer.sum);

    var playerCard = cards.pop();
    img = document.createElement('img');
    img.src = playerCard.picture;
    document.getElementById("PlayerPictures").appendChild(img);
    player.cards.push(playerCard);
    player.sum += playerCard.value;

    computerCard = cards.pop();
    img = document.createElement('img');
    img.src = computerCard.picture;
    document.getElementById("ComputerPictures").appendChild(img);
    computer.cards.push(computerCard);
    computer.sum += computerCard.value;

    playerCard = cards.pop();
    img = document.createElement('img');
    img.src = playerCard.picture;
    document.getElementById("PlayerPictures").appendChild(img);
    player.cards.push(playerCard);
    player.sum += playerCard.value;
    $("#PlayerHand").val(player.sum);

    if (Disqualified(player)) {
        $("#Result").val("playerLose");
        $('#TakeCardButton').attr("disabled", true);
        $('#CheckButton').attr("disabled", true);
    }
    else
        $("#PlayerHand").val(player.sum);

    if (Disqualified(computer)) {
        $("#Result").val("computerLose");
        $('#TakeCardButton').attr("disabled", true);
        $('#CheckButton').attr("disabled", true);
    }
    else
        $("#computerhand").val(computer.sum);
};

function ComputerTern() {
    $("#ComputerHand").val(computer.sum);
    setTimeout(ComputerMove, 1800);

    while (computer.sum < 17) {
        setTimeout(ComputerMove, 1000);
    }
    CheckWinner();
    $("#Result").val(result);

};

function ComputerMove() {
    var computerCard = cards.pop();
    var img = document.createElement('img');
    img.src = computerCard.picture;
    document.getElementById("ComputerPictures").appendChild(img);
    computer.cards.push(computerCard);
    computer.sum += computerCard.value;
    Disqualified(computer);
    $("#ComputerHand").val(computer.sum);
};


function PlayerTern() {
    var playerCard = cards.pop();
    var img = document.createElement('img');
    img.src = playerCard.picture;
    document.getElementById("PlayerPictures").appendChild(img);
    player.cards.push(playerCard);
    player.sum += playerCard.value;
    if (Disqualified(player)) {
        $("#Result").val("playerLose");
        $('#TakeCardButton').attr("disabled", true);
        $('#CheckButton').attr("disabled", true);
    }
    else
        $("#PlayerHand").val(player.sum);

    $("#PlayerHand").val(player.sum);
}


function Disqualified(hand) {
    if (hand.sum > 21 && !CheckEleven(hand))
        return true;

    return false;
}
function CheckEleven(hand) {
    var shape = "";
    var value = "";
    var flag = false;

    for (var card in hand.cards) {
        if (hand.cards[card].value == 11) {
            flag = true;
            value = hand.cards[card].value;
            shape = hand.cards[card].shape;
            hand.sum -= 10;
            break;
        }
    }

    if (flag) {
        hand.cards = hand.cards.filter(function (el) {
            return el.value !== value && el.shape !== shape;
        });
    }

    return flag;
};

function CheckWinner() {
    if (player.sum > computer.sum)
        result = "You win !";
    else if (player.sum == computer.sum)
        result = "Tie !";
    else
        result = "You lose !";
};