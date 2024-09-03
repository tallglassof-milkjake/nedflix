# nedflix
- Use the searchbar to look up movies
- Use the `X` icon to clear your search
- Set the year range filter to refine search results. Applies to existing results and to new searches
- Use the type selection to further refine your search by type
- Searching will return an immediate list of 10 to 20 results. If the total search results exceeds that number, scrolling down on the search results will trigger a fetch to return the next page of results from the OMDB API
- Once you've selected a movie or series from the search results list you can see it's full information displayed
- If that item is a series it will display a horizontally scrollable list of seasons that can be clicked and that will then populate the list on the left with the episodes of that selected season
- In the window with the full information you can click the `wishlist` button in the top right to save it to your watchlist using localStorage
- Then to the left of the search bar is a bookmark icon, if you click this it will return the list of wishlist items
- As an added extra I included a sorting option in the top right of the search results list. Click it and you can sort search items by the following;
  - `A-z` Alphabetical order, click again to sort into reverse-alphabetical
  - `Year` Year ascending order, click again to sort by year descending

## Install
1. Pull the repo
2. Create a `.env` file and apply the omdb API key as `VITE_OMDB_API_KEY = [your key]`
3. Run `npm install` at root level
4. Run `npm run dev` and go to localhost:5173 in the browser
