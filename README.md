# Fuzzy Clock for Gnome Shell

A human-readable clock for the gnome-shell panel.

![Screenshot](screenshot.jpeg)

Translated to English, Italian, German, French and Esperanto (read below if you want to contribute a translation).

## Install

This extension can be installed from [the official Gnome Extensions website](https://extensions.gnome.org/extension/202/fuzzy-clock/).

## Develop

Some npm commands are available to make development on this extension easier.

* `npm run test` to run the test suite;
* `npm run lint` and `npm run lint:fix` to run the linter (with optional auto-fixing of errors);
* `npm run build` to build the extension bundle;
* `npm run install` to install the extension locally (nb: requires a restart of the shell, which can be done via `Alt+F2`, command `r`);
* `npm run logs` to tail the logs of the Gnome shell, useful in case of errors.

## How to contribute Translations

New translations are very welcome!
If you want to contribute a translation, generate a `.po` file with the translated strings.
You can start from an existing one (e.g., `po/it.po`) as a blueprint.
There are great GUI tools for translations, like [Poedit](https://poedit.net/) or the [GNOME Translation Editor](https://wiki.gnome.org/Apps/Gtranslator).

### Some things to watch out for:

`%0` refers to the *current* hour (should therefore be used in strings like `Five past %0`).

`%1` refers to the *next* hour (use it in `Quarter to %1`, for example.)

To generate the machine-readable `.mo` translation files, place the `<lang>.po` file in the `po/` directory and build the extension with:

 ```
 $ npm run build
 ```

Note that `gettext` is required for this command to work.

Once the translations are ready, create a PR with your proposed changes.
