
/*A simple redirect function to a path.
*/
const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
        "Location": path,
      },
    });
  };
  
  export { redirectTo };