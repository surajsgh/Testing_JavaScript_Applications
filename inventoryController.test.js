const { inventory, addToInventory, getInventory } = require('./inventoryController');

beforeEach(() => inventory.clear());
beforeEach(() => inventory.set("Cheesecake", 0));

test("inventory contents", () => {
    inventory
        .set("Cheesecake", 1)
        .set("macarroon", 3)
        .set("croissant", 3)
        .set("eclaire", 7);

    const result = getInventory();

    expect(result).toEqual({
        Cheesecake: 1,
        macarroon: 3,
        croissant: 3,
        eclaire: 7,
        //  CUSTOM MATCHER LOOSELY 
        generatedAt: expect.any(Date)
    });
})

test("returned value", () => {
    //  DETERMINISTIC MATCHER
    const returnedValue = addToInventory("Cheesecake", 2);
    expect(returnedValue).toBe(2);
});

test("Cancels operation for invalid operation", () => {
    //  TEST CASE FAILS WHENEVER IT THROWS AN ERROR
    expect(() => addToInventory("Cheesecake", "test")).toThrow();
    expect(inventory.get("Cheesecake")).toBe(0);
    expect(Array.from(inventory.entries())).toHaveLength(1);

    //  WE USE IT TO MAKE SURE EVERY ASSERTIONS ARE RUNNING
    //  BUT ASSERTIONS COUNTING ISN'T ALWAYS A GOOD STRATEGY 
    //  SO WE USE ANOTHER ALTERNATIVE HERE
    /*
    expect.assertions(2);

    try {
        addToInventory("Cheesecake", "test");
    } catch (error) {
        expect(inventory.get("Cheesecake")).toBe(0);
    }
    expect(Array.from(inventory.entries())).toHaveLength(1);
    */
});