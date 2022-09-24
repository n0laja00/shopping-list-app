import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shoppingItemService from "../services/shoppingItemService.js";
import * as shoppingListService from "../services/shoppingListService.js"
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

/*Calls function from ../services/shoppingItemService that finds the items in the list.
In addition, we're searching for a list that is the parent of the items in the list to be displayed on the page.
*/
const viewListItems = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const data = {
        items: await shoppingItemService.findListItems(urlParts[2]),
        list: await shoppingListService.findShoppingListById(urlParts[2]),
    };

    return new Response(await renderFile("shoppinglistitemsview.eta", data), responseDetails);
    
};

/*Calls function from ../services/shoppingItemService that creates a new item with the name.
*/
const addItem = async(request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    await shoppingItemService.addShoppingListItem(urlParts[2], name);
    return await requestUtils.redirectTo(`/lists/${urlParts[2]}/items`);
};


/*Calls function from ../services/shoppingItemService that flips the collected status by id.
*/
const collectItem = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingItemService.changeItemCollectedStatus(urlParts[4]);

    return await requestUtils.redirectTo(`/lists/${urlParts[2]}/items`);
};

/*Call function deleteItem from ../services/shoppingItemService that deletes by item ID*/

const deleteItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
  
    await shoppingItemService.deleteItem(urlParts[4]);
  
    return await requestUtils.redirectTo(`/lists/${urlParts[2]}/items`);
  };

export {viewListItems, collectItem, addItem, deleteItem}