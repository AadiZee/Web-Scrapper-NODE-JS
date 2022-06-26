A very simple webscrapper created using NODE JS.

The webscrapper is designed to scrape an amazon product page url and check if the price is below a certain range.

If the price falls below a certain amount the scrapper sends and SMS to entered number to notify what is the current price and where to buy the product.

If the price doesn't fall the node js server keeps scrapping the page every 20 seconds currently. And as soon as the price falls below it sends the SMS and stops the
interval and execution.
