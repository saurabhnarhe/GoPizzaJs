const pizzaBillCalculator = require("./pizzaBillCalculator");
const menu = require("./menu");
const art = require("ascii-art");
const table = require("ascii-art-table");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const displayMenu = async () => {
  let rendered = await art.font("GoPizza", "doom").completed();
  console.log(art.style(rendered, "red", true));
  console.log(art.style("Menu", "bold+green", true));

  const pizzas = [];
  for (const item in menu.pizzas) {
    pizzas.push([` ${item} `, ` ₹${menu.pizzas[item]} `]);
  }
  table.create(
    {
      width: 200,
      data: pizzas,
      bars: "single",
      columns: [
        {
          value: "PizzaName",
          style: "white",
        },
        {
          value: "Price",
          style: "white",
        },
      ],
    },
    (rendered) => {
      console.log(rendered);
    }
  );

  const toppings = [];
  for (const item in menu.toppings) {
    toppings.push([` ${item} `, ` ₹${menu.toppings[item]} `]);
  }
  table.create(
    {
      width: 200,
      data: toppings,
      bars: "single",
      columns: [
        {
          value: "ToppingName",
          style: "white",
        },
        {
          value: "Price",
          style: "white",
        },
      ],
    },
    (rendered) => {
      console.log(rendered);
    }
  );

  const breads = [];
  for (const item in menu.breads) {
    breads.push([` ${item} `, ` ₹${menu.breads[item]} `]);
  }
  table.create(
    {
      width: 200,
      data: breads,
      bars: "single",
      columns: [
        {
          value: "Bread",
          style: "white",
        },
        {
          value: "Price",
          style: "white",
        },
      ],
    },
    (rendered) => {
      console.log(rendered);
    }
  );
};

(async () => {
  await displayMenu();
  readline.question("Enter your order: ", (order) => {
    const price = pizzaBillCalculator.getPrice(menu, order);
    console.log(
      `Total price for your order is ${art.style(`₹${price}`, "green", true)}`
    );
    readline.close();
  });
})();
