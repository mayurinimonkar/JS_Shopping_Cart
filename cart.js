const Items = require("./constants");

function operations() {
  const purchasedItems = [];
  function add(barcode) {
    //if item is purchased, increase the quantity, else add item to purchasedItems
    const item = Items.find((e) => e.barcode === barcode);
    itemPurchased = purchasedItems.find((e) => e.barcode == barcode);
    if (itemPurchased) {
      itemPurchased.qty += 1;
    } else {
      purchasedItems.push({ ...item, qty: 1 });
    }
  }

  function remove(barcode) {
    //if item quantity is more than 1, decrease the quantity, else remove item from purchasedItems
    itemPurchased = purchasedItems.find((e) => e.barcode == barcode);
    if (itemPurchased.qty > 1) {
      itemPurchased.qty -= 1;
    } else {
      purchasedItems.splice(Items.indexOf(itemPurchased), 1);
    }
  }

  function printBill() {
    //print the bill
    let total = 0;
    if(purchasedItems.length>0){
        purchasedItems.map((item) => {
            const totalForItem = item.price * item.qty;
            console.log(
              `${item.qty} x ${item.description} @${item.price} = ${totalForItem}`
            );
            total += totalForItem;
          });
    }
   
    console.log(`Total = ${total}`);
  }

  return {
    purchasedItems,
    add,
    remove,
    printBill,
  };
}
// const cart1 = operations();
// cart1.add("01001")
// cart1.add("01001")
// cart1.remove("01001")
// cart1.add("02002")
// cart1.add("02002")
// console.log(cart1.purchasedItems)
//  cart1.printBill()
module.exports = operations;
