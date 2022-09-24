import { executeQuery } from "../database/database.js";


/*A function that creates a new item with this name and gives it a specified shopping list id.
*/
const addShoppingListItem = async (id, name) => {
  await executeQuery("INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($id, $name);", {
    id: id,
    name: name,
  });
};

/*A function that flips collected status of the item with this specific id
*/
const changeItemCollectedStatus = async (id) => {
  await executeQuery("UPDATE shopping_list_items SET collected = NOT collected WHERE id = $id", {
    id: id,
  });
};

/*A function that finds items with this specific id. in addition, we're outer joining to get various information from the shopping list itself.
*/
const findListItems = async (id) => {
    const result = await executeQuery("SELECT shopping_list_items.id as id, shopping_list_items.name AS item_name, shopping_list_items.collected AS collected, shopping_list_items.shopping_list_id AS shopping_list_id, shopping_lists.name AS shopping_list from shopping_lists FULL OUTER JOIN shopping_list_items on shopping_lists.id = shopping_list_items.shopping_list_id WHERE shopping_list_id = $id", {
        id: id,
    });
    return result.rows;
};

/*A function that deletes items with this specific id
*/
const deleteItem = async (id) => {
  await executeQuery("DELETE FROM shopping_list_items where id = $id", {
    id: id,
  });
};

/*A function that deletes items with this specific shopping list id
*/
const deleteItemWithList = async (id) => {
  await executeQuery("DELETE FROM shopping_list_items where shopping_list_id = $id", {
    id: id,
  });
};



export { changeItemCollectedStatus, deleteItem, deleteItemWithList, addShoppingListItem, findListItems };