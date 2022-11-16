//app
$(document).on("click", "._do", async function(event) {
    event.preventDefault();
    if ($(this).hasClass("no-prop")) {
        event.stopPropagation();
    }
    var target = $(this).data("do") + '';
    //console.log(target);

    if (isNa(target)) {
        console.log("_do", "Undefined target");
        return false;
    }
    target = target.trim();

    return triggerDo(target);
});

$(document).on("click", "._open", async function(event) {
    event.preventDefault();
    if ($(this).hasClass("no-prop")) {
        event.stopPropagation();
    }
    var target = $(this).data("open") + '';
    //console.log(target);

    if (isNa(target)) {
        console.log("_open", "Undefined target");
        return false;
    }
    target = target.trim();

    return openPanel(target); //true slick true push_state
});

$(document).on("click", "._trigger", async function(event) {
    event.preventDefault();
    if ($(this).hasClass("no-prop")) {
        event.stopPropagation();
    }
    var path = $(this).data("path");
    var index = $(this).data("index");

    console.log(path, index);

    if (isNa(index)) {
        console.info("_trigger", "Undefined index");
    }
    if (isNa(path)) {
        console.info("_trigger", "Undefined path");
    }

    if (!isNa(index)) {
        if (!isNa(path)) {
            return triggerSlide(path, index);
        }

        path = $(this).parents('.presentation').data("path");
        if (isNa(path)) {
            return showWarr('No path in trigger', path);
        }
        return triggerSlide(path, index);
    }
    if (!isNa(path)) {
        return triggerPresentation(path);
    }
    return showWarr('No path or index in trigger', path, index);
});



//global array for back stepping
var global_back_steps = new Array('_panel_library');

async function openPanel(target) {
    if (isNa(target)) {
        console.log("openPanel", "Undefined target");
        return false;
    }
    //
    if (target == "_panel_back") {
        var _target = '_panel_library';
        if (global_back_steps.length > 1) {
            _target = global_back_steps[(global_back_steps.length - 2)];
            global_back_steps.pop();
        }
        return openPanel(_target);
    } else if (target == "_panel_close") {
        return openPanel('_panel_library');
    }
    //
    //remove all class with _ leading
    $("body").removeClass(function(index, css) {
        var replace = target + "\\d";
        var re = new RegExp(replace, "g");
        return (css.match(/\b\_\S+/g) || []).join(' ').replace(re, '').trim(); // removes anything that starts with "_"
    });

    //add target
    $("body").addClass(target);
    if (global_back_steps.length && global_back_steps[global_back_steps.length - 1] !== target) {
        global_back_steps.push(target);
    }
    if (global_back_steps.length > 3) {
        global_back_steps.shift();
    }
    //console.log(global_back_steps);
}

function isNa(target) {
    if (target === undefined || target === 'undefined' || target === '' || target === null) {
        return true
    }
    return false;
}