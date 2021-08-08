const getPrice = (menu, rawOrder) => {
  const order = buildOrder(rawOrder);
  return (
    getPizzaPrice(menu.pizzas, order.pizza) +
    getExtrasPrice(menu.toppings, menu.breads, order.extras)
  );
};

const buildOrder = (rawOrder) => {
  const order = { pizza: "", extras: [] };
  if (rawOrder && rawOrder.length > 0) {
    order.pizza = rawOrder.split(", ")[0];
    order.extras = rawOrder.split(", ").slice(1);
  }
  return order;
};

const getPizzaPrice = (availablePizzas, pizzaOrder) => {
  return availablePizzas?.hasOwnProperty(pizzaOrder)
    ? availablePizzas[pizzaOrder]
    : 0;
};

const getExtrasPrice = (availableToppings, availableBreads, extrasOrder) => {
  return extrasOrder?.reduce((totalPrice, extra) => {
    const isTopping = availableToppings?.hasOwnProperty(extra);
    const isBread = availableBreads?.hasOwnProperty(extra);
    if (isTopping) return totalPrice + availableToppings[extra];
    else if (isBread) return totalPrice + availableBreads[extra];
    else return totalPrice;
  }, 0);
};

module.exports = { getPrice };
