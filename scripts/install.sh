#!/bin/bash

# Pack and install the extension locally.

npm run build && \
gnome-extensions install Fuzzy_Clock@dallagi.shell-extension.zip --force && \
echo "Install successful! Now restart the shell (Press 'Alt' + 'F2', then 'r')." || { echo "ERROR: Failed to run 'scripts/install.sh'."; exit 1; }
