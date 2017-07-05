var $screenSm = 768, $screenMd = 1024, $screenLg = 1280;

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
    var o, s = jQuery("#block-system-main-menu > .content__header-2 > ul.menu"),
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwicG9wdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmxvY2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyICRzY3JlZW5TbSA9IDc2OCwgJHNjcmVlbk1kID0gMTAyNCwgJHNjcmVlbkxnID0gMTI4MDtcblxudmFyICRmb250U2l6ZVJvb3QgPSAxNiwgJGZvbnRTaXplUm9vdENvbXB1dGVkID0gcGFyc2VJbnQoJCgnaHRtbCcpLmNzcygnZm9udFNpemUnKSk7XG5cbnZhciAkc2NyZWVuU21NaW4gPSAkc2NyZWVuU20vJGZvbnRTaXplUm9vdCArICdlbSc7IGNvbnNvbGUubG9nKCckc2NyZWVuU21NaW4gPSAnICsgJHNjcmVlblNtTWluICsgJyAoJyArICRzY3JlZW5TbSArICdweCknKTtcbnZhciAkc2NyZWVuTWRNaW4gPSAkc2NyZWVuTWQvJGZvbnRTaXplUm9vdCArICdlbSc7IGNvbnNvbGUubG9nKCckc2NyZWVuTWRNaW4gPSAnICsgJHNjcmVlbk1kTWluICsgJyAoJyArICRzY3JlZW5NZCArICdweCknKTtcbnZhciAkc2NyZWVuTGdNaW4gPSAkc2NyZWVuTGcvJGZvbnRTaXplUm9vdCArICdlbSc7IGNvbnNvbGUubG9nKCckc2NyZWVuTGdNaW4gPSAnICsgJHNjcmVlbkxnTWluICsgJyAoJyArICRzY3JlZW5MZyArICdweCknKTtcblxudmFyICRzY3JlZW5Yc01heCA9ICgkc2NyZWVuU20gLSAxKS8kZm9udFNpemVSb290ICsgJ2VtJzsgY29uc29sZS5sb2coJyRzY3JlZW5Yc01heCA9ICcgKyAkc2NyZWVuWHNNYXgpO1xudmFyICRzY3JlZW5TbU1heCA9ICgkc2NyZWVuTWQgLSAxKS8kZm9udFNpemVSb290ICsgJ2VtJzsgY29uc29sZS5sb2coJyRzY3JlZW5TbU1heCA9ICcgKyAkc2NyZWVuU21NYXgpO1xudmFyICRzY3JlZW5NZE1heCA9ICgkc2NyZWVuTGcgLSAxKS8kZm9udFNpemVSb290ICsgJ2VtJzsgY29uc29sZS5sb2coJyRzY3JlZW5NZE1heCA9ICcgKyAkc2NyZWVuTWRNYXgpO1xuIiwiZnVuY3Rpb24gbmF2UHJpbWFyeShlLCB0KSB7XG4gICAgZnVuY3Rpb24gbihlLCB0KSB7XG4gICAgICAgIHJldHVybiBlLnBhcmVudCgpLmlzKHMpID8gdCA+IGMgOiB0ICsgZS5vdXRlcldpZHRoKCkgPiBjXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaShlKSB7XG4gICAgICAgIHZhciB0LCBpO1xuICAgICAgICBlLmlzKHMpID8gdCA9IGUgOiAodCA9IGUuZmluZChcIj4gdWxcIiksIGkgPSB0Lm91dGVyV2lkdGgoKSArIGUuY2xvc2VzdChcImxpXCIpLm9mZnNldCgpLmxlZnQpLCBlLmZpbmQobCkuYWRkQ2xhc3MoZCksIHQubGVuZ3RoICYmIChlLnBhcmVudCgpLmlzKHMpID8gbihlLCBpKSAmJiB0LmNzcyhcIm1hcmdpbkxlZnRcIiwgYyAtIGkpIDogKG4oZSwgaSkgJiYgdC5jc3MoXCJtYXJnaW5MZWZ0XCIsIC0oZS5vdXRlcldpZHRoKCkgKyB0Lm91dGVyV2lkdGgoKSkpLCB0LmNzcyh7XG4gICAgICAgICAgICBsZWZ0OiBlLnBhcmVudCgpLm91dGVyV2lkdGgoKSxcbiAgICAgICAgICAgIHRvcDogMFxuICAgICAgICB9KSksIHQuYWRkQ2xhc3MoXCJuYXZfX3Zpc2libGVcIikpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYShlKSB7XG4gICAgICAgIGUuaXMocykgPyBzLnJlbW92ZUNsYXNzKFwibmF2X192aXNpYmxlXCIpIDogZS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHQgPSBlLmZpbmQoXCJ1bFwiKTtcbiAgICAgICAgICAgIHQucmVtb3ZlQ2xhc3MoXCJuYXZfX3Zpc2libGVcIiksIGpRdWVyeSh0aGlzKS5maW5kKGwpLnJlbW92ZUNsYXNzKGQpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHZhciBvLCBzID0galF1ZXJ5KFwiI2Jsb2NrLXN5c3RlbS1tYWluLW1lbnUgPiAuY29udGVudF9faGVhZGVyLTIgPiB1bC5tZW51XCIpLFxuICAgICAgICByID0gcy5maW5kKFwibGlcIiksXG4gICAgICAgIGwgPSBcIj4gYSwgPiBkaXZcIixcbiAgICAgICAgZCA9IFwianMtYWN0aXZlXCIsXG4gICAgICAgIGMgPSBlLndpZHRoKCk7XG4gICAgci5maW5kKFwiPiB1bFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZSA9IGpRdWVyeSh0aGlzKS5jbG9zZXN0KFwibGlcIik7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5yZW1vdmVDbGFzcyhcIm1lbnVcIiksIGUuYWRkQ2xhc3MoXCJoYXMtc3VibWVudVwiKVxuICAgIH0pLCBzLmZpbmQoXCI+IGxpXCIpLmZpbmQoXCI+IHVsXCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlID0galF1ZXJ5KHRoaXMpO1xuICAgICAgICBlLmNzcyhcIm1pbldpZHRoXCIsIGUucGFyZW50KCkud2lkdGgoKSlcbiAgICB9KSwgci5maW5kKGwpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHQgPSBqUXVlcnkodGhpcykuY2xvc2VzdChcImxpXCIpLFxuICAgICAgICAgICAgbiA9IHQuY2xvc2VzdChcInVsXCIpLmZpbmQoXCI+IGxpXCIpLFxuICAgICAgICAgICAgbyA9IHQuZmluZChcIj4gdWxcIik7XG4gICAgICAgIG8ubGVuZ3RoICYmIChvLmhhc0NsYXNzKFwibmF2X192aXNpYmxlXCIpID8gYSh0KSA6IChhKG4pLCBpKHQpKSlcbiAgICB9KS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGUgPSBqUXVlcnkodGhpcykuY2xvc2VzdChcImxpXCIpLFxuICAgICAgICAgICAgdCA9IGUuY2xvc2VzdChcInVsXCIpLmZpbmQoXCI+IGxpXCIpLFxuICAgICAgICAgICAgbiA9IGUuZmluZChcIj4gdWxcIik7XG4gICAgICAgIGNsZWFyVGltZW91dChvKSwgbi5sZW5ndGggJiYgKGEodCksIGkoZSkpXG4gICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlID0galF1ZXJ5KHRoaXMpLmNsb3Nlc3QoXCJsaVwiKSxcbiAgICAgICAgICAgIHQgPSBlLmZpbmQoXCI+IHVsXCIpO1xuICAgICAgICBvID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHQubGVuZ3RoICYmIGEoZSlcbiAgICAgICAgfSwgMTUwKVxuICAgIH0pLCBqUXVlcnkoXCIuaGFzLXN1Ym1lbnVcIikuZmluZChcIj4gdWxcIikuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChvKVxuICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZSA9IGpRdWVyeSh0aGlzKS5jbG9zZXN0KFwibGlcIik7XG4gICAgICAgIG8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYShlKVxuICAgICAgICB9LCAxNTApXG4gICAgfSksIGpRdWVyeShkb2N1bWVudCkub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGEocilcbiAgICB9KS5rZXl1cChmdW5jdGlvbihlKSB7XG4gICAgICAgIDI3ID09IGUua2V5Q29kZSAmJiBhKHIpXG4gICAgfSlcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmpzLS1tbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb3BlbmVkJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICAgICAgJCgnI21tZW51Jykuc2xpZGVVcCgzMDApO1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLnJlbW92ZUNsYXNzKCduby1zY3JvbGwnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXItdG9wJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAgICQoJyNtbWVudScpLnNsaWRlRG93bigzMDApO1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFkZENsYXNzKCduby1zY3JvbGwnKTtcbiAgICAgICAgICAgICQoJy5oZWFkZXItdG9wJykuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBlID0galF1ZXJ5KHdpbmRvdyksXG4gICAgICAgIHQgPSBqUXVlcnkoXCJodG1sXCIpO1xuICAgIG5hdlByaW1hcnkoZSwgdCk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tZW51X19pdGVtX3N1Ym1lbnU+Lm1lbnVfX2J0bj4ubWVudV9faWNvbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnLm1lbnVfX3N1Ym1lbnUnKVxuICAgICAgICAgICAgLm5vdCgkKHRoaXMpLnBhcmVudCgpLm5leHQoJy5tZW51X19zdWJtZW51JykudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpLnRvZ2dsZSgpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKS5lbmQoKSlcbiAgICAgICAgICAgIC5ub3QoJCh0aGlzKS5wYXJlbnRzKCcubWVudV9fc3VibWVudScpKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5oaWRlKCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgIH0pLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICghJChlLnRhcmdldCkuY2xvc2VzdCgnLm1lbnVfX2l0ZW1fc3VibWVudT4ubWVudV9fYnRuPi5tZW51X19pY29uJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcubWVudV9fc3VibWVudScpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5oaWRlKCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICB9XG4gICAgfSkub24oJ2NsaWNrJywgJy5tZW51X19idG4nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgaGFzaCA9ICQodGhpcykuYXR0cignaHJlZicpLFxuICAgICAgICAkZWxlbSA9ICQoJycgKyBoYXNoKTtcbiAgICAgICAgaWYgKCRlbGVtLmxlbmd0aCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9fdG9nZ2xlLW1lbnUnKS50cmlnZ2VySGFuZGxlcignY2xpY2snKTtcblxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnbWVudV9faXRlbV9jdXJyZW50Jykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnbWVudV9faXRlbV9jdXJyZW50Jyk7XG5cbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAkZWxlbS5vZmZzZXQoKS50b3AgLSAoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAnICsgJHNjcmVlblNtTWF4ICsgJyknKSA/ICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpIDogMCk7XG4gICAgICAgICAgICBNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6ICcgKyAkc2NyZWVuU21NYXggKyAnKScpID8gJCgnLmhlYWRlcicpLmNzcyh7J3RvcCc6IHNjcm9sbFRvcH0pIDogbnVsbDtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiBzY3JvbGxUb3B9LFxuICAgICAgICAgICAgICAgIE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICRzY3JlZW5TbU1heCArICcpJykgPyAwIDogMzAwLCAnbGluZWFyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vJCgnLmhlYWRlcicpLmNzcyh7J3RvcCc6ICcnfSk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IGhhc2g7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwuTWVudScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRjdXJyID0gJCgnLm1lbnVfX2J0bl9sdmxfMTpmaXJzdCcpO1xuICAgICAgICB2YXIgcG9zID0gJCh0aGlzKS5zY3JvbGxUb3AoKSArICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpO1xuICAgICAgICAkKCcuc2VjdGlvbltpZF0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChwb3MgPj0gJCh0aGlzKS5vZmZzZXQoKS50b3ApIHtcbiAgICAgICAgICAgICAgICAkY3VyciA9ICQoJ1tocmVmJD1cIiMnICsgJCh0aGlzKS5hdHRyKCdpZCcpICsgJ1wiXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCRjdXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgJGN1cnIucGFyZW50KCkuYWRkQ2xhc3MoJ21lbnVfX2l0ZW1fY3VycmVudCcpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ21lbnVfX2l0ZW1fY3VycmVudCcpO1xuICAgICAgICAgICAgLy9sb2NhdGlvbi5oYXNoID0gJGN1cnIuYXR0cignaHJlZicpO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coJGN1cnIuYXR0cignaHJlZicpKTtcbiAgICB9KS50cmlnZ2VySGFuZGxlcignc2Nyb2xsLk1lbnUnKTtcbn0pOyIsIiQuZmFuY3lib3guZGVmYXVsdHMuaGFzaCA9IGZhbHNlO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAkKFwiW2RhdGEtZmFuY3lib3gtLXNpbmdsZV1cIikuZmFuY3lib3goe1xuICAgICAgICBzbWFsbEJ0biA6IGZhbHNlLFxuICAgICAgICBhdXRvRm9jdXMgOiBmYWxzZSxcbiAgICAgICAgYnRuVHBsIDoge1xuICAgICAgICAgICAgc2xpZGVTaG93ICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtcGxheSBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLXBsYXkgaGlkZVwiIHRpdGxlPVwie3tQTEFZX1NUQVJUfX1cIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgZnVsbFNjcmVlbiA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtZnVsbHNjcmVlbiBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLWZ1bGxzY3JlZW4gaGlkZVwiIHRpdGxlPVwie3tGVUxMX1NDUkVFTn19XCI+PC9idXR0b24+JyxcbiAgICAgICAgICAgIHRodW1icyAgICAgOiAnPGJ1dHRvbiBkYXRhLWZhbmN5Ym94LXRodW1icyBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLXRodW1icyBoaWRlXCIgdGl0bGU9XCJ7e1RIVU1CU319XCI+PC9idXR0b24+JyxcbiAgICAgICAgICAgIGNsb3NlICAgICAgOiAnPGJ1dHRvbiBkYXRhLWZhbmN5Ym94LWNsb3NlIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tY2xvc2VcIiB0aXRsZT1cInt7Q0xPU0V9fVwiPjwvYnV0dG9uPicsXG5cbiAgICAgICAgICAgIC8vIFRoaXMgc21hbGwgY2xvc2UgYnV0dG9uIHdpbGwgYmUgYXBwZW5kZWQgdG8geW91ciBodG1sL2lubGluZS9hamF4IGNvbnRlbnQgYnkgZGVmYXVsdCxcbiAgICAgICAgICAgIC8vIGlmIFwic21hbGxCdG5cIiBvcHRpb24gaXMgbm90IHNldCB0byBmYWxzZVxuICAgICAgICAgICAgc21hbGxCdG4gICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtY2xvc2UgY2xhc3M9XCJmYW5jeWJveC1jbG9zZS1zbWFsbCBnbHlwaGljb24gZ2x5cGhpY29uLWNsb3NlLTJcIiB0aXRsZT1cInt7Q0xPU0V9fVwiPjwvYnV0dG9uPidcbiAgICAgICAgfSxcbiAgICAgICAga2V5Ym9hcmQ6IGZhbHNlLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgIG9uSW5pdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZUNsb3NlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHVybDtcbiAgICAkKFwiW2RhdGEtZmFuY3lib3gtLWdyb3VwXVwiKS5mYW5jeWJveCh7XG4gICAgICAgIHNtYWxsQnRuIDogZmFsc2UsXG4gICAgICAgIGF1dG9Gb2N1cyA6IGZhbHNlLFxuICAgICAgICBidG5UcGwgOiB7XG4gICAgICAgICAgICBzbGlkZVNob3cgIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC1wbGF5IGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tcGxheSBoaWRlXCIgdGl0bGU9XCJ7e1BMQVlfU1RBUlR9fVwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBmdWxsU2NyZWVuIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC1mdWxsc2NyZWVuIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tZnVsbHNjcmVlbiBoaWRlXCIgdGl0bGU9XCJ7e0ZVTExfU0NSRUVOfX1cIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgdGh1bWJzICAgICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtdGh1bWJzIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tdGh1bWJzIGhpZGVcIiB0aXRsZT1cInt7VEhVTUJTfX1cIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgY2xvc2UgICAgICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtY2xvc2UgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS1jbG9zZVwiIHRpdGxlPVwie3tDTE9TRX19XCI+PC9idXR0b24+JyxcblxuICAgICAgICAgICAgLy8gVGhpcyBzbWFsbCBjbG9zZSBidXR0b24gd2lsbCBiZSBhcHBlbmRlZCB0byB5b3VyIGh0bWwvaW5saW5lL2FqYXggY29udGVudCBieSBkZWZhdWx0LFxuICAgICAgICAgICAgLy8gaWYgXCJzbWFsbEJ0blwiIG9wdGlvbiBpcyBub3Qgc2V0IHRvIGZhbHNlXG4gICAgICAgICAgICBzbWFsbEJ0biAgIDogJzxidXR0b24gZGF0YS1mYW5jeWJveC1jbG9zZSBjbGFzcz1cImZhbmN5Ym94LWNsb3NlLXNtYWxsIGdseXBoaWNvbiBnbHlwaGljb24tY2xvc2UtMlwiIHRpdGxlPVwie3tDTE9TRX19XCI+PC9idXR0b24+J1xuICAgICAgICB9LFxuICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgIG9uSW5pdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZUNsb3NlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgYWZ0ZXJDbG9zZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoXCJbZGF0YS1mYW5jeWJveC0tZ2FsbGVyeV1cIikuZmFuY3lib3goe1xuICAgICAgICBzbWFsbEJ0biA6IGZhbHNlLFxuICAgICAgICBhdXRvRm9jdXMgOiBmYWxzZSxcbiAgICAgICAgYnRuVHBsIDoge1xuICAgICAgICAgICAgc2xpZGVTaG93ICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtcGxheSBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLXBsYXlcIiB0aXRsZT1cInt7UExBWV9TVEFSVH19XCI+PC9idXR0b24+JyxcbiAgICAgICAgICAgIGZ1bGxTY3JlZW4gOiAnPGJ1dHRvbiBkYXRhLWZhbmN5Ym94LWZ1bGxzY3JlZW4gY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS1mdWxsc2NyZWVuXCIgdGl0bGU9XCJ7e0ZVTExfU0NSRUVOfX1cIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgdGh1bWJzICAgICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtdGh1bWJzIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tdGh1bWJzXCIgdGl0bGU9XCJ7e1RIVU1CU319XCI+PC9idXR0b24+JyxcbiAgICAgICAgICAgIGNsb3NlICAgICAgOiAnPGJ1dHRvbiBkYXRhLWZhbmN5Ym94LWNsb3NlIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tY2xvc2VcIiB0aXRsZT1cInt7Q0xPU0V9fVwiPjwvYnV0dG9uPicsXG5cbiAgICAgICAgICAgIC8vIFRoaXMgc21hbGwgY2xvc2UgYnV0dG9uIHdpbGwgYmUgYXBwZW5kZWQgdG8geW91ciBodG1sL2lubGluZS9hamF4IGNvbnRlbnQgYnkgZGVmYXVsdCxcbiAgICAgICAgICAgIC8vIGlmIFwic21hbGxCdG5cIiBvcHRpb24gaXMgbm90IHNldCB0byBmYWxzZVxuICAgICAgICAgICAgc21hbGxCdG4gICA6ICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtY2xvc2UgY2xhc3M9XCJmYW5jeWJveC1jbG9zZS1zbWFsbCBnbHlwaGljb24gZ2x5cGhpY29uLWNsb3NlLTJcIiB0aXRsZT1cInt7Q0xPU0V9fVwiPjwvYnV0dG9uPidcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlQ2xvc2U6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLXRvZ2dsZT1cImhpc3Rvcnktdmlld1wiXScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnW2RhdGEtZmFuY3lib3g9XCJoaXN0b3J5PzFcIl0nKS5lcSgwKS5jbGljaygpO1xuICAgIH0pO1xufSk7Il19
