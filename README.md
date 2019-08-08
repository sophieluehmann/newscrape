# Newscrape

Newscrape is a web app that lets users view and leave comments on somes strange news. Mongoose and Cheerio are used to scrape news from https://news.sky.com/strangenews

![](StrangeNews.gif)

https://newscrape-uw.herokuapp.com/ (not currently working)

# Teachnologies Used
- express
- express-handlebars
- mongoose
- cheerio
- axios

# How it Works

-  When a user visits the site, the app scrapes stories from a news outlet. 

- Each scraped article is saved to the applications database. The database is hosted at mLab. The database has two collections to store the articles and their notes. 

- Users can save articles and leave notes on them that they are able to revisit later. 

# Project Status 

Some issues still needing to be resolved:
- heroku not working
- handlebars is not functioning properly
    - modal is not populated with correct information
    - notes are populated for each article (shown in console log) but are not appended to modal with text