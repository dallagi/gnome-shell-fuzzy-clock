/* eslint-disable no-undef */
const Lang = imports.lang
const Main = imports.ui.main
const ExtensionUtils = imports.misc.extensionUtils;
const Gettext = imports.gettext
/* eslint-enable no-undef */

const myUuid = 'Fuzzy_Clock@dallagi'
const Me = ExtensionUtils.getCurrentExtension();

Gettext.textdomain(myUuid)
const _ = Gettext.gettext

const FuzzyTime = Me.imports.lib.fuzzyTime.FuzzyTime;

class FuzzyClock {
  constructor () {
    this.clockLabel = this._clockLabel()
  }

  enable () {
    this.signalID = this.clockLabel.connect('notify::text', Lang.bind(this, this.setText))
    this.setText()
  }

  disable () {
    this.clockLabel.disconnect(this.signalID)
    this.clockLabel.set_text(this.originalText)
  }

  setText () {
    const currentText = this.clockLabel.get_text()
    const fuzzyTime = new FuzzyTime(_).toString()
    if (fuzzyTime === currentText) {
        return
    }

    global.log('Changing time to fuzzy...')
    this.originalText = currentText
    this.clockLabel.set_text(fuzzyTime)
  }

  _clockLabel() {
    let statusArea = Main.panel.statusArea
    return statusArea.dateMenu.label_actor
  }
}

function init (meta) { // eslint-disable-line no-unused-vars
  const localeDir = meta.dir.get_child('locale')
  global.log(myUuid + ' localeDir: ' + localeDir.get_path())
  Gettext.bindtextdomain(myUuid, localeDir.get_path())

  return new FuzzyClock()
}
