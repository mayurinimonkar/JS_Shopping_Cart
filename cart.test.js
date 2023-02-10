const operations = require("./cart");

let cartOps;
let cart;
beforeEach(() => {
  cartOps = operations();
  cart = cartOps.purchasedItems;
});

describe("add", () => {
  test("should add item to cart using barcode", () => {
    //arrange
    const barcode = "01001";
    //act
    cartOps.add(barcode);
    //assert
    expect(cart).toHaveLength(1);
    expect(cart[0]).toEqual({
      barcode: "01001",
      description: "Apple",
      price: 1.1,
      qty: 1,
    });
  });

  test("should increase the quantity if added using same barcode", () => {
    const barcode = "01001";
    cartOps.add(barcode);
    cartOps.add(barcode);
    expect(cart).toHaveLength(1);
    expect(cart[0].qty).toBe(2);
  });
});

describe("remove", () => {
  test("should remove item from purchasedItems", () => {
    const barcode = "01001";
    cartOps.add(barcode);
    cartOps.remove(barcode);
    expect(cart).toHaveLength(0);
  });

  test("should decrease the quantity if quantity is more than 1", () => {
    const barcode = "01001";
    cartOps.add(barcode);
    cartOps.add(barcode);
    cartOps.remove(barcode);
    expect(cart).toHaveLength(1);
    expect(cart[0].qty).toBe(1);
  });
});

describe("printBill", () => {
  test("should print correct bill", () => {
    const logSpy = jest.spyOn(global.console, "log");
    cartOps.add("01001");
    cartOps.add("02002");
    cartOps.add("02002");
    cartOps.printBill();
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith("1 x Apple @1.1 = 1.1");
    expect(logSpy).toHaveBeenCalledWith("2 x Banana @1.3 = 2.6");
    expect(logSpy).toHaveBeenCalledWith("Total = 3.7");
  });

  test("should print total 0 if no item is present", () => {
    const logSpy = jest.spyOn(global.console, "log");
    cartOps.add("01001");
    cartOps.remove("01001");
    cartOps.printBill();
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Total = 0");
  });
});
