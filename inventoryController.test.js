const { inventory, addToInventory } = require('./inventoryController');

beforeEach(() => inventory.set("Cheesecake", 0));

test("Cancels operation for invalid operation", () => {
    expect(() => addToInventory("Cheesecake", "test")).not.toThrow();
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

