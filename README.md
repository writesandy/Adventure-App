# IMPORTANT: HOW TO WORK ON THE CODE
***Please do all your work on the develop branch, and then merge those changes into master***
1. git checkout develop
2. git pull 
3. Make your changes where you need them
4. Git add (the files you edited) 
5. Git commit -m "your commit message" 
6. git push 

***If your change is good to go into master branch***
7. git checkout master 
8. git merge develop 
(This takes any changes from DEVELOP and merges them IN TO master) 

***If you accidentally make changes to master, please pull them back to dev***
1. git checkout develop
2. git merge master 
(This takes any changes from MASTER and merges them BACK TO develop)

# GroupProject Recipe App
This is our Recipe and Allergen/Dietery Preference App. 
Saundra Rikki Brandon Joe Thomas

Our Project:
Enter your Food Ingredients
Nutritional analysis of the meal
Choose the recipe you want
We will display: Recipe,
Glycemic Index, Calorie Count

**Enter your ingredients** We have UI layouts sketched out for this. 
Including Dietary Exclusions
Include Calories requirements
Recipes are generated within your parameters 

Stretch Goals:
Sign in with Facebook/Google 
Display the map for buying more ingredients
Link to Amazon Pantry for online
Share on Social Media
Choose MainCourse/Dessert/Snacks
Complexity of the Recipe
barcode scanner
picture of reciept to itemize items into your pantry

Our APIs:
https://developer.edamam.com/edamam-nutrition-api
https://developer.edamam.com/edamam-recipe-api


**Task Breakdown:**

Project Management/Information Architecture: Saundra, Brandon

Front End Captain: Thom
Bootstrap
Shoelace to structure the layout: http://shoelace.io/
Codepen.io for animation and titles


WireFrame/Layout: Rikki/Thom
User Interface Design: 
User Inputs: Rikki 
Content Writing: Rikki & Saundra

Back End Captain: Joe
Javascript: Joe
Ajax: 
API Research: Saundra, Joe
Database:
 
Local Storage to save the recipes for the user

Debugging: ALL 

Rough Sketch of our outline - mobile-first
