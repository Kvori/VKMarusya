# The project is implemented using the ```React``` framework and the ```Vite``` compiler.

### Description of behavior:

The main page of the application is a convenient dashboard where users can select a random movie and view a list of top movies by IMDb rating.

On a separate page, the user can view a list of existing movie genres, select one of them and go to the page with movies that belong to it.

When clicking on a movie card, the user is taken to its page. It contains a detailed description of the film, a button for viewing the trailer and a button for adding the movie to favorites or removing it from this list.

The function of adding a movie to favorites is available only for authorized users. The authorization form is called up by clicking the "Login" button in the site header or by trying to add a movie to favorites (if the user is not yet authorized). In addition, after authorization, the user has access to the account page with personal information and a list of movies that he has added to favorites.

The user also has access to the function of searching for a movie by title, which can be used by clicking on the search field in the navigation section.

A special feature of the application is the ability to select a random movie. This can be done on the main page by clicking on the button next to the "Favorites" section.

## Usage

To run in development mode, you must enter the command ```npm run dev```.

For product assembly, you need to enter the command ```npm run build```. The assembled project will be located in the repository in the folder ```dist```.