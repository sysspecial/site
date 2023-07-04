jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $("form.contactForm").submit(function (e) {
    e.preventDefault();

    $(this).find(".alert-size").hide();

    var f = $(this).find(".form-group"),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children("input").each(function () {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;

          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case "email":
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case "checked":
            if (!i.is(":checked")) {
              ferror = ierror = true;
            }
            break;

          case "regexp":
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror
              ? i.attr("data-msg") !== undefined
                ? i.attr("data-msg")
                : "wrong Input"
              : ""
          )
          .show("blind");
      }
    });
    f.children("textarea").each(function () {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;

          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror
              ? i.attr("data-msg") != undefined
                ? i.attr("data-msg")
                : "wrong Input"
              : ""
          )
          .show("blind");
      }
    });
    if (ferror) return false;
    else var data = $(this).serialize();
    var action = $(this).attr("action");

    var _self = $(this);

    $.ajax({
      url: action,

      type: "POST",

      dataType: "json",

      data: data,

      complete: function () {
        _self
          .closest("div")
          .find('button[type="submit"]')
          .removeAttr("disabled");

        _self
          .find(".btn-send")
          .last()
          .after(
            '<div class="alert alert-success alert-size mt-2"><p style="color:green;padding:0;font-size:13px;font-weight:bold;position:relative;">Thanks, your message has been sent!</p></div>'
          );
        _self.closest("div").find("input,textarea").val("");
      },
    });
  });
});
