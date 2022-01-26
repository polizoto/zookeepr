const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "jhgdja3ng2" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "3",
      name: "Erica",
      age: 22,
      favoriteAnimal: "hedgehog",
    },
    {
        id: "6",
        name: "Jason",
        age: 32,
        favoriteAnimal: "polar bear",
    },
  ];

  const updatedZookeepers = filterByQuery({ favoriteAnimal: "hedgehog" }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
        id: "3",
        name: "Erica",
        age: 22,
        favoriteAnimal: "hedgehog",
      },
      {
          id: "6",
          name: "Jason",
          age: 32,
          favoriteAnimal: "polar bear",
      },
  ];

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Erica");
});

test("validates personality traits", () => {
  const zookeeper = {
    id: "3",
    name: "Erica",
    age: 22,
    favoriteAnimal: "hedgehog",
  };

  const invalidZookeeper = {
    id: "6",
    name: "Jason",
    age: 32,
};

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});