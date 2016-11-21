var cardShark = {

  init: function() {
    document.getElementById("shuffle-deck").disabled = true;
    document.getElementById("deal-card").disabled = true;
  },

  card: function (rank, suit) {
    this.rank = rank;
    this.suit = suit;
  },

  ranks: new Array("Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"),

  suits: new Array("Clubs", "Diamonds", "Hearts", "Spades"),

  deck: new Array(52),

  createDeck: function() {

    document.getElementById("shuffle-deck").disabled = true;
    document.getElementById("deal-card").disabled = true;

    var span = document.createElement("span");

    var i, j, textNode;
    for (i = 0; i < this.suits.length; i++) {
      for (j = 0; j < this.ranks.length; j++) {
        this.deck[i * this.ranks.length + j] = new this.card(this.ranks[j], this.suits[i]);
        textNode = this.ranks[j] + " of " + this.suits[i];
        if((i + 1) * (j + 1) < 52) {
          textNode = textNode + ", ";
        }
        this.appendResultsElements(span, textNode, "deck-results");
      }
    }
    document.getElementById("create-deck").disabled = true;
    document.getElementById("shuffle-deck").disabled = false;
  },

  shuffleDeck: function() {

    document.getElementById("deal-card").disabled = true;

    var i, j, temp;
    for (i = 0; i < this.deck.length; i++) {
      j = Math.floor(Math.random() * this.deck.length);
      temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }

    this.displayDeck();

    document.getElementById("deal-card").disabled = false;
  },

  displayDeck: function() {

    this.removeChildElements("shuffle-results");
    this.removeChildElements("deal-results");

    var textNode = '';
    var span = document.createElement("span");

    for (var i = 0; i < this.deck.length; i++) {
      textNode = this.deck[i].rank + " of " + this.deck[i].suit;
      if((i + 1) < 52) {
        textNode = textNode + ", ";
      }
      this.appendResultsElements(span, textNode, "shuffle-results");
    }
  },

  dealCard: function() {

    var span = document.createElement("span");

    if (this.deck.length > 0) {
      this.removeChildElements("deal-results");
      var textNode = this.deck[0].rank + " of " + this.deck[0].suit;
      this.appendResultsElements(span, textNode, "deal-results");
    }
    else return null;
  },

  removeChildElements: function(parentNode) {
    var element = document.getElementById(parentNode);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  },

  appendResultsElements: function(parentNode, textNode, resultsArea) {
    parentNode.appendChild(document.createTextNode(textNode));
    var currentDiv = document.getElementById(resultsArea);
    currentDiv.appendChild(parentNode);
  }

};