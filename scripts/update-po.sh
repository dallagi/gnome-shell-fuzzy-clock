#!/bin/bash

# Scans the source code for any translatable string
# and updates the po/messages.pot file accordingly.
# The new strings are then merged with all existing translations.

# Check if all necessary commands are available.
if ! command -v xgettext &> /dev/null
then
  echo "ERROR: Could not find xgettext. On Ubuntu based systems, check if the gettext package is installed!"
  exit 1
elif ! command -v msgmerge &> /dev/null
then
  echo "ERROR: Could not find msgmerge. On Ubuntu based systems, check if the gettext package is installed!"
  exit 1
fi

cd po || { echo "ERROR: Could not locate the 'po'directory."; exit 1; }

# Update the template file with the strings from the source tree.
# All preceeding comments starting with 'Translators' will be extracted as well.
xgettext --from-code=UTF-8 --add-comments=Translators \
         --package-name="Fuzzy Clock" --copyright-holder="Marco Dallagiacoma" \
         --output=messages.pot ../lib/fuzzyTime.js || \
{ echo "ERROR: Failed to extract translatable strings."; exit 1; } 

# Then update all *.po files and check if they got fuzzy.
NEED_CHECK=()
for FILE in *.po
do
  # handle the case of no .po files
  [[ -e "$FILE" ]] || { echo "ERROR: No .po files found, exiting."; exit 1; }
  echo -n "Updating '$FILE' "
  msgmerge -U "$FILE" messages.pot || \
  { echo "ERROR: Failed to merge Strings into $FILE."; exit 1; }

  if grep --silent "#, fuzzy" "$FILE"; then
    NEED_CHECK+=("$FILE")
  fi
done

# Check if 'messages.pot' got fuzzy
if grep --silent "#, fuzzy" messages.pot; then
    NEED_CHECK+=("messages.pot")
  fi

if [ ${#NEED_CHECK[@]} != 0 ]; then
  echo "INFO: The following translation files need a look: ${NEED_CHECK[*]}"
  echo "Make sure to remove the 'fuzzy' tag when updating the translation!" 
fi

echo "All done!"
