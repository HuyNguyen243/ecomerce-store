var CartService = {
  key_storage: () => {
    return "cart_user_" + sessionStorage.getItem("user_id");
  },

  add: (item) => {
    let items = CartService.get();
    if (items) {
      let hasDuplicate = false;
      for (let index = 0; index < items.length; index++) {
        if (items[index].id === item.id) {
          items[index].quantity += item.quantity;
          hasDuplicate = true;
          break;
        }
      }
      if (!hasDuplicate) {
        items.push(item);
      }
    } else {
      items = Array(item);
    }
    CartService.save(items);
  },

  save: (item) => {
    localStorage.setItem(CartService.key_storage(), JSON.stringify(item));
  },

  updateQuantity: (index, quantity) => {
    let items = CartService.get();
    items[index].quantity = quantity;
    CartService.save(items);
  },

  get: () => {
    let storage = [];
    let items = localStorage.getItem(CartService.key_storage());
    if (items === "undefined") {
      CartService.save([]);
    }
    items = localStorage.getItem(CartService.key_storage());
    items = JSON.parse(items);
    if (items) {
      storage = items;
    }
    return storage;
  },
  remove: (index) => {
    let items = CartService.get();
    items.splice(index, 1);
    CartService.save(items);
  },

  empty: () => {
    CartService.save([]);
  },

  getTotalPrice: () => {
    let carts = CartService.get();
    let total = 0;
    if(carts.length >0){
      for (let i = 0; i < carts.length; i++) {
        let price = carts[i].couponPrice > 0 ? carts[i].couponPrice : carts[i].price
        total += price * carts[i].quantity
      }
    }
    return total
  },
};

export default CartService;
