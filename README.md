# shopping-list-app

Author: n0laja00

I'm using javascript with eta, a javascript template engine. Visit eta's official site at: https://eta.js.org/ if you're interested!

This app uses elephant SQL with a connection pool of concurrent connections of 2. 

Deno is the runtime I use to run this web application. Deno can be installed from the Deno installation site: https://deno.land/manual@v1.25.4/getting_started/installation

for windows users, use powershell and run ```irm https://deno.land/install.ps1 | iex``` on powershell. 
![image](https://user-images.githubusercontent.com/73889850/192109397-5e0143c2-00c5-4649-9d4b-82b2f690c077.png)

After pulling this application, you should be able to run the application with the command ```deno run --allow-net --allow-read --allow-env app.js```. It opens on port 7777.

![image](https://user-images.githubusercontent.com/73889850/192109448-1b8260d4-dc05-4392-9492-29cd2e2819c9.png)

Make sure that the app.js is present in the terminal's current directory.

On a successful boot, you'll see the following text:
![image](https://user-images.githubusercontent.com/73889850/192109509-13f7c40d-fdcf-4e17-9e82-21dd7ff9e3ad.png)

After this, you should be able to connect to the localhost and see the following screen.
![image](https://user-images.githubusercontent.com/73889850/192142922-37bd0967-e581-4247-9d93-fa02f605baa8.png)



To see the application in action, visit Heroku at: https://n0laja00-shopping-list-app.herokuapp.com/
