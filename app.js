import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listController from "./controllers/listController.js";
import * as listItemController from "./controllers/listItemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});



const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/lists") {
    return await listController.viewListCollection(request);
  } else if (url.pathname === "/lists" && request.method === "POST" ) {
    return await listController.addList(request);
  } 
  else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await listItemController.collectItem(request);
  }
  else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/delete") && request.method === "POST") {
    return await listItemController.deleteItem(request);
  }
  else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await listItemController.addItem(request);
  }   
  else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "GET" ) {
    return await listItemController.viewListItems(request);
  } 
  else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST" ) {
    return await listController.listDeactivate(request);
  } 
  else if (url.pathname.match("/lists/[0-9]+/delete") && request.method === "POST" ) {
    return await listController.deleteList(request);
  } 
  else {
    return await listController.viewListStatistics(request);
  }
};

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

serve(handleRequest, { port: port });