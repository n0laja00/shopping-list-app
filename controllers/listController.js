import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shoppingListService from "../services/shoppingListService.js";
import * as statistics from "../statistics/statistics.js";
import * as shoppingItemService from "../services/shoppingItemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

/*Function calls ../statistics/statistics.js and counts the number of active lists and uncollected items
*/
const viewListStatistics = async (request) => {
  const data = {
    activeLists: await statistics.countActiveLists(),
    uncollectedItems: await statistics.countUncollectedItems(),
    countLists: await statistics.countLists(),
    countItems: await statistics.countItems(),
  };
  return new Response(await renderFile("frontview.eta", data), responseDetails);
};

/*Calls function from ../services/shoppingListService that creates a new list.
*/
const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await shoppingListService.addShoppingList(name);
  return await requestUtils.redirectTo(`/lists`);
};

/*Calls function from ../services/shoppingListService that flips list active status by list id.
*/
const listDeactivate = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await shoppingListService.changeListActiveStatus(urlParts[2]); 
  return await requestUtils.redirectTo(`/lists`);
};

/*Call functions deleteItemWithList from ../services/shoppingItemService that deletes by shopping_list_id
and call deleteList function from ../services/shoppingListService that deletes lists by id.
*/
const deleteList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await shoppingItemService.deleteItemWithList(urlParts[2]), shoppingListService.deleteList(urlParts[2]) ;

  return await requestUtils.redirectTo(`/lists`);
};

/*Calls function from ../services/shoppingListService that shows us all the lists and their attributes.
*/
const viewListCollection = async (request) => {
  const data = {
    lists: await shoppingListService.findAllLists()
  };
  return new Response(await renderFile("shoppinglistsview.eta", data), responseDetails);
};



export { viewListCollection, addList, listDeactivate, deleteList, viewListStatistics};