function navPrimary(e, t) {
    function n(e, t) {
        return e.parent().is(s) ? t > c : t + e.outerWidth() > c
    }

    function i(e) {
        var t, i;
        e.is(s) ? t = e : (t = e.find("> ul"), i = t.outerWidth() + e.closest("li").offset().left), e.find(l).addClass(d), t.length && (e.parent().is(s) ? n(e, i) && t.css("marginLeft", c - i) : (n(e, i) && t.css("marginLeft", -(e.outerWidth() + t.outerWidth())), t.css({
            left: e.parent().outerWidth(),
            top: 0
        })), t.addClass("nav__visible"))
    }

    function a(e) {
        e.is(s) ? s.removeClass("nav__visible") : e.each(function() {
            var t = e.find("ul");
            t.removeClass("nav__visible"), jQuery(this).find(l).removeClass(d)
        })
    }
    var o, s = jQuery("#block-system-main-menu > .content > ul.menu"),
        r = s.find("li"),
        l = "> a, > div",
        d = "js-active",
        c = e.width();
    r.find("> ul").each(function() {
        var e = jQuery(this).closest("li");
        jQuery(this).removeClass("menu"), e.addClass("has-submenu")
    }), s.find("> li").find("> ul").each(function() {
        var e = jQuery(this);
        e.css("minWidth", e.parent().width())
    }), r.find(l).click(function(e) {
        e.stopPropagation();
        var t = jQuery(this).closest("li"),
            n = t.closest("ul").find("> li"),
            o = t.find("> ul");
        o.length && (o.hasClass("nav__visible") ? a(t) : (a(n), i(t)))
    }).hover(function() {
        var e = jQuery(this).closest("li"),
            t = e.closest("ul").find("> li"),
            n = e.find("> ul");
        clearTimeout(o), n.length && (a(t), i(e))
    }, function() {
        var e = jQuery(this).closest("li"),
            t = e.find("> ul");
        o = setTimeout(function() {
            t.length && a(e)
        }, 150)
    }), jQuery(".has-submenu").find("> ul").hover(function() {
        clearTimeout(o)
    }, function() {
        var e = jQuery(this).closest("li");
        o = setTimeout(function() {
            a(e)
        }, 150)
    }), jQuery(document).on("click", function(e) {
        a(r)
    }).keyup(function(e) {
        27 == e.keyCode && a(r)
    })
}

$(function () {
    $('.js--mmenu').on('click', function() {
        if ($(this).hasClass('opened')) {
            $(this).removeClass('opened');
            $('#mmenu').slideUp(300);
            $('html, body').removeClass('no-scroll');
            $('.header-top').removeClass('fixed');
        } else {
            $(this).addClass('opened');
            $('#mmenu').slideDown(300);
            $('html, body').addClass('no-scroll');
            $('.header-top').addClass('fixed');
        }
    });

    var e = jQuery(window),
        t = jQuery("html");
    navPrimary(e, t);
});