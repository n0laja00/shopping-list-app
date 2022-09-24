import { executeQuery } from "../database/database.js";

/*A function that creates a new shopping list.
*/
const addShoppingList = async (name) => {
  await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);", {
    name: name
  });
};
/*A function that finds all lists.
*/
const findAllLists = async () => {
  const result = await executeQuery("SELECT * FROM shopping_lists");
  return result.rows;
};

/*A function that selects a list with this id.
*/
const findShoppingListById = async (id) => {
  const  result = await executeQuery("SELECT * FROM shopping_lists WHERE id=$id", {
    id: id,
  });

  return result.rows;
};

/*A function that flips active status of a list with this id.
*/
const changeListActiveStatus = async (id) => {
  await executeQuery("UPDATE shopping_lists SET active = NOT active WHERE id = $id", {
    id: id,
  });
};

/*A function that deletes a list with this id.
*/
const deleteList = async (id) => {
  await executeQuery("DELETE FROM shopping_lists where id = $id", {
    id: id,
  });
};


export { addShoppingList, deleteList, findAllLists, changeListActiveStatus, findShoppingListById, };
