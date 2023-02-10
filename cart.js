import { Items } from "./constants";

function operations(){
    let purchasedItems = [];
    function add(barcode){
        const item = Items.find((e)=> e.barcode === barcode)
        itemPurchased= purchasedItems.find((e)=>e.barcode == barcode)
        if(itemPurchased){
            itemPurchased.qty += 1;
        }else{
              purchasedItems.push({...item, qty:1}) 
        }
        
    }

    function remove(barcode){
        itemPurchased= purchasedItems.find((e)=>e.barcode == barcode)
        if(itemPurchased.qty >1 ){
            itemPurchased.qty -= 1;
        }else{
            purchasedItems = purchasedItems.filter((element)=>element.barcode !== barcode);
        }
        }
        

    function printBill(){
        let total = 0;
        purchasedItems.map((item)=>{
            const totalForItem =  item.price * item.qty;
          console.log(`${item.qty} x ${item.description} @${item.price} = ${totalForItem}`)
          total += totalForItem;
        })
        console.log(`Total = ${total}`)
    }

    return {
        purchasedItems, add, remove, printBill
    }

}
// const cart1 = operations();
// cart1.add("01001")
// cart1.add("01001")
// cart1.add("01001")
// cart1.remove("01001")
// cart1.printBill()

