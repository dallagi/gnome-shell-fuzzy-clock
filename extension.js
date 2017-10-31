/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 * 
 * @author: <a href="mailto:marco.dallagiacoma@gmail.com">Marco Dallagiacoma</a>
 */ 

const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Main = imports.ui.main;

const my_uuid = "Fuzzy_Clock@dallagi";

const Gettext = imports.gettext;
Gettext.textdomain(my_uuid);
const _ = Gettext.gettext;

var hours_list, hour_names = null; // will initialize later, when gettext will be available

function FuzzyClock() {
    this._init();
}

FuzzyClock.prototype = {
    _init: function() {
        this.statusArea = Main.panel.statusArea;
        this.clockLabel = this.statusArea.dateMenu.actor.label_actor;
    },

    // Run: function() {
    //     this.run = true;
    //     this.on_timeout();
    //     Mainloop.timeout_add(UPDATE_INTERVAL, Lang.bind(this, this.on_timeout));
    // },

    FuzzyHour: function() {
        let now = new Date();
        let hours = now.getHours();
        return hours_list[Math.round(now.getMinutes() / 5)]
            .replace("%0", hour_names[hours >= 12 ? hours - 12 : hours])
            .replace("%1", hour_names[hours +1 >= 12 ? hours +1 -12 : hours +1]);
    },

    setText: function() {
        let currText = this.clockLabel.get_text();
        let fuzzyTime = this.FuzzyHour();
        if (fuzzyTime != currText) {
            global.log("Changing time to fuzzy...");
            this.origText = currText;
            this.clockLabel.set_text(fuzzyTime);
        }
    },

    enable: function() {
        this.signalID = this.clockLabel.connect("notify::text", Lang.bind(this, this.setText));
        this.setText();
    },

    disable: function() {
        this.clockLabel.disconnect(this.signalID);
        this.clockLabel.set_text(this.origText);
    }
}

function init(meta) {
    let localeDir = meta.dir.get_child('locale');
    global.log(my_uuid + " localeDir: " + localeDir.get_path());    
    Gettext.bindtextdomain(my_uuid, localeDir.get_path());

    hours_list = [
        _("%0 o'clock"),
        _("five past %0"),
        _("ten past %0"),
        _("quarter past %0"),
        _("twenty past %0"),
        _("twenty five past %0"),
        _("half past %0"),
        _("twenty five to %1"),
        _("twenty to %1"),
        _("quarter to %1"),
        _("ten to %1"),
        _("five to %1"),
        _("%1 o'clock")
   ];

    hour_names = [
        _("twelve"),
        _("one"),
        _("two"),
        _("three"),
        _("four"),
        _("five"),
        _("six"),
        _("seven"),
        _("eight"),
        _("nine"),
        _("ten"),
        _("eleven"),
        _("twelve")
    ];

    return new FuzzyClock();
}
