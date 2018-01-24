(function ($) {

  $(function () {
    $('.icon_search').on('click', function (event) {
      event.preventDefault();
      $('#search').addClass('open');
      $('#search form input[type="search"]').focus();
    });

    $('#search, #search button.close').on('click keyup', function (event) {
      if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
        $(this).removeClass('open');
      }
    });
    $('form').submit(function (event) {
      event.preventDefault();
      return false;
    });
  });

  //Accordion//
  var Accordion = function Accordion(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Evento
    links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el;
    $this = $(this), $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    };
  };

  var accordion = new Accordion($('#accordion'), false);

  $(window).load(function () {});
})(jQuery);

//menu resposive//
(function ($) {

  $.fn.menumaker = function (options) {

    var cssmenu = $(this),
        settings = $.extend({
      title: "Menu",
      format: "dropdown",
      sticky: false
    }, options);

    return this.each(function () {
      cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');

      $(this).find("#menu-button").on('click', function () {
        $(this).toggleClass('menu-opened');
        var mainmenu = $(this).next('ul');
        if (mainmenu.hasClass('open')) {
          mainmenu.hide().removeClass('open');
        } else {
          mainmenu.show().addClass('open');
          if (settings.format === "dropdown") {
            mainmenu.find('ul').show();
          }
        }
      });

      cssmenu.find('li ul').parent().addClass('has-sub');

      multiTg = function multiTg() {
        cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
        cssmenu.find('.submenu-button').on('click', function () {
          $(this).toggleClass('submenu-opened');
          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').hide();
          } else {
            $(this).siblings('ul').addClass('open').show();
          }
        });
      };

      if (settings.format === 'multitoggle') multiTg();else cssmenu.addClass('dropdown');

      if (settings.sticky === true) cssmenu.css('position', 'fixed');

      resizeFix = function resizeFix() {
        if ($(window).width() > 991) {
          cssmenu.find('ul').show();
        }

        if ($(window).width() <= 991) {
          cssmenu.find('ul').hide().removeClass('open');
        }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);
    });
  };
})(jQuery);

(function ($) {
  $(document).ready(function () {
    $("#cssmenu").menumaker({
      title: "Menu",
      format: "multitoggle"
    });
  });
})(jQuery);

(function ($) {

  $(document).ready(function () {

    var touch = $('#touch-menu');
    var menu = $('.menu');
    var fade_dow = $('.fade_dow');
    var sub_menu = $('.sub-menu');
    var menu_bar = $('.menu_bar');
    //bar

    $(touch).on('click', function (e) {
      e.preventDefault();
      menu_bar.toggleClass('change');
      menu.slideToggle();
    });

    var allsub = $('.sub-menu');

    fade_dow.on('click', function (e) {
      e.preventDefault();
      // allsub.addClass('active');
      allsub.slideUp();

      //preventDefault ngăn chặn hành vi mặc định của sự kiện
      // $(this).parent().parent().find('.sub-menu').toggle(330);
      //$(this).closest('li').find('.sub-menu').toggle('show');
      //allsub.not( "active" );

      if (!$(this).closest('li').find('.sub-menu').is(":visible")) {
        $(this).parent().next().slideDown();
      } else {
        $(this).parent().next().slideUp();
      }

      return false;
      //$this tham chieu doi tuong cha khi thay doi pham vi 
    });

    $(window).resize(function () {
      var w = $(window).width();
      if (w > 768 && menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  });
})(jQuery);

function bar(x) {
  x.classList.toggle("change");
}