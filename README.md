# Fuzzy Clock for Gnome Shell

A human-readable clock for the gnome-shell panel.

![Screenshot](screenshot.jpeg)

Currently tested on Gnome 3.34 only.
Translated to English, Italian, German and Esperanto (read below if you want to contribute a translation).

## Install

This extension can be installed from [the official Gnome Extensions website](https://extensions.gnome.org/extension/202/fuzzy-clock/).

## Develop

Some npm commands are available to make development on this extension easier.

* `npm run test` to run the test suite;
* `npm run lint` and `npm run lint:fix` to run the linter (with optional auto-fixing of errors);
* `npm run pack` to create the extension bundle;
* `npm run install` to install the extension locally (nb: requires a restart of the shell, which can be done via `Alt+F2`, command `r`);
* `npm run logs` to tail the logs of the Gnome shell, useful in case of errors.

## Translate

New translations are very welcome!
If you want to contribute a translation, generate a `.po` file with the translated strings.
You can start from an existing one (e.g., `po/it.po`) as a blueprint.
Then either generate the machine-readable `.mo` file yourself and open a PR, or open an issue with the `.po` file attached.
