const { inventory, addToInventory, getInventory } = require('./inventoryController');
const logger = require('./logger');

jest.mock('./logger', () => ({
    logInfo: jest.fn(),
    logError: jest.fn()
}));

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
});

//  SPIES, STUBS AND MOCKS ARE OBJECTS USED TO MODIFY OR REPLACE PART
//  OF YOUR APPLICATIONS TO EASE OR ENABLE TESTING.
//  SPIES RECORDS THE DATA ASSOCIATED WITH THE FUNCTION WITHOUT INTERFERING
//  IN ITS IMPLEMENTATION.
//  STUBS RECORDS THE DATA ASSOCIATED WITH THE USAGE OF THE FUNCTION AND CHANGE
//  ITS BEHAVIOUR, EITHER BY PROVIDING AN ALTERNATIVE IMPLEMENTATION OR RESPONSE.
//  MOCKS CHANGE THE BEHAVIOUR OF THE FUNCTION BUT INSTEAD OF JUST RECORDING THE 
//  DATA, THEY HAVE THEIR EXPECTATIONS PRE-PROGRAMMED.
//  TOGETHER, ALL THESE THREE ARE KNOWN AS TEST DOUBLES.

describe("logging for addToInventory and getInventory", () => {
    //  THIS IS HOW WE SPY ON THE HELPER FUNCTION THAT WE'RE USING INSIDE OF THE FUNCTION.
    beforeEach(() => {
        inventory.clear();
        //  THIS IS HOW WE USE THE STUBS TO CHANGE THE RESPONSE OF THE FUNCTION
        /*
        YOU COULD REPLACE 
        mockImplementation(() => {
            return { rss: 123456 };
        });

        WITH 

        mockReturnValue({
            return { rss: 123456 };
        );
        */  
        jest.spyOn(process, "memoryUsage").mockImplementation(() => {
            return { rss: 123456 };
        });
    });

    //  THIS IS HOW WE USE THE STUBS TO CHANGE THE RESPONSE OF THE FUNCTION
    /*
    NOTE: IT'S RECOMMENDED NOT TO USE STUBS TOO MUCH. USING IT TOO MUCH WOULD CAUSE YOUR TEST CASES TO LESS RESEMBLE 
    YOUR APP'S BEHAVIOUR.
    */
    beforeAll(() => {
        jest.spyOn(logger, "logInfo").mockImplementation();
    });

    //  TO CLEAR THE MOCKS.
    //  ALT: beforeEach(() => jest.clearAllMocks());
    // afterEach(() => logger.logInfo.mockClear());
    beforeEach(() => jest.clearAllMocks());

    test("valid addToInventory", () => {
        addToInventory("cheesecake", 2);

        expect(logger.logInfo.mock.calls).toHaveLength(1);

        const firstCallArg = logger.logInfo.mock.calls[0];
        const [firstArg, secondArg] = firstCallArg;
        expect(firstArg).toEqual[{ item: 'cheesecake', newQuantity: 2, rss: 123456 }];
        expect(secondArg).toEqual['Items added into the inventory successfully.'];
    });

    /*
    test("invalid addToInventory", () => {
        try {
            addToInventory("cheesecake", "jnsjks");
        } catch (error) {
            // No op
        }

        console.log(logError);
        expect(logError.mock.calls).toHaveLength(1);

        const firstCallArg = logError.mock.calls[0];
        const [firstArg, secondArg] = firstCallArg;

        expect(firstArg).toEqual[{ item: 'cheesecake', newQuantity: 'jnsjks' }];
        expect(secondArg).toEqual['Quantity must be a number'];
    });
    */

    test("getInventory", async () => {
        inventory.set("cheesecake", 2);
        getInventory();

        expect(logger.logInfo.mock.calls).toHaveLength(1);

        const firstCallArg = logger.logInfo.mock.calls[0];
        const [firstArg, secondArg] = firstCallArg;

        expect(firstArg).toEqual[{ contents: {"cheesecake": 2} }];
        expect(secondArg).toEqual['fetched contents successfully'];
    });
});

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