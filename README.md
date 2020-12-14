# Home App
This is an assignment for IBM to the role as frontend developer at IBM CIC.
I have chosen to develop a react-native app with a noSQL Firebase database.
The reason why I have chosen react-native is the way you can build an application very fast and it as a wide range of useful libraries.
It is also for simple apps an advantage to create a cross-platform app.
I could also have picked Ionic which alot of css and javascript support.
Firebase makes it easy to very fast have a fast and reliable documentbased database. 
The snapshot listeners for getting fast up to date changes makes it very smooth especially when this app is used by multiple users at the same time.

### Running the app
This app can be run by following the installation below or using the APK file to install on your android phone device.
This app has only been tested on Android

### You have to follow below step for setup and installing React Native in your machine.

1. Install NODE.JS and NPM first

2. Second install React Native CLI

3. After that you have to JRE and JDK for mobile app development

4. Furthoremore, Set up Android development environment 

5. Now configure environment variable

6. Insert 

6. Create React Application and Run the app physical and AVD devices.

7. To run the app open a console and run npx react-native start followed by another console running npx react-native run-android 
   or simply use the NPM Scrips "start" and "android"

### Features of this app and how to use them

* Shoppinglist
  * Press the PLUS button to add a new item
  * Input field is used to both write item name and the quantity
  * Using the 123 button or simply writing a colon (:) will separate the two
  * Pressing on an item from the top list will move it to the bottom list separating those you still need to buy from the old items
  * Pressing for a longer time on a item will bring up a menu to edit or delete items
* Calendar
  * To create a new event, pick a date by pressing the dates on the calendar
  * Then press the PLUS button to add a new event on the selected date
  * The input field is as above only difference is that the keyboard will change to numerical when writing a time of day
  * you can write a number like 15.55
  * the dot (.) is auto completed
  * Pressing the events will bring up a menu to edit or delete events
* Drink Counter
  * Fun way to keep track of how many sodas you have taken from the fridge
* Settings
  * Press the specific month to bring up a menu
  * This it only for yourself to make sure how much you owe
  * Change name, this will change your name on events you are creating
  * Log out
  
