baldys-tripbuddy
================
Tripbuddy is an HTML5 application for defining, managing and tracking trips.

1. Install Prerequisites
   * Java SDK                              http://www.oracle.com/technetwork/java/javase/downloads/index.html
     java.exe should be on your path.

   * Python 2.7                            http://www.python.org/download/releases/2.7.6/
     python.exe should be on your path.

   * App Engine SDK                        https://developers.google.com/appengine/downloads
     appcfg.py should be on your path.

   * App Engine Project                    https://developers.google.com/appengine/
     https://appengine.google.com/

   Note that the following packages are included in the TripBuddy source:
   * Closure Compiler                /bin/closure-compiler.jar      https://developers.google.com/closure/compiler/
   * Closure Library                 /lib/closure-library/          https://code.google.com/p/closure-stylesheets/
   * Closure Stylesheets Compiler    /bin/gss-compiler.jar          https://code.google.com/p/closure-stylesheets/

2. Deployment:
   * Open a command
   * Run the deploy script (deploy.cmd for Windows, deploy.sh for Mac/Linux), which will:
       * Compile the .js files into src/events_page_script.js
       * Compile the .css files into src/events_page_style.css
       * Deploy the .html files in /client, as well as the files in /src to the server.

3. Third-Party Technologies:

Closure (https://developers.google.com/closure/)
Used for dependency management and javascript compilation/minification.  Also uses the closure stylesheet compiler
to provide constants, conditionals, and other advanced css management tools.

JQuery (http://jquery.com/)
Used for efficient DOM manipulation, and supports other third-party libraries such as ngGrid.

AngularJS (http://www.angularjs.org/)
Provides data and services, as well as custom UI elements and HTML binding via controllers.

UI Boostrap (http://angular-ui.github.io/bootstrap/)
Provides basic UI controls (buttons, dropdowns, accordions, etc.)

UI Router (https://github.com/angular-ui/ui-router/wiki)
Provides state management and dynamic template/controller injection.

ng-grid (http://angular-ui.github.io/ng-grid/)
A rich data grid with grouping, inline editing, etc.
