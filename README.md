# search-and-reverse

I used promises to go through two files in parallel and modify a line it found '"' in. If it found a double quote, it reversed the contents of the quotes. It then wrote the updated data to a new file while alternating lines from each dataset.

I created two helper functions to assist me in the reversal of strings and also in checking for the presence of double quotes. I chose promises over callbacks because I wanted to avoid callback hell and think promises along with .then is cleaner.

ES6 introduced generators as another alternative to tackling async functions. I learned about them recently but am yet to use them in projects.

Npm install -> npm start
