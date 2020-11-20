#!/bin/bash

# Script to pack and install the extension locally, mostly for testing purposes.

npm run pack && \
gnome-extensions install Fuzzy_Clock@dallagi.shell-extension.zip --force && \
echo "Now restart the shell (Press 'Alt' + 'F2', then 'r')." || echo "ERROR: Failed to run 'scripts/install.sh'."
# Above error message gets shown if one of the three commands linked with '&&' fails.