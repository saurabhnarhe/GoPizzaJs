const { getPrice } = require("../pizzaBillCalculator");

describe("Pizza Bill Calculator", () => {
  it("should return 0 for no order", () => {
    const menu = {
      pizzas: {},
    };
    expect(getPrice(menu, "")).toBe(0);
  });

  it("should return price of pizza from menu", () => {
    const menu = {
      pizzas: {
        "Chicken Supreme": 50,
      },
    };
    expect(getPrice(menu, "Chicken Supreme")).toBe(50);
  });

  it("should return total price with added toppings", () => {
    const menu = {
      pizzas: {
        "Chicken Supreme": 19.99,
      },
      toppings: {
        Cheese: 1.0,
        Tomato: 1.5,
      },
    };
    expect(getPrice(menu, "Chicken Supreme, Tomato, Cheese")).toBe(
      19.99 + 1.5 + 1.0
    );
  });

  it("should return total price with added extra breads", () => {
    const menu = {
      pizzas: {
        "Chicken Supreme": 19.99,
      },
      breads: {
        "Thin Crust": 15.0,
      },
    };
    expect(getPrice(menu, "Chicken Supreme, Thin Crust")).toBe(19.99 + 15.0);
  });

  it("should return total price with removed toppings", () => {
    const menu = {
      pizzas: {
        "Chicken Supreme": 19.99,
      },
      toppings: {
        Cheese: 1.0,
        Tomato: 1.5,
      },
    };
    expect(getPrice(menu, "Chicken Supreme, Cheese, -Tomato")).toBe(
      19.99 + 1.0 - 1.5
    );
  });

  it("should throw exception when trying to remove already removed topping", () => {
    const menu = {
      pizzas: {
        "Chicken Supreme": 19.99,
      },
      toppings: {
        Cheese: 1.0,
        Tomato: 1.5,
      },
      breads: {
        Pan: 10.0,
        "Thin Crust": 20.0,
      },
    };
    expect(() => getPrice(menu, "Chicken Supreme, -Cheese, -Cheese")).toThrow(
      "Can not removed already removed topping."
    );
  });
});
