class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(item) {
    this.items.push(item);
  }

  removeAllItemsFromCart() {
    this.items = [];
  }

  removeAnItemFromCart(item) {
    const index = this.items.indexOf(item);
    if(index > -1) {
      this.items.splice(index, 1);
    }
  }
}

module.exports = Cart;