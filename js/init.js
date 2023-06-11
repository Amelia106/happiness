
(function (a) {
  var b = {
    init: function () {
      this.anchor();
      this.mobileMenu();
      this.hashtag();
      this.contactForm();
      this.owl();
      this.masonry();
      this.counter();
      this.modal();
      this.nav_skin();
      this.popup();
      this.svg();
      this.bg_images();
    },
    anchor: function () {
      var c = a("section a[href^='#'],.edrea_intro a[href^='#']");
      c.on("click", function () {
        var d = a(this).attr("href");
        if (d !== "#") {
          a("html,body").animate({ scrollTop: a(d).offset().top }, 1000);
          return false;
        }
      });
    },
    mobileMenu: function () {
      var e = a(".edrea_mobile_menu");
      var d = e.find(".hamburger");
      var c = e.find(".dropdown");
      var f = c.find("a");
      d.on("click", function () {
        if (d.hasClass("is-active")) {
          d.removeClass("is-active");
          c.slideUp();
        } else {
          d.addClass("is-active");
          c.slideDown();
        }
      });
      f.on("click", function () {
        d.removeClass("is-active");
        c.slideUp();
        return false;
      });
    },
    contactForm: function () {
      a("#send_message").on("click", function () {
        var e = a(".edrea_contact_form");
        var g = a("#name").val();
        var c = a("#email").val();
        var f = a("#message").val();
        var h = e.find(".success");
        var i = h.data("success");
        var d = e.data("email");
        h.empty();
        if (g === "" || c === "" || f === "" || d === "") {
          a(".empty_notice").slideDown(500).delay(2000).slideUp(500);
        } else {
          a.post(
            "modal/contact.php",
            { ajax_name: g, ajax_email: c, ajax_emailto: d, ajax_message: f },
            function (j) {
              h.append(j);
              if (h.find(".contact_error").length) {
                h.slideDown(500).delay(2000).slideUp(500);
              } else {
                h.append("<span class='contact_success'>" + i + "</span>");
                h.slideDown(500).delay(4000).slideUp(500);
              }
              if (j === "") {
                e[0].reset();
              }
            }
          );
        }
        return false;
      });
    },
    owl: function () {
      a(".edrea_portfolio_slider .owl-carousel").each(function () {
        var c = a(this);
        var d = c.closest(".edrea_portfolio_slider");
        c.owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          dots: false,
          items: 4,
          responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1040: { items: 3 },
            1600: { items: 4 },
          },
        });
        d.find(".edrea_prevnext .next a").click(function () {
          c.trigger("next.owl.carousel");
          return false;
        });
        d.find(".edrea_prevnext .prev a").click(function () {
          c.trigger("prev.owl.carousel");
          return false;
        });
      });
      a(".edrea_testi_slider .owl-carousel").each(function () {
        var c = a(this);
        var d = c.closest(".edrea_testi_slider");
        c.owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          dots: false,
          items: 1,
        });
        d.find(".edrea_prevnext .next a").click(function () {
          c.trigger("next.owl.carousel");
          return false;
        });
        d.find(".edrea_prevnext .prev a").click(function () {
          c.trigger("prev.owl.carousel");
          return false;
        });
      });
      a(".edrea_news_slider .owl-carousel").each(function () {
        var c = a(this);
        var d = c.closest(".edrea_news_slider");
        c.owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          dots: false,
          items: 2,
          responsive: { 0: { items: 1 }, 768: { items: 2 } },
        });
        d.find(".edrea_prevnext .next a").click(function () {
          c.trigger("next.owl.carousel");
          return false;
        });
        d.find(".edrea_prevnext .prev a").click(function () {
          c.trigger("prev.owl.carousel");
          return false;
        });
      });
    },
    masonry: function () {
      var c = a(".masonry");
      if (a().isotope) {
        c.each(function () {
          a(this).isotope({ itemSelector: ".masonry_item", masonry: {} });
          a(this).isotope("reloadItems").isotope();
        });
      }
    },
    counter: function () {
      var c = a(".edrea_counter");
      c.each(function () {
        var d = a(this);
        d.waypoint({
          handler: function () {
            if (!d.hasClass("stop")) {
              d.addClass("stop").countTo({
                refreshInterval: 50,
                formatter: function (f, e) {
                  return f
                    .toFixed(e.decimals)
                    .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
                },
              });
            }
          },
          offset: "90%",
        });
      });
    },
    modal: function () {
      var h = this;
      var f = a(".edrea_modalbox");
      var e = a(".modal_item");
      var c = f.find(".close");
      var g = f.find(".edrea_prevnext");
      var d = f.find(".fixed_title");
      e.on("click", function () {
        var k = a(this);
        var i = k.find(".hidden_information").html();
        var n = k.closest(".modal_items"),
          m = k.attr("data-index"),
          l = n.attr("data-from"),
          j = n.attr("data-count");
        g.attr("data-index", m);
        g.attr("data-from", l);
        var p = m < 10 ? "0" + m : m;
        var o = j < 10 ? "0" + j : j;
        d.html("<span>" + p + "/" + o + "</span>" + l);
        a("body").addClass("modal");
        f.addClass("opened");
        f.find(".modal_in").html(i);
        h.modal_prevnext(g, f);
        h.svg();
        h.bg_images();
      });
      h.modal_prevnext(g, f);
      c.on("click", function () {
        f.removeClass("opened");
        f.find(".modal_in").html("");
        a("body").removeClass("modal");
        return false;
      });
    },
    modal_prevnext: function (d, c) {
      var e = this;
      d.find("a")
        .off()
        .on("click", function () {
          var h = a(this);
          var j = d.attr("data-from");
          var k = parseInt(d.attr("data-index"));
          var l = a('.modal_items[data-from="' + j + '"]');
          var g = parseInt(l.attr("data-count"));
          var i = c.find(".fixed_title");
          if (h.parent().hasClass("prev")) {
            k--;
          } else {
            k++;
          }
          if (k < 1) {
            k = g;
          }
          if (k > g) {
            k = 1;
          }
          var f = l
            .find('.modal_item[data-index="' + k + '"] .hidden_information')
            .html();
          d.removeClass("disabled");
          d.attr("data-index", k);
          setTimeout(function () {
            c.find(".modal_in").fadeOut(500, function () {
              a(this).html(f).fadeIn(500);
            });
            var n = k < 10 ? "0" + k : k;
            var m = g < 10 ? "0" + g : g;
            i.html("<span>" + n + "/" + m + "</span>" + j);
          }, 500);
          a(".edrea_modalbox .modal_content")
            .stop()
            .animate({ scrollTop: 0 }, 500, "swing");
          e.modal_prevnext(d, c);
          e.svg();
          e.bg_images();
          return false;
        });
    },
    nav_skin: function () {
      a(window).on("scroll", function () {
        var c = a(".edrea_topbar");
        var d = a(window).scrollTop();
        if (d >= 100) {
          c.addClass("animate");
        } else {
          c.removeClass("animate");
        }
      });
    },
    popup: function () {
      a(".gallery_zoom").each(function () {
        a(this).magnificPopup({
          delegate: "a.zoom",
          type: "image",
          gallery: { enabled: true },
          removalDelay: 300,
          mainClass: "mfp-fade",
        });
      });
      a(".popup-youtube, .popup-vimeo").each(function () {
        a(this).magnificPopup({
          disableOn: 700,
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        });
      });
      a(".soundcloude_link").magnificPopup({
        type: "image",
        gallery: { enabled: true },
      });
    },
    preloader: function () {
      var c = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
        navigator.userAgent
      )
        ? true
        : false;
      var d = a("#preloader");
      if (!c) {
        setTimeout(function () {
          d.addClass("preloaded");
        }, 800);
        setTimeout(function () {
          d.remove();
        }, 2000);
      } else {
        d.remove();
      }
    },
    run_preloader: function () {
      var c = this;
      setTimeout(function () {
        c.preloader();
      }, 500);
    },
    svg: function () {
      a("img.svg").each(function () {
        var c = a(this);
        var d = c.attr("class");
        var f = c.attr("src");
        a.get(
          f,
          function (e) {
            var g = a(e).find("svg");
            if (typeof d !== "undefined") {
              g = g.attr("class", d + " ready-svg");
            }
            g = g.removeAttr("xmlns:a");
            c.replaceWith(g);
          },
          "xml"
        );
      });
    },
    bg_images: function () {
      var c = a("*[data-img-url]");
      c.each(function () {
        var d = a(this);
        var e = d.data("img-url");
        d.css({ backgroundImage: "url(" + e + ")" });
      });
    },
    hashtag: function () {
      var e = this;
      var c = a(".edrea_topbar .menu .ccc");
      var d = a(".edrea_topbar .menu .current a");
      a(".edrea_topbar .menu a").on("mouseenter", function () {
        var f = a(this);
        e.currentLink(c, f);
      });
      a(".edrea_topbar .menu").on("mouseleave", function () {
        d = a(".edrea_topbar .menu .current a");
        e.currentLink(c, d);
      });
      e.currentLink(c, d);
    },
    currentLink: function (c, d) {
      if (!d.length) {
        return false;
      }
      var f = d.offset().left;
      var h = d.outerWidth();
      var g = a(".edrea_topbar .menu").offset().left;
      if (d.parent().hasClass("button")) {
        h = 0;
      }
      c.css({ left: f - g + "px", width: h + "px" });
    },
  };
  a(document).ready(function () {
    b.init();
    a(window).load("body", function () {
      b.run_preloader();
    });
  });
})(jQuery);
jQuery(".anchor_nav").onePageNav();

