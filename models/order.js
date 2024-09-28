class Order {
    constructor(id, userId, productId, quantity, status) {
      this.id = id;
      this.userId = userId;
      this.productId = productId;
      this.quantity = quantity;
      this.status = status;
    }
  }
  
  module.exports = Order;  