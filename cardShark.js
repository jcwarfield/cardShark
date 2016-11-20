var cardShark = {

  card: function (rank, suit) {
    this.rank = rank;
    this.suit = suit;
  },

  ranks: new Array("Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"),

  suits: new Array("Clubs", "Diamonds", "Hearts", "Spades"),

  deck: new Array(52),

  createDeck: function() {

    document.getElementById("create-deck").disabled = false;
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

    document.getElementById("create-deck").disabled = true;
    document.getElementById("deal-card").disabled = true;

    var i, j, k, temp;
    for (i = 0; i < this.deck.length; i++) {
      for (j = 0; j < this.deck.length; j++) {
        k = Math.floor(Math.random() * this.deck.length);
        temp = this.deck[j];
        this.deck[j] = this.deck[k];
        this.deck[k] = temp;
      }
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
    document.createElement("hr");
  },

  dealCard: function() {

    var span = document.createElement("span");

    if (this.deck.length > 0) {
      var cardDealt = document.createTextNode(this.deck[0].rank + " of " + this.deck[0].suit);
      span.appendChild(cardDealt);
      var currentDiv = document.getElementById("deal-results");
      currentDiv.appendChild(span);
      document.getElementById("deal-card").disabled = true;
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