/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 *
 * @author: <a href="mailto:marco.dallagiacoma@gmail.com">Marco Dallagiacoma</a>
 */

/* eslint-disable no-undef */
const Lang = imports.lang
const Main = imports.ui.main

const Gettext = imports.gettext
/* eslint-enable no-undef */

const myUuid = 'Fuzzy_Clock@dallagi'

Gettext.textdomain(myUuid)
const _ = Gettext.gettext

var hoursList; var hourNames = null // will initialize later, when gettext will be available

class FuzzyClock {
  constructor () {
    this.statusArea = Main.panel.statusArea
    this.clockLabel = this.statusArea.dateMenu.actor.label_actor
  }

  enable () {
    this.signalID = this.clockLabel.connect('notify::text', Lang.bind(this, this.setText))
    this.setText()
  }

  disable () {
    this.clockLabel.disconnect(this.signalID)
    this.clockLabel.set_text(this.origText)
  }

  setText () {
    const currText = this.clockLabel.get_text()
    const fuzzyTime = this.FuzzyHour()
    if (fuzzyTime !== currText) {
      global.log('Changing time to fuzzy...')
      this.origText = currText
      this.clockLabel.set_text(fuzzyTime)
    }
  }

  FuzzyHour () {
    const now = new Date()
    const hours = now.getHours()
    return hoursList[Math.round(now.getMinutes() / 5)]
      .replace('%0', hourNames[hours >= 12 ? hours - 12 : hours])
      .replace('%1', hourNames[hours + 1 >= 12 ? hours + 1 - 12 : hours + 1])
  }
}

function init (meta) { // eslint-disable-line no-unused-vars
  const localeDir = meta.dir.get_child('locale')
  global.log(myUuid + ' localeDir: ' + localeDir.get_path())
  Gettext.bindtextdomain(myUuid, localeDir.get_path())

  hoursList = [
    _("%0 o'clock"),
    _('five past %0'),
    _('ten past %0'),
    _('quarter past %0'),
    _('twenty past %0'),
    _('twenty five past %0'),
    _('half past %0'),
    _('twenty five to %1'),
    _('twenty to %1'),
    _('quarter to %1'),
    _('ten to %1'),
    _('five to %1'),
    _("%1 o'clock")
  ]

  hourNames = [
    _('twelve'),
    _('one'),
    _('two'),
    _('three'),
    _('four'),
    _('five'),
    _('six'),
    _('seven'),
    _('eight'),
    _('nine'),
    _('ten'),
    _('eleven'),
    _('twelve')
  ]

  return new FuzzyClock()
}
