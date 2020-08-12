# Code-Quiz

I had a difficult time with this exercise. I was hard on my self over and over.
I re-did my code time and time again. I probably spend over 24hrs creating this code. 

Even though, I believe this code is super long, I decided to roll the dice with how I started. 
I googled, I you-tubed, I read and read and the best experience I am taking from all of this, is I learned a lot of details, which is what kept breaking my code. 

Here is my structure. 

I used bootstrap to help design my layout. 
I used jQuery to help me reduce key stroke. I felt I learned the faster through jQuery than JavaScript for some reason. 

In my HTML, I made 9 rows. 

The Top row (Row-1) with my name and the following (Row-2) with links to my other HW assignments is something I'm just creating, so I just copy and pasted that code, same thing for my footer (Row-9). 

The next 6 rows is what I worked in. 

Row-3, had User Score and Timer

Row-4, 5, 6 & 8, I hid using css to display: none. 

Player starts with Row-6, which is a button simply stating game on and consequence if wrong. 
Once they click Play, is where all of Java Functions come in play. 

JavaScript: 

Started with grapping all ID using jQuery;

Here is where my Code gets fun/funky: 

1st Function, countdown
2nd Function, Start game, which addClass (hide) to the ready button and removeClass to Row 4 where the question will be displayed and Row 5 is also displayed where you must choose an option. 

3rd Function Show question function has majority of the creation of button dynamically. 

4th Function has your answer Functions, where it deducts from the timer and/or add, subtracts from your score depending if you get the answer right.

5th Function goes to the next question. 

I am grabbing all my questions as they where created as an object with each question being an array. 

6th Function is my reset function, where adds and remove Class (Hide) to show you your final score and for you to input your name. 

Finally, have my action functions, where when you click start it starts the game and second is when your submitting your name to store for highscore.

I feel, I went completely differently than how I was supposed to do this assignment, but through all my failures I absorb unknown information, making me comprehend things clearer. 
