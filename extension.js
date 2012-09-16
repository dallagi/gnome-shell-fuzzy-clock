/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 * 
 * @author: <a href="mailto:marco.dallagiacoma@gmail.com">Marco Dallagiacoma</a>
 */ 

const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const Lang = imports.lang;

const Gettext = imports.gettext;
Gettext.textdomain("fuzzyclock");
const _ = Gettext.gettext;

const UPDATE_INTERVAL = 5000;

var hours_list, hour_names = null; // will initialize later, when gettext will be available

function FuzzyClock() {
    this._init();
}

FuzzyClock.prototype = {
    _init: function() {
        this.date_menu = Main.panel._dateMenu;
        this.orig_clock = this.date_menu._clock;
        this.fuzzy_clock = new St.Label();
    },

    Run: function() {
        this.run = true;
        this.on_timeout();
        Mainloop.timeout_add(UPDATE_INTERVAL, Lang.bind(this, this.on_timeout));
    },

    FuzzyHour: function() {
        let now = new Date();
        hours = now.getHours();
        return hours_list[Math.round(now.getMinutes() / 5)]
            .replace("%0", hour_names[hours >= 12 ? hours - 12 : hours])
            .replace("%1", hour_names[hours +1 >= 12 ? hours +1 -12 : hours +1]) ;
    },

    on_timeout: function() {
        this.fuzzy_clock.set_text(this.FuzzyHour());

        return this.run;
    },

    enable: function() {
        this.date_menu.actor.remove_actor(this.orig_clock);
        this.date_menu.actor.add_actor(this.fuzzy_clock);

        this.Run();
    },

    disable: function() {
        this.run = false;

        this.date_menu.actor.remove_actor(this.fuzzy_clock);
        this.date_menu.actor.add_actor(this.orig_clock);
    }
}

function init(meta) {
    let localeDir = meta.dir.get_child('locale');
    global.log("localeDir: " + localeDir.get_path());
    Gettext.bindtextdomain('fuzzyclock', localeDir.get_path());

    hours_list = [
       /* %0 will be replaced with the preceding hour, %1 with
        * the comming hour
        * thanks to the XFCE project for this */
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

