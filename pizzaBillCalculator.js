const getPrice = (menu, rawOrder) => {
  const order = buildOrder(rawOrder);
  validate(order);
  return (
    getPizzaPrice(menu.pizzas, order.pizza) +
    getExtrasPrice(menu.toppings, menu.breads, order.extrasToAdd) -
    getExtrasPrice(menu.toppings, menu.breads, order.extrasToRemove)
  );
};

const buildOrder = (rawOrder) => {
  const order = { pizza: "", extrasToAdd: [], extrasToRemove: [] };
  if (rawOrder && rawOrder.length > 0) {
    order.pizza = rawOrder.split(", ")[0];
    const extras = rawOrder.split(", ").slice(1);
    order.extrasToAdd = extras?.filter((topping) => topping[0] !== "-");
    order.extrasToRemove = extras
      ?.filter((extra) => extra[0] === "-")
      .map((extra) => extra.substring(1));
  }
  return order;
};

const validate = (order) => {
  const isRemovingMultipleTimes =
    new Set(order.extrasToRemove).size !== order.extrasToRemove.length;
  if (isRemovingMultipleTimes) {
    throw new Error("Can not removed already removed topping.");
  }
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
