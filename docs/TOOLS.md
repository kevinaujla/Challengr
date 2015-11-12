All the options for jshint can be looked at here:
http://jshint.com/docs/options/
The .jshintrc file defines the settings for linting all the files. 
If you find something that you think does not make sense or could be added 
check out the jshint options docs linked above and come to the team with a specific improvement.

Everyone contributing has to have Prettify installed
https://github.com/victorporof/Sublime-HTMLPrettify#using-your-own-jsbeautifyrc-options
Prettify helps format your (HTML, Javascript, CSS, JSON) code with consistent indenting and good spacing for more readability and consistency of your code. Normally you want to Prettify all of your files before saving and definitely pushing and I will set the prettify_on_save option so all files get prettified when saved. If you do not prettify your files your pull request will not be approved. There are however instances when prettify does something which does not look very good or does not make sense. In those cases put the code snippet which should not be prettified into comments shown below.

/* beautify preserve:start */ 
YOUR CODE HERE
/* beautify preserve:end */

Or

/* beautify ignore:start */
YOUR WEIRD NOT JAVASCRIPT STUFF
/* beautify ignore:end */

if you have content in your js file which is not javascript and which cannot be prettified.

The options for Prettify are set in the .jsbeautifyrc file. Again if you think there is room for improvement or stuff you want to add check out the documentation and come to the team with specific improvements and what they do.

You can manually run Prettify with Ctrl+Shift+H on Windows or Cmd+Shift+H if you're on a Mac.

Generally it is good to set your global settings for prettify to be the same you use in this project so you get used to it. As soon as you have Prettify installed copy the .jsbeautifyrc file and overwrite the file in SublimeText --> Preferences --> Package Settings --> HTML/CSS/JS Prettify --> Set Prettify Preferences
