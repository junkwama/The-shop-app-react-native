class Order{
    constructor(id, ordererId, carts, total, orderDate){
        this.id = id;
        this.ordererId = ordererId;
        this.carts = carts;
        this.total = total;
        this.orderDate = orderDate
    }
}

export default Order;