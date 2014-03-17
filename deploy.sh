#@ECHO OFF

# ** 'pretty' flag
# The pretty flag can be used to prevent minification, variable renaming and
# other optimizations.
#IF [%1] == [pretty] (
# ECHO Parameter Set: %1
# SET CLOSURE_FLAGS=--compiler_flags=--compilation_level="WHITESPACE_ONLY" --compiler_flags="--formatting=PRETTY_PRINT"
# SET GSS_FLAGS=--pretty-print --define pretty
#) ELSE (
# ECHO Using defaults...
# SET CLOSURE_FLAGS=--compiler_flags=--compilation_level="SIMPLE_OPTIMIZATIONS"
# SET GSS_FLAGS=--define compiled
#    )

# ** Closure Javascript Compiler **
# The Closure compiler combines together all of the javascript files necessary
# for the application and minifies
# the file.  If the pretty flag is turned on, the code will be more readable
# and debuggable, but slower to download and execute.
# Compiling Javascript files...

python lib/closure-library/closure/bin/build/closurebuilder.py \
 --root=lib/closure-library/ \
 --root=client/ \
 --namespace="tripbuddy.app" \
 --output_mode=compiled \
 --compiler_jar=bin/closure-compiler.jar \
 --compiler_flags="--angular_pass" \
 --compiler_flags="--language_in=ECMASCRIPT5" \
 --compiler_flags="--formatting=SINGLE_QUOTES" \
 --output_file=src/events_page_script.js

# ** Closure Stylesheet Compiler **
# The Closure Stylesheets compiler combines all of the CSS files together,
# minifies them, and processes any GSS directives.

# Compiling CSS files...
java -jar bin/gss-compiler.jar \
 --output-file src/events_page_style.css \
 client/core/page/page-directive.css \
 client/components/event/list/event-list-directive.css

# Compilation complete.

# appcfg.py --oauth2 update .

# Deployment complete.