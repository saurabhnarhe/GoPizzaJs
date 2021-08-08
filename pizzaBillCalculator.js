const getPrice = (menu, rawOrder) => {
  const order = rawOrder.split(", ");
  if (order.length > 0) {
    const pizza = order[0];
    const extras = order.slice(1);
    const pizzaPrice = menu.pizzas?.hasOwnProperty(pizza)
      ? menu.pizzas[pizza]
      : 0;
    const extrasPrice = extras?.reduce((totalPrice, extra) => {
      const isTopping = menu.toppings?.hasOwnProperty(extra);
      const isBread = menu.breads?.hasOwnProperty(extra);
      if (isTopping) return totalPrice + menu.toppings[extra];
      else if (isBread) return totalPrice + menu.breads[extra];
      else return totalPrice;
    }, 0);
    return pizzaPrice + extrasPrice;
  }
  return 0;
};

module.exports = { getPrice };
