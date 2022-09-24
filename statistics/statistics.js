import { executeQuery } from "../database/database.js";

/*A function that counts uncollected items
*/
const countUncollectedItems = async () => {
    const result = await executeQuery("SELECT COUNT(collected) FROM shopping_list_items WHERE collected = false;");
    return result.rows;
};
/*A function that counts active lists
*/
const countActiveLists = async () => {
    const result = await executeQuery("SELECT COUNT(active) FROM shopping_lists WHERE active= true; ");
    return result.rows;
};

const countItems = async () => {
    const result = await executeQuery("SELECT COUNT(id) FROM shopping_list_items; ");
    return result.rows;
};
const countLists = async () => {
    const result = await executeQuery("SELECT COUNT(id) FROM shopping_lists;");
    return result.rows;
};


export{countUncollectedItems, countActiveLists, countItems, countLists};

    
