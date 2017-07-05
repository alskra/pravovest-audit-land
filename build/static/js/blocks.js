var $screenSm = 768, $screenMd = 1024, $screenLg = 1230;

var $fontSizeRoot = 16, $fontSizeRootComputed = parseInt($('html').css('fontSize'));

var $screenSmMin = $screenSm/$fontSizeRoot + 'em'; console.log('$screenSmMin = ' + $screenSmMin + ' (' + $screenSm + 'px)');
var $screenMdMin = $screenMd/$fontSizeRoot + 'em'; console.log('$screenMdMin = ' + $screenMdMin + ' (' + $screenMd + 'px)');
var $screenLgMin = $screenLg/$fontSizeRoot + 'em'; console.log('$screenLgMin = ' + $screenLgMin + ' (' + $screenLg + 'px)');

var $screenXsMax = ($screenSm - 1)/$fontSizeRoot + 'em'; console.log('$screenXsMax = ' + $screenXsMax);
var $screenSmMax = ($screenMd - 1)/$fontSizeRoot + 'em'; console.log('$screenSmMax = ' + $screenSmMax);
var $screenMdMax = ($screenLg - 1)/$fontSizeRoot + 'em'; console.log('$screenMdMax = ' + $screenMdMax);


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

$(function () {
    $('body').on('click', '.menu__item_submenu>.menu__btn>.menu__icon', function (e) {
        e.preventDefault();
        $('.menu__submenu')
            .not($(this).parent().next('.menu__submenu').toggleClass('opened').toggle().parent().toggleClass('opened').end())
            .not($(this).parents('.menu__submenu'))
            .removeClass('opened').hide().parent().removeClass('opened');
    }).on('click', function (e) {
        if (!$(e.target).closest('.menu__item_submenu>.menu__btn>.menu__icon').length) {
            $('.menu__submenu').removeClass('opened').hide().parent().removeClass('opened');
        }
    }).on('click', '.menu__btn', function (e) {
        var hash = $(this).attr('href'),
        $elem = $('' + hash);
        if ($elem.length) {
            e.preventDefault();
            $('.header__toggle-menu').triggerHandler('click');

            $(this).parent().addClass('menu__item_current').siblings().removeClass('menu__item_current');

            var scrollTop = $elem.offset().top - (Modernizr.mq('(max-width: ' + $screenSmMax + ')') ? $('.header').outerHeight() : 0);
            Modernizr.mq('(max-width: ' + $screenSmMax + ')') ? $('.header').css({'top': scrollTop}) : null;

            $('html, body').animate({'scrollTop': scrollTop},
                Modernizr.mq('(max-width: ' + $screenSmMax + ')') ? 0 : 300, 'linear', function () {
                //$('.header').css({'top': ''});
                location.hash = hash;
            });
        }
    });

    $(window).on('scroll.Menu', function () {
        var $curr = $('.menu__btn_lvl_1:first');
        var pos = $(this).scrollTop() + $('.header').outerHeight();
        $('.section[id]').each(function () {
            if (pos >= $(this).offset().top) {
                $curr = $('[href$="#' + $(this).attr('id') + '"]');
            }
        });
        if ($curr.length) {
            $curr.parent().addClass('menu__item_current').siblings().removeClass('menu__item_current');
            //location.hash = $curr.attr('href');
        }
        //console.log($curr.attr('href'));
    }).triggerHandler('scroll.Menu');
});

$.fancybox.defaults.hash = false;

$(function () {
    $("[data-fancybox--single]").fancybox({
        smallBtn : false,
        autoFocus : false,
        btnTpl : {
            slideShow  : '<button data-fancybox-play class="fancybox-button fancybox-button--play hide" title="{{PLAY_START}}"></button>',
            fullScreen : '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen hide" title="{{FULL_SCREEN}}"></button>',
            thumbs     : '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs hide" title="{{THUMBS}}"></button>',
            close      : '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',

            // This small close button will be appended to your html/inline/ajax content by default,
            // if "smallBtn" option is not set to false
            smallBtn   : '<button data-fancybox-close class="fancybox-close-small glyphicon glyphicon-close-2" title="{{CLOSE}}"></button>'
        },
        keyboard: false,
        arrows: false,
        touch: false,
        onInit: function () {

        },
        beforeClose: function () {

        }
    });

    var url;
    $("[data-fancybox--group]").fancybox({
        smallBtn : false,
        autoFocus : false,
        btnTpl : {
            slideShow  : '<button data-fancybox-play class="fancybox-button fancybox-button--play hide" title="{{PLAY_START}}"></button>',
            fullScreen : '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen hide" title="{{FULL_SCREEN}}"></button>',
            thumbs     : '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs hide" title="{{THUMBS}}"></button>',
            close      : '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',

            // This small close button will be appended to your html/inline/ajax content by default,
            // if "smallBtn" option is not set to false
            smallBtn   : '<button data-fancybox-close class="fancybox-close-small glyphicon glyphicon-close-2" title="{{CLOSE}}"></button>'
        },
        touch: false,
        onInit: function () {

        },
        beforeClose: function () {

        },
        afterClose: function () {

        }
    });

    $("[data-fancybox--gallery]").fancybox({
        smallBtn : false,
        autoFocus : false,
        btnTpl : {
            slideShow  : '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
            fullScreen : '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
            thumbs     : '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
            close      : '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',

            // This small close button will be appended to your html/inline/ajax content by default,
            // if "smallBtn" option is not set to false
            smallBtn   : '<button data-fancybox-close class="fancybox-close-small glyphicon glyphicon-close-2" title="{{CLOSE}}"></button>'
        },
        onInit: function () {

        },
        beforeClose: function () {

        }
    });

    $('body').on('click', '[data-toggle="history-view"]', function () {
        $('[data-fancybox="history?1"]').eq(0).click();
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwicG9wdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmxvY2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyICRzY3JlZW5TbSA9IDc2OCwgJHNjcmVlbk1kID0gMTAyNCwgJHNjcmVlbkxnID0gMTIzMDtcblxudmFyICRmb250U2l6ZVJvb3QgPSAxNiwgJGZvbnRTaXplUm9vdENvbXB1dGVkID0gcGFyc2VJbnQoJCgnaHRtbCcpLmNzcygnZm9udFNpemUnKSk7XG5cbnZhciAkc2NyZWVuU21NaW4gPSAkc2NyZWVuU20vJGZvbnRTaXplUm9vdCArICdlbSc7IGNvbnNvbGUubG9nKCckc2NyZWVuU21NaW4gPSAnICsgJHNjcmVlblNtTWluICsgJyAoJyArICRzY3JlZW5TbSArICdweCknKTtcbnZhciAkc2NyZWVuTWRNaW4gPSAkc2NyZWVuTWQvJGZvbnRTaXplUm9vdCArICdlbSc7IGNvbnNvbGUubG9nKCckc2NyZWVuTWRNaW4gPSAnICsgJHNjcmVlbk1kTWluICsgJyAoJyArICRzY3JlZW5NZCArICdweCknKTtcbnZhciAkc2NyZWVuTGdNaW4gPSAkc2NyZWVuTGcvJGZvbnRTaXplUm9vdCArICdlbSc7IGNvbnNvbGUubG9nKCckc2NyZWVuTGdNaW4gPSAnICsgJHNjcmVlbkxnTWluICsgJyAoJyArICRzY3JlZW5MZyArICdweCknKTtcblxudmFyICRzY3JlZW5Yc01heCA9ICgkc2NyZWVuU20gLSAxKS8kZm9udFNpemVSb290ICsgJ2VtJzsgY29uc29sZS5sb2coJyRzY3JlZW5Yc01heCA9ICcgKyAkc2NyZWVuWHNNYXgpO1xudmFyICRzY3JlZW5TbU1heCA9ICgkc2NyZWVuTWQgLSAxKS8kZm9udFNpemVSb290ICsgJ2VtJzsgY29uc29sZS5sb2coJyRzY3JlZW5TbU1heCA9ICcgKyAkc2NyZWVuU21NYXgpO1xudmFyICRzY3JlZW5NZE1heCA9ICgkc2NyZWVuTGcgLSAxKS8kZm9udFNpemVSb290ICsgJ2VtJzsgY29uc29sZS5sb2coJyRzY3JlZW5NZE1heCA9ICcgKyAkc2NyZWVuTWRNYXgpO1xuIiwiZnVuY3Rpb24gbmF2UHJpbWFyeShlLCB0KSB7XG4gICAgZnVuY3Rpb24gbihlLCB0KSB7XG4gICAgICAgIHJldHVybiBlLnBhcmVudCgpLmlzKHMpID8gdCA+IGMgOiB0ICsgZS5vdXRlcldpZHRoKCkgPiBjXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaShlKSB7XG4gICAgICAgIHZhciB0LCBpO1xuICAgICAgICBlLmlzKHMpID8gdCA9IGUgOiAodCA9IGUuZmluZChcIj4gdWxcIiksIGkgPSB0Lm91dGVyV2lkdGgoKSArIGUuY2xvc2VzdChcImxpXCIpLm9mZnNldCgpLmxlZnQpLCBlLmZpbmQobCkuYWRkQ2xhc3MoZCksIHQubGVuZ3RoICYmIChlLnBhcmVudCgpLmlzKHMpID8gbihlLCBpKSAmJiB0LmNzcyhcIm1hcmdpbkxlZnRcIiwgYyAtIGkpIDogKG4oZSwgaSkgJiYgdC5jc3MoXCJtYXJnaW5MZWZ0XCIsIC0oZS5vdXRlcldpZHRoKCkgKyB0Lm91dGVyV2lkdGgoKSkpLCB0LmNzcyh7XG4gICAgICAgICAgICBsZWZ0OiBlLnBhcmVudCgpLm91dGVyV2lkdGgoKSxcbiAgICAgICAgICAgIHRvcDogMFxuICAgICAgICB9KSksIHQuYWRkQ2xhc3MoXCJuYXZfX3Zpc2libGVcIikpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYShlKSB7XG4gICAgICAgIGUuaXMocykgPyBzLnJlbW92ZUNsYXNzKFwibmF2X192aXNpYmxlXCIpIDogZS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHQgPSBlLmZpbmQoXCJ1bFwiKTtcbiAgICAgICAgICAgIHQucmVtb3ZlQ2xhc3MoXCJuYXZfX3Zpc2libGVcIiksIGpRdWVyeSh0aGlzKS5maW5kKGwpLnJlbW92ZUNsYXNzKGQpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHZhciBvLCBzID0galF1ZXJ5KFwiI2Jsb2NrLXN5c3RlbS1tYWluLW1lbnUgPiAuY29udGVudCA+IHVsLm1lbnVcIiksXG4gICAgICAgIHIgPSBzLmZpbmQoXCJsaVwiKSxcbiAgICAgICAgbCA9IFwiPiBhLCA+IGRpdlwiLFxuICAgICAgICBkID0gXCJqcy1hY3RpdmVcIixcbiAgICAgICAgYyA9IGUud2lkdGgoKTtcbiAgICByLmZpbmQoXCI+IHVsXCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlID0galF1ZXJ5KHRoaXMpLmNsb3Nlc3QoXCJsaVwiKTtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnJlbW92ZUNsYXNzKFwibWVudVwiKSwgZS5hZGRDbGFzcyhcImhhcy1zdWJtZW51XCIpXG4gICAgfSksIHMuZmluZChcIj4gbGlcIikuZmluZChcIj4gdWxcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGUgPSBqUXVlcnkodGhpcyk7XG4gICAgICAgIGUuY3NzKFwibWluV2lkdGhcIiwgZS5wYXJlbnQoKS53aWR0aCgpKVxuICAgIH0pLCByLmZpbmQobCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdCA9IGpRdWVyeSh0aGlzKS5jbG9zZXN0KFwibGlcIiksXG4gICAgICAgICAgICBuID0gdC5jbG9zZXN0KFwidWxcIikuZmluZChcIj4gbGlcIiksXG4gICAgICAgICAgICBvID0gdC5maW5kKFwiPiB1bFwiKTtcbiAgICAgICAgby5sZW5ndGggJiYgKG8uaGFzQ2xhc3MoXCJuYXZfX3Zpc2libGVcIikgPyBhKHQpIDogKGEobiksIGkodCkpKVxuICAgIH0pLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZSA9IGpRdWVyeSh0aGlzKS5jbG9zZXN0KFwibGlcIiksXG4gICAgICAgICAgICB0ID0gZS5jbG9zZXN0KFwidWxcIikuZmluZChcIj4gbGlcIiksXG4gICAgICAgICAgICBuID0gZS5maW5kKFwiPiB1bFwiKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG8pLCBuLmxlbmd0aCAmJiAoYSh0KSwgaShlKSlcbiAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGUgPSBqUXVlcnkodGhpcykuY2xvc2VzdChcImxpXCIpLFxuICAgICAgICAgICAgdCA9IGUuZmluZChcIj4gdWxcIik7XG4gICAgICAgIG8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdC5sZW5ndGggJiYgYShlKVxuICAgICAgICB9LCAxNTApXG4gICAgfSksIGpRdWVyeShcIi5oYXMtc3VibWVudVwiKS5maW5kKFwiPiB1bFwiKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG8pXG4gICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlID0galF1ZXJ5KHRoaXMpLmNsb3Nlc3QoXCJsaVwiKTtcbiAgICAgICAgbyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhKGUpXG4gICAgICAgIH0sIDE1MClcbiAgICB9KSwgalF1ZXJ5KGRvY3VtZW50KS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgYShyKVxuICAgIH0pLmtleXVwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgMjcgPT0gZS5rZXlDb2RlICYmIGEocilcbiAgICB9KVxufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuanMtLW1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvcGVuZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgICAgICAkKCcjbW1lbnUnKS5zbGlkZVVwKDMwMCk7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykucmVtb3ZlQ2xhc3MoJ25vLXNjcm9sbCcpO1xuICAgICAgICAgICAgJCgnLmhlYWRlci10b3AnKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICAgICAgJCgnI21tZW51Jykuc2xpZGVEb3duKDMwMCk7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYWRkQ2xhc3MoJ25vLXNjcm9sbCcpO1xuICAgICAgICAgICAgJCgnLmhlYWRlci10b3AnKS5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGUgPSBqUXVlcnkod2luZG93KSxcbiAgICAgICAgdCA9IGpRdWVyeShcImh0bWxcIik7XG4gICAgbmF2UHJpbWFyeShlLCB0KTtcbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1lbnVfX2l0ZW1fc3VibWVudT4ubWVudV9fYnRuPi5tZW51X19pY29uJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcubWVudV9fc3VibWVudScpXG4gICAgICAgICAgICAubm90KCQodGhpcykucGFyZW50KCkubmV4dCgnLm1lbnVfX3N1Ym1lbnUnKS50b2dnbGVDbGFzcygnb3BlbmVkJykudG9nZ2xlKCkucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpLmVuZCgpKVxuICAgICAgICAgICAgLm5vdCgkKHRoaXMpLnBhcmVudHMoJy5tZW51X19zdWJtZW51JykpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpLmhpZGUoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgfSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCEkKGUudGFyZ2V0KS5jbG9zZXN0KCcubWVudV9faXRlbV9zdWJtZW51Pi5tZW51X19idG4+Lm1lbnVfX2ljb24nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5tZW51X19zdWJtZW51JykucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpLmhpZGUoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgIH1cbiAgICB9KS5vbignY2xpY2snLCAnLm1lbnVfX2J0bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBoYXNoID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXG4gICAgICAgICRlbGVtID0gJCgnJyArIGhhc2gpO1xuICAgICAgICBpZiAoJGVsZW0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX190b2dnbGUtbWVudScpLnRyaWdnZXJIYW5kbGVyKCdjbGljaycpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdtZW51X19pdGVtX2N1cnJlbnQnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdtZW51X19pdGVtX2N1cnJlbnQnKTtcblxuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9ICRlbGVtLm9mZnNldCgpLnRvcCAtIChNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6ICcgKyAkc2NyZWVuU21NYXggKyAnKScpID8gJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkgOiAwKTtcbiAgICAgICAgICAgIE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICRzY3JlZW5TbU1heCArICcpJykgPyAkKCcuaGVhZGVyJykuY3NzKHsndG9wJzogc2Nyb2xsVG9wfSkgOiBudWxsO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6IHNjcm9sbFRvcH0sXG4gICAgICAgICAgICAgICAgTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAnICsgJHNjcmVlblNtTWF4ICsgJyknKSA/IDAgOiAzMDAsICdsaW5lYXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8kKCcuaGVhZGVyJykuY3NzKHsndG9wJzogJyd9KTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gaGFzaDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbC5NZW51JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGN1cnIgPSAkKCcubWVudV9fYnRuX2x2bF8xOmZpcnN0Jyk7XG4gICAgICAgIHZhciBwb3MgPSAkKHRoaXMpLnNjcm9sbFRvcCgpICsgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICQoJy5zZWN0aW9uW2lkXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHBvcyA+PSAkKHRoaXMpLm9mZnNldCgpLnRvcCkge1xuICAgICAgICAgICAgICAgICRjdXJyID0gJCgnW2hyZWYkPVwiIycgKyAkKHRoaXMpLmF0dHIoJ2lkJykgKyAnXCJdJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoJGN1cnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAkY3Vyci5wYXJlbnQoKS5hZGRDbGFzcygnbWVudV9faXRlbV9jdXJyZW50Jykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnbWVudV9faXRlbV9jdXJyZW50Jyk7XG4gICAgICAgICAgICAvL2xvY2F0aW9uLmhhc2ggPSAkY3Vyci5hdHRyKCdocmVmJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZygkY3Vyci5hdHRyKCdocmVmJykpO1xuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdzY3JvbGwuTWVudScpO1xufSk7IiwiJC5mYW5jeWJveC5kZWZhdWx0cy5oYXNoID0gZmFsc2U7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgICQoXCJbZGF0YS1mYW5jeWJveC0tc2luZ2xlXVwiKS5mYW5jeWJveCh7XG4gICAgICAgIHNtYWxsQnRuIDogZmFsc2UsXG4gICAgICAgIGF1dG9Gb2N1cyA6IGZhbHNlLFxuICAgICAgICBidG5UcGwgOiB7XG4gICAgICAgICAgICBzbGlkZVNob3cgIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC1wbGF5IGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tcGxheSBoaWRlXCIgdGl0bGU9XCJ7e1BMQVlfU1RBUlR9fVwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBmdWxsU2NyZWVuIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC1mdWxsc2NyZWVuIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tZnVsbHNjcmVlbiBoaWRlXCIgdGl0bGU9XCJ7e0ZVTExfU0NSRUVOfX1cIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgdGh1bWJzICAgICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtdGh1bWJzIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tdGh1bWJzIGhpZGVcIiB0aXRsZT1cInt7VEhVTUJTfX1cIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgY2xvc2UgICAgICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtY2xvc2UgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS1jbG9zZVwiIHRpdGxlPVwie3tDTE9TRX19XCI+PC9idXR0b24+JyxcblxuICAgICAgICAgICAgLy8gVGhpcyBzbWFsbCBjbG9zZSBidXR0b24gd2lsbCBiZSBhcHBlbmRlZCB0byB5b3VyIGh0bWwvaW5saW5lL2FqYXggY29udGVudCBieSBkZWZhdWx0LFxuICAgICAgICAgICAgLy8gaWYgXCJzbWFsbEJ0blwiIG9wdGlvbiBpcyBub3Qgc2V0IHRvIGZhbHNlXG4gICAgICAgICAgICBzbWFsbEJ0biAgIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC1jbG9zZSBjbGFzcz1cImZhbmN5Ym94LWNsb3NlLXNtYWxsIGdseXBoaWNvbiBnbHlwaGljb24tY2xvc2UtMlwiIHRpdGxlPVwie3tDTE9TRX19XCI+PC9idXR0b24+J1xuICAgICAgICB9LFxuICAgICAgICBrZXlib2FyZDogZmFsc2UsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgb25Jbml0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlQ2xvc2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdXJsO1xuICAgICQoXCJbZGF0YS1mYW5jeWJveC0tZ3JvdXBdXCIpLmZhbmN5Ym94KHtcbiAgICAgICAgc21hbGxCdG4gOiBmYWxzZSxcbiAgICAgICAgYXV0b0ZvY3VzIDogZmFsc2UsXG4gICAgICAgIGJ0blRwbCA6IHtcbiAgICAgICAgICAgIHNsaWRlU2hvdyAgOiAnPGJ1dHRvbiBkYXRhLWZhbmN5Ym94LXBsYXkgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS1wbGF5IGhpZGVcIiB0aXRsZT1cInt7UExBWV9TVEFSVH19XCI+PC9idXR0b24+JyxcbiAgICAgICAgICAgIGZ1bGxTY3JlZW4gOiAnPGJ1dHRvbiBkYXRhLWZhbmN5Ym94LWZ1bGxzY3JlZW4gY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS1mdWxsc2NyZWVuIGhpZGVcIiB0aXRsZT1cInt7RlVMTF9TQ1JFRU59fVwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICB0aHVtYnMgICAgIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC10aHVtYnMgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS10aHVtYnMgaGlkZVwiIHRpdGxlPVwie3tUSFVNQlN9fVwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBjbG9zZSAgICAgIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC1jbG9zZSBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLWNsb3NlXCIgdGl0bGU9XCJ7e0NMT1NFfX1cIj48L2J1dHRvbj4nLFxuXG4gICAgICAgICAgICAvLyBUaGlzIHNtYWxsIGNsb3NlIGJ1dHRvbiB3aWxsIGJlIGFwcGVuZGVkIHRvIHlvdXIgaHRtbC9pbmxpbmUvYWpheCBjb250ZW50IGJ5IGRlZmF1bHQsXG4gICAgICAgICAgICAvLyBpZiBcInNtYWxsQnRuXCIgb3B0aW9uIGlzIG5vdCBzZXQgdG8gZmFsc2VcbiAgICAgICAgICAgIHNtYWxsQnRuICAgOiAnPGJ1dHRvbiBkYXRhLWZhbmN5Ym94LWNsb3NlIGNsYXNzPVwiZmFuY3lib3gtY2xvc2Utc21hbGwgZ2x5cGhpY29uIGdseXBoaWNvbi1jbG9zZS0yXCIgdGl0bGU9XCJ7e0NMT1NFfX1cIj48L2J1dHRvbj4nXG4gICAgICAgIH0sXG4gICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgb25Jbml0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlQ2xvc2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB9LFxuICAgICAgICBhZnRlckNsb3NlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChcIltkYXRhLWZhbmN5Ym94LS1nYWxsZXJ5XVwiKS5mYW5jeWJveCh7XG4gICAgICAgIHNtYWxsQnRuIDogZmFsc2UsXG4gICAgICAgIGF1dG9Gb2N1cyA6IGZhbHNlLFxuICAgICAgICBidG5UcGwgOiB7XG4gICAgICAgICAgICBzbGlkZVNob3cgIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC1wbGF5IGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tcGxheVwiIHRpdGxlPVwie3tQTEFZX1NUQVJUfX1cIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgZnVsbFNjcmVlbiA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtZnVsbHNjcmVlbiBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLWZ1bGxzY3JlZW5cIiB0aXRsZT1cInt7RlVMTF9TQ1JFRU59fVwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICB0aHVtYnMgICAgIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC10aHVtYnMgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS10aHVtYnNcIiB0aXRsZT1cInt7VEhVTUJTfX1cIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgY2xvc2UgICAgICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtY2xvc2UgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS1jbG9zZVwiIHRpdGxlPVwie3tDTE9TRX19XCI+PC9idXR0b24+JyxcblxuICAgICAgICAgICAgLy8gVGhpcyBzbWFsbCBjbG9zZSBidXR0b24gd2lsbCBiZSBhcHBlbmRlZCB0byB5b3VyIGh0bWwvaW5saW5lL2FqYXggY29udGVudCBieSBkZWZhdWx0LFxuICAgICAgICAgICAgLy8gaWYgXCJzbWFsbEJ0blwiIG9wdGlvbiBpcyBub3Qgc2V0IHRvIGZhbHNlXG4gICAgICAgICAgICBzbWFsbEJ0biAgIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC1jbG9zZSBjbGFzcz1cImZhbmN5Ym94LWNsb3NlLXNtYWxsIGdseXBoaWNvbiBnbHlwaGljb24tY2xvc2UtMlwiIHRpdGxlPVwie3tDTE9TRX19XCI+PC9idXR0b24+J1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVDbG9zZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtdG9nZ2xlPVwiaGlzdG9yeS12aWV3XCJdJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdbZGF0YS1mYW5jeWJveD1cImhpc3Rvcnk/MVwiXScpLmVxKDApLmNsaWNrKCk7XG4gICAgfSk7XG59KTsiXX0=
