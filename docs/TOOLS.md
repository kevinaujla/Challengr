#Tools

##JSHint
All the options for jshint can be looked at here:
[http://jshint.com/docs/options/](http://jshint.com/docs/options/)
The .jshintrc file defines the settings for linting all the files. 
If you find something that you think does not make sense or could be added 
check out the jshint options docs linked above and come to the team with a specific improvement.

##Prettify
Everyone contributing has to have Prettify installed: 
[Prettify](https://github.com/victorporof/Sublime-HTMLPrettify#using-your-own-jsbeautifyrc-options). 

```
/* beautify preserve:start */ 
YOUR CODE HERE
/* beautify preserve:end */
```

Or

```
/* beautify ignore:start */
YOUR WEIRD NOT JAVASCRIPT STUFF
/* beautify ignore:end */
```

if you have content in your js file which is not javascript and which cannot be prettified.

The options for Prettify are set in the .jsbeautifyrc file. Again if you think there is room for improvement or stuff you want to add check out the documentation and come to the team with specific improvements and what they do.

You can manually run Prettify with Ctrl+Shift+H on Windows or Cmd+Shift+H if you're on a Mac.

Generally it is good to set your global settings for prettify to be the same you use in this project so you get used to it. As soon as you have Prettify installed copy the .jsbeautifyrc file and overwrite the file in SublimeText --> Preferences --> Package Settings --> HTML/CSS/JS Prettify --> Set Prettify Preferences
