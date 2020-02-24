function selectedActive(elem) {
        var selectedAttr = $(elem),
                selectionID = "." + $(selectedAttr).data("select");

        $(".selecton a").removeClass("active");
        $(selectedAttr).addClass("active");
        $(".food-menu").removeClass("active");

        if (selectionID == ".*") $(".food-menu").addClass("active");
        else $(selectionID).addClass("active");
}


function enableCounterUp(a) {
        var counterElement;
        if (isExists('#counter')) {
                counterElement = $('#counter');
        }
        else {
                return;
        }
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function () {
                        var $this = $(this),
                                countDuration = $this.data('duration'),
                                countTo = $this.attr('data-count');
                        $({ countNum: $this.text() }).animate({ countNum: countTo }, {
                                duration: countDuration,
                                easing: 'swing',
                                step: function () {
                                        $this.text(Math.floor(this.countNum));
                                },
                                complete: function () {
                                        $this.text(this.countNum);
                                }
                        });
                });
                a = 1;
        }
        return a;
}

function panelAccordian() {

        var panelTitle = $('.panel-title');
        panelTitle.on('click', function () {
                $(this).toggleClass('active');
                return false;
        });

}


function enableRadialProgress() {
        $(".radial-progress").each(function () {
                var $this = $(this),
                        progPercent = $this.data('prog-percent');

                var bar = new ProgressBar.Circle(this, {
                        color: '#fff',
                        strokeWidth: 3,
                        trailWidth: 0,
                        easing: 'easeInOut',
                        duration: 1400,
                        text: {},
                        from: { color: '#fff', width: 1 },
                        to: { color: '#EF002E', width: 3 },
                        // Set default step function for all animate calls
                        step: function (state, circle) {
                                circle.path.setAttribute('stroke', state.color);
                                circle.path.setAttribute('stroke-width', state.width);

                                var value = Math.round(circle.value() * 100);
                                if (value === 0) { circle.setText(''); } else { circle.setText(value); }
                        }
                });

                $(this).waypoint(function () { bar.animate(progPercent); }, { offset: "90%" })
        });
}

(function ($) {

        "use strict";

        // ACCORDIAN

        panelAccordian();

        // RADIAL PROGRESS BAR
        enableRadialProgress();

        enableSwiper();

        /*COUNTER*/
        var countLineProgress = 0;
        var countCounterUp = 0;
        var a = 0;
        countCounterUp = enableCounterUp(countCounterUp);

        $(window).on('scroll', function () {
                countCounterUp = enableCounterUp(countCounterUp);
        });

        /*CUSTOME ISOTOPE*/
        var selectedAttr = $('[data-select].active');
        selectedActive(selectedAttr);

        $('[data-select]').on("click", function () {
                var selectedAttr = $(this);
                selectedActive(selectedAttr);
                return false;
        });


        // DROPDOWN MENU

        var winWidth = $(window).width();
        dropdownMenu(winWidth);

        $(window).on('resize', function () {
                winWidth = $(window).width();
                dropdownMenu(winWidth);

        });


        $('[data-menu]').on('click', function () {

                var mainMenu = $(this).data('menu');

                $(mainMenu).toggleClass('visible-menu');

        });


})(jQuery);


function dropdownMenu(winWidth) {

        if (winWidth > 767) {

                $('.main-menu li.drop-down').on('mouseover', function () {
                        var $this = $(this),
                                menuAnchor = $this.children('a');

                        menuAnchor.addClass('mouseover');

                }).on('mouseleave', function () {
                        var $this = $(this),
                                menuAnchor = $this.children('a');

                        menuAnchor.removeClass('mouseover');
                });

        } else {

                $('.main-menu li.drop-down > a').on('click', function () {

                        if ($(this).attr('href') == '#') return false;
                        if ($(this).hasClass('mouseover')) {
                                $(this).removeClass('mouseover');
                        }
                        else {
                                $(this).addClass('mouseover');
                        }
                        return false;
                });
        }

}

function enableSwiper() {

        if (isExists('.swiper-container')) {

                $('.swiper-container').each(function (index) {

                        var swiperDirection = $(this).data('swiper-direction'),
                                swiperSlidePerView = $(this).data('swiper-slides-per-view'),
                                swiperBreakpoints = $(this).data('swiper-breakpoints'),
                                swiperSpeed = $(this).data('swiper-speed'),
                                swiperCrossFade = $(this).data('swiper-crossfade'),
                                swiperLoop = $(this).data('swiper-loop'),
                                swiperAutoplay = $(this).data('swiper-autoplay'),
                                swiperMousewheelControl = $(this).data('swiper-wheel-control'),
                                swipeSlidesPerview = $(this).data('slides-perview'),
                                swiperMargin = parseInt($(this).data('swiper-margin')),
                                swiperSlideEffect = $(this).data('slide-effect'),
                                swiperAutoHeight = $(this).data('autoheight'),
                                swiperScrollbar = ($(this).data('scrollbar') ? $(this).parentsUntil('.swiper-area').find('.swiper-scrollbar') : null);
                        swiperScrollbar = (isExists(swiperScrollbar) ? swiperScrollbar : null),
                                swprResponsive = $(this).data('swpr-responsive');

                        var swiper = new Swiper($(this)[0], {
                                pagination: $(this).find('.swiper-pagination'),
                                slidesPerView: (swiperSlidePerView ? swiperSlidePerView : 1),
                                direction: (swiperDirection ? swiperDirection : 'horizontal'),
                                loop: (swiperLoop ? swiperLoop : false),
                                nextButton: '.swiper-button-next',
                                prevButton: '.swiper-button-prev',
                                autoplay: (swiperAutoplay ? swiperAutoplay : false),
                                paginationClickable: true,
                                spaceBetween: (swiperMargin ? swiperMargin : 0),
                                mousewheelControl: ((swiperMousewheelControl) ? swiperMousewheelControl : false),
                                scrollbar: (swiperScrollbar ? swiperScrollbar : null),
                                scrollbarHide: false,
                                speed: (swiperSpeed ? swiperSpeed : 1000),
                                autoHeight: ((swiperAutoHeight == false) ? swiperAutoHeight : true),
                                effect: (swiperSlideEffect ? swiperSlideEffect : 'coverflow'),
                                fade: { crossFade: swiperCrossFade ? swiperCrossFade : false },
                                breakpoints: {
                                        1200: { slidesPerView: swprResponsive[3] ? swprResponsive[3] : 1, },
                                        992: { slidesPerView: swprResponsive[2] ? swprResponsive[2] : 1, },
                                        768: { slidesPerView: swprResponsive[1] ? swprResponsive[1] : 1, },
                                        576: { slidesPerView: swprResponsive[0] ? swprResponsive[0] : 1, }

                                },
                        });

                        $('.swiper-container').hover(function () {
                                swiper.stopAutoplay();
                        }, function () {
                                swiper.startAutoplay();
                        });


                });


        }
}

function isExists(elem) {
        if ($(elem).length > 0) {
                return true;
        }
        return false;
}

$.ajax({
        url: 'pizzahot.json',
        dataType: 'json',
        success: function (data) {
                var items = [];

                $.each(data, function (key, val) {

                        items.push('<li id="' + key + '">' + val + '</li>');

                });

                $('<ul/>', {
                        'class': 'interest-list',
                        html: items.join('')
                }).appendTo('body');

        },
        statusCode: {
                404: function () {
                        alert('There was a problem with the server.  Try again soon!');
                }
        }
});



// TEMP

var jsonFile = {
        "menu": {
                "salads": [{
                        "eng": " focaccia, rukola, pršuta, čeri-paradajz, parmezan ",
                        "name": "SALATA PRŠUTA",
                        "prices": ["400"]
                }, {
                        "eng": " rukola, čeri-paradajz, parmezan ",
                        "name": "SALATA RUKOLA",
                        "prices": ["300"]
                }, {
                        "eng": " čeri-paradajz,mocarela ",
                        "name": "SALATA ČERI",
                        "prices": ["300"]
                }],
                "dodaci": [{
                        "id": 1,
                        "name": "Pršuta",
                        "price": 210
                }, {
                        "id": 2,
                        "name": "Mocarela",
                        "price": 170
                }, {
                        "id": 3,
                        "name": "Slanina",
                        "price": 130
                }, {
                        "id": 4,
                        "name": "Šunka",
                        "price": 100
                }, {
                        "id": 5,
                        "name": "Čeri",
                        "price": 140
                }, {
                        "id": 6,
                        "name": "Rukola",
                        "price": 70
                }, {
                        "id": 7,
                        "name": "Paprika",
                        "price": 80
                }, {
                        "id": 8,
                        "name": "Piletina",
                        "price": 140
                }, {
                        "id": 9,
                        "name": "Parmezan",
                        "price": 0
                }, {
                        "id": 10,
                        "name": "Pelat",
                        "price": 0
                }, {
                        "id": 11,
                        "name": "Čili",
                        "price": 0
                }],
                "pasta": [{
                        "eng": " pelat, pančeta, parmezan,ljute papričice, luk, maslinovo ulje ",
                        "name": "AMATRICIANA",
                        "prices": ["410"],
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, pančeta, maslinovo ulje ",
                        "name": "CARBONARA",
                        "prices": ["410"]
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola, ementaler ",
                        "name": "QUATTRO FORMAGGI",
                        "prices": ["470"]
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola, piletina ",
                        "name": "DI POLLO",
                        "prices": ["490"]
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola, pršuta, pančeta ",
                        "name": "PROSCIUTO",
                        "prices": ["510"]
                }, {
                        "eng": " neutralna pavlaka, mocarela, piletina, pečurke, parmezan ",
                        "name": "DI POLLO FUNGHI",
                        "prices": ["510"]
                }, {
                        "eng": " neutralna pavlaka, mocarela, piletina, pesto alla genovese, parmezan ",
                        "name": "DI POLLO PESTO",
                        "prices": ["500"]
                }, {
                        "eng": " pelat, parmezan, 6 vrsta povrća (pečurke, paprika, luk, paradajz, čeri, rukola) ",
                        "name": "VEGETARIAN",
                        "prices": ["450"]
                }],
                "pizza": [{
                        "eng": " pelat, mocarela ",
                        "name": "MARGHERITA",
                        "prices": ["300", "480", "670"],
                        "new": true,
                        "img": "MARGHERITA.png"
                }, {
                        "eng": " pelat, mocarela, pečurke ",
                        "name": "FUNGHI",
                        "prices": ["320", "500", "690"],
                        "img": "FUNGHI.png"
                }, {
                        "eng": " pelat, mocarela, šunka  ",
                        "name": "VESUVIO",
                        "prices": ["340", "520", "710"],
                        "img": "VESUVIO.png"
                }, {
                        "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                        "name": "CAPRICCIOSA",
                        "prices": ["360", "530", "750"],
                        "img": "CAPRICCIOSA.png"
                }, {
                        "eng": " neutralnapavlaka, mocarela, parmezan, šunka, paradajz, rukola",
                        "name": "BIANCO ROSSO",
                        "prices": ["380", "580", "780"],
                        "img": "BIANCO-ROSSO.png"
                }, {
                        "eng": " pelat, mocarela, pančeta, parmezan",
                        "name": "SICILIA",
                        "prices": ["380", "580", "780"],
                        "img": "SICILIA.png"
                }, {
                        "eng": " pelat, mocarela, pršuta ",
                        "name": "PALERMO",
                        "prices": ["380", "580", "800"],
                        "img": "PALERMO.png"
                }, {
                        "eng": " pelat, mocarela, gorgonzola, pršuta, rukola, čeri-paradajz, parmezan",
                        "name": "PARIS",
                        "prices": ["460", "670", "880"]
                }, {
                        "eng": " pelat, mocarela, pršuta, rukola, čeri-paradajz, ulje-pikante ",
                        "name": "NEW YORK",
                        "prices": ["450", "650", "850"],
                        "img": "NEW-YORK.png"
                }, {
                        "eng": " pelat, mocarela, paprika, čeri, pečurke, rukola, crveni luk, masline",
                        "name": "VEGETARIANA",
                        "prices": ["370", "570", "770"],
                        "img": "VEGETARIANA.png"
                }, {
                        "eng": " pelat, mocarela, kulen, paprika ",
                        "name": "KULEN",
                        "prices": ["390", "590", "800"],
                        "img": "KULEN.png"
                }, {
                        "eng": " pelat, mocarela, tuna,crveni luk ",
                        "name": "TUNA",
                        "prices": ["390", "590", "760"],
                        "img": "TUNA.png"
                }, {
                        "eng": " neutralna pavlaka, pršuta, rukola, paradajz, parmezan ",
                        "name": "BIANCO PROSCUITO",
                        "prices": ["450", "650", "850"],
                        "img": "BIANCO-PROSCUITO.png"
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola ",
                        "name": "QUATTRO FORMAGGI",
                        "prices": ["400", "600", "810"],
                        "img": "QUATTRO-FORMAGGI.png"
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, dimljena piletina,kikiriki ",
                        "name": "DI POLLO",
                        "prices": ["380", "580", "780"],
                        "img": "DI-POLLO.png"
                }, {
                        "eng": " pelat, mocarela, parmezan, piletina, kulen, pančeta, luk, paprika ",
                        "name": "DI POLLO PICANTE",
                        "prices": ["460", "670", "880"],
                        "img": "DI-POLLO-PICANTE.png"
                }, {
                        "eng": " pelat, mocarela, šunka, kulen, pančeta, crveni luk, paprika ",
                        "name": "ROYAL",
                        "prices": ["480", "680", "880"],
                        "img": "ROYAL.png"
                }, {
                        "eng": " pelat, mocarela, dimljena piletina, pančeta, pečurke, paradajz, parmezan",
                        "name": "ROMA",
                        "prices": ["480", "680", "880"],
                        "img": "ROMA.png"
                }, {
                        "eng": " pelat, mocarela, dimljena piletina, pesto genovese ",
                        "name": "DI POLLO PESTO",
                        "prices": ["400", "600", "810"],
                        "img": "DI-POLLO-PESTO.png"
                }, {
                        "eng": " pelat, mocarela, pršuta, šunka, govedja pršuta, pančeta ",
                        "name": "QUATTRO CARNE",
                        "prices": ["440", "640", "840"],
                        "img": 'QUATTRO-CARNE.png'
                }, {
                        "eng": " pelat, mocarela, parmezan, pršuta, šunka, govedja pršuta, pančeta, kulen, rukola ",
                        "name": "PIZZA HOT 7",
                        "prices": ["530", "730", "930"]
                }, {
                        "eng": " nutella, voće, toping ",
                        "name": "SLATKA PIZZA",
                        "prices": ["450", "650", "850"]
                }, {
                        "eng": " vanila krem, voće, toping ",
                        "name": "SLATKA PIZZA",
                        "prices": ["450", "650", "850"]
                }, {
                        "eng": " nutella, lešnik ",
                        "name": "NUTELA PIZZA",
                        "prices": ["450", "650", "850"]
                }],
                "sandwitch": [{
                        "eng": " namaz, mocarela, šunka ",
                        "name": "AL PACINO",
                        "prices": ["200"]
                }, {
                        "eng": " namaz, mocarela, pršuta ",
                        "name": "PROSCIUTTO",
                        "prices": ["240"]
                }, {
                        "eng": " namaz, mocarela, govedja pršuta ",
                        "name": "CRUDO",
                        "prices": ["250"]
                }, {
                        "eng": " namaz, mocarela, tunjevina, crveni luk ",
                        "name": "TUNA",
                        "prices": ["230"]
                }, {
                        "eng": " namaz, mocarela, šunka, pršuta, govedja pršuta, pančeta ",
                        "name": "HOT",
                        "prices": ["270"]
                }, {
                        "eng": " namaz, mocarela, dimljena piletina, paradajz, pečurke, pančeta ",
                        "name": "DI POLLO",
                        "prices": ["350"]
                }, {
                        "eng": " namaz, mocarela, pršuta, čeri-paradajz, rukola ",
                        "name": "PROSCIUTO",
                        "prices": ["380"]
                }, {
                        "eng": " namaz, mocarela, pelat, kulen, luk, paprika, ljute papričice ",
                        "name": "CHILLI",
                        "prices": ["300"]
                }, {
                        "eng": " namaz, mocarela, pelat, govedja pršuta, čeri-paradajz, parmezan ",
                        "name": "BRESOLA",
                        "prices": ["360"]
                }, {
                        "eng": " namaz, mocarela, šunka, pančeta, paradajz ",
                        "name": "COTTO",
                        "prices": ["290"]
                }]
        },
        "orders": {
                "2020-01-15": {
                        "Vozac1": {
                                "04:10:38": {
                                        "order": {
                                                "eng": " pelat, mocarela ",
                                                "name": "MARGHERITA",
                                                "prices": ["300", "480", "670"]
                                        },
                                        "orderPrice": 480,
                                        "sides": [{
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }],
                                        "sidesCost": 270,
                                        "totalCost": 750
                                },
                                "04:11:32": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka  ",
                                                "name": "VESUVIO",
                                                "prices": ["340", "520", "710"]
                                        },
                                        "orderPrice": 710,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }],
                                        "sidesCost": 220,
                                        "totalCost": 930
                                },
                                "04:13:19": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                                                "name": "CAPRICCIOSA",
                                                "prices": ["360", "530", "750"]
                                        },
                                        "orderPrice": 530,
                                        "sides": [{
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }],
                                        "sidesCost": 290,
                                        "totalCost": 820
                                },
                                "04:13:25": {
                                        "order": {
                                                "eng": " pelat, mocarela, pečurke ",
                                                "name": "FUNGHI",
                                                "prices": ["320", "500", "690"]
                                        },
                                        "orderPrice": 690,
                                        "sides": [{
                                                "checked": true,
                                                "id": 2,
                                                "name": "Mocarela",
                                                "price": 170
                                        }, {
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }],
                                        "sidesCost": 580,
                                        "totalCost": 1270
                                },
                                "04:15:30": {
                                        "order": {
                                                "eng": " pelat, mocarela, kobasica, kulen, luk, paprika, BBQ sos ",
                                                "name": "GRANDE",
                                                "prices": ["460", "670", "880"]
                                        },
                                        "orderPrice": 880,
                                        "sides": [{
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }, {
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }],
                                        "sidesCost": 370,
                                        "totalCost": 1250
                                },
                                "04:16:15": {
                                        "order": {
                                                "eng": " pelat, mocarela ",
                                                "name": "MARGHERITA",
                                                "prices": ["300", "480", "670"]
                                        },
                                        "orderPrice": 480,
                                        "sides": [{
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 310,
                                        "totalCost": 790
                                },
                                "04:16:19": {
                                        "order": {
                                                "eng": " pelat, mocarela, pečurke ",
                                                "name": "FUNGHI",
                                                "prices": ["320", "500", "690"]
                                        },
                                        "orderPrice": 690,
                                        "sides": [{
                                                "checked": true,
                                                "id": 1,
                                                "name": "Pršuta",
                                                "price": 210
                                        }, {
                                                "checked": true,
                                                "id": 2,
                                                "name": "Mocarela",
                                                "price": 170
                                        }, {
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }],
                                        "sidesCost": 610,
                                        "totalCost": 1300
                                },
                                "04:20:38": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka  ",
                                                "name": "VESUVIO",
                                                "prices": ["340", "520", "710"]
                                        },
                                        "orderPrice": 520,
                                        "sides": [{
                                                "checked": true,
                                                "id": 1,
                                                "name": "Pršuta",
                                                "price": 210
                                        }, {
                                                "checked": true,
                                                "id": 2,
                                                "name": "Mocarela",
                                                "price": 170
                                        }, {
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 10,
                                                "name": "Pelat",
                                                "price": 0
                                        }],
                                        "sidesCost": 690,
                                        "totalCost": 1210
                                },
                                "04:20:45": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                                                "name": "CAPRICCIOSA",
                                                "prices": ["360", "530", "750"]
                                        },
                                        "orderPrice": 530,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }],
                                        "sidesCost": 350,
                                        "totalCost": 880
                                },
                                "04:20:52": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka  ",
                                                "name": "VESUVIO",
                                                "prices": ["340", "520", "710"]
                                        },
                                        "orderPrice": 710,
                                        "sides": [{
                                                "checked": true,
                                                "id": 1,
                                                "name": "Pršuta",
                                                "price": 210
                                        }, {
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }, {
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }, {
                                                "checked": true,
                                                "id": 11,
                                                "name": "Čili",
                                                "price": 0
                                        }],
                                        "sidesCost": 790,
                                        "totalCost": 1500
                                },
                                "04:20:57": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                                                "name": "CAPRICCIOSA",
                                                "prices": ["360", "530", "750"]
                                        },
                                        "orderPrice": 530,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }],
                                        "sidesCost": 350,
                                        "totalCost": 880
                                },
                                "04:22:31": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka  ",
                                                "name": "VESUVIO",
                                                "prices": ["340", "520", "710"]
                                        },
                                        "orderPrice": 520,
                                        "sides": [{
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 150,
                                        "time": "04:01:35 2020-01-15",
                                        "totalCost": 670
                                },
                                "04:23:07": {
                                        "order": {
                                                "eng": " pelat, mocarela, dimljena piletina, pesto genovese ",
                                                "name": "DI POLLO PESTO",
                                                "prices": ["400", "600", "810"]
                                        },
                                        "orderPrice": 600,
                                        "sides": [{
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }, {
                                                "checked": true,
                                                "id": 10,
                                                "name": "Pelat",
                                                "price": 0
                                        }, {
                                                "checked": true,
                                                "id": 11,
                                                "name": "Čili",
                                                "price": 0
                                        }],
                                        "sidesCost": 350,
                                        "time": "04:23:07 2020-01-15",
                                        "totalCost": 950
                                }
                        },
                        "Vozac2": {
                                "04:11:57": {
                                        "order": {
                                                "eng": " pelat, mocarela, pršuta ",
                                                "name": "PALERMO",
                                                "prices": ["380", "580", "800"]
                                        },
                                        "orderPrice": 800,
                                        "sides": [{
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 310,
                                        "totalCost": 1110
                                }
                        },
                        "Vozač1": {
                                "15:04:42": {
                                        "order": {
                                                "eng": " pelat, mocarela ",
                                                "name": "MARGHERITA",
                                                "prices": ["300", "480", "670"]
                                        },
                                        "orderPrice": 480,
                                        "sides": [{
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }],
                                        "sidesCost": 310,
                                        "time": "15:04:42 2020-01-15",
                                        "totalCost": 790
                                },
                                "15:07:01": {
                                        "order": {
                                                "eng": " pelat, mocarela ",
                                                "name": "MARGHERITA",
                                                "prices": ["300", "480", "670"]
                                        },
                                        "orderPrice": 480,
                                        "sides": [{
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }, {
                                                "checked": true,
                                                "id": 10,
                                                "name": "Pelat",
                                                "price": 0
                                        }, {
                                                "checked": true,
                                                "id": 11,
                                                "name": "Čili",
                                                "price": 0
                                        }],
                                        "sidesCost": 0,
                                        "time": "15:07:01 2020-01-15",
                                        "totalCost": 480
                                },
                                "15:10:29": {
                                        "order": {
                                                "eng": " namaz, mocarela, govedja pršuta ",
                                                "name": "CRUDO",
                                                "prices": ["250"]
                                        },
                                        "orderPrice": 250,
                                        "sides": [{
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }, {
                                                "checked": true,
                                                "id": 10,
                                                "name": "Pelat",
                                                "price": 0
                                        }],
                                        "sidesCost": 140,
                                        "time": "15:10:29 2020-01-15",
                                        "totalCost": 390
                                },
                                "15:10:45": {
                                        "order": {
                                                "eng": " namaz, mocarela, pršuta, čeri-paradajz, rukola ",
                                                "name": "PROSCIUTO",
                                                "prices": ["380"]
                                        },
                                        "orderPrice": 380,
                                        "sides": [{
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }],
                                        "sidesCost": 300,
                                        "time": "15:10:45 2020-01-15",
                                        "totalCost": 680
                                },
                                "15:15:08": {
                                        "order": {
                                                "eng": " pelat, pančeta, parmezan,ljute papričice, luk, maslinovo ulje ",
                                                "name": "AMATRICIANA",
                                                "prices": ["410"]
                                        },
                                        "orderPrice": 410,
                                        "sides": [{
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }],
                                        "sidesCost": 210,
                                        "time": "15:15:08 2020-01-15",
                                        "totalCost": 620
                                },
                                "15:15:16": {
                                        "order": {
                                                "eng": " focaccia, rukola, pršuta, čeri-paradajz, parmezan ",
                                                "name": "SALATA PRŠUTA",
                                                "prices": ["400"]
                                        },
                                        "orderPrice": 400,
                                        "sides": [{
                                                "checked": true,
                                                "id": 1,
                                                "name": "Pršuta",
                                                "price": 210
                                        }, {
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 420,
                                        "time": "15:15:16 2020-01-15",
                                        "totalCost": 820
                                },
                                "15:21:49": {
                                        "order": {
                                                "eng": " namaz, mocarela, tunjevina, crveni luk ",
                                                "name": "TUNA",
                                                "prices": ["230"]
                                        },
                                        "orderPrice": 230,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }],
                                        "sidesCost": 360,
                                        "time": "15:21:49 2020-01-15",
                                        "totalCost": 590
                                },
                                "15:21:55": {
                                        "order": {
                                                "eng": " rukola, čeri-paradajz, parmezan ",
                                                "name": "SALATA RUKOLA",
                                                "prices": ["300"]
                                        },
                                        "orderPrice": 300,
                                        "sides": [{
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }],
                                        "sidesCost": 150,
                                        "time": "15:21:55 2020-01-15",
                                        "totalCost": 450
                                },
                                "15:33:18": {
                                        "order": {
                                                "eng": " pelat, mocarela ",
                                                "name": "MARGHERITA",
                                                "prices": ["300", "480", "670"]
                                        },
                                        "orderPrice": 480,
                                        "sides": [{
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }],
                                        "sidesCost": 150,
                                        "time": "15:33:18 2020-01-15",
                                        "totalCost": 630
                                },
                                "15:33:24": {
                                        "order": {
                                                "eng": " neutralnapavlaka, mocarela, parmezan, šunka, paradajz, rukola",
                                                "name": "BIANCO ROSSO",
                                                "prices": ["380", "580", "780"]
                                        },
                                        "orderPrice": 580,
                                        "sides": [{
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 10,
                                                "name": "Pelat",
                                                "price": 0
                                        }],
                                        "sidesCost": 140,
                                        "time": "15:33:24 2020-01-15",
                                        "totalCost": 720
                                },
                                "15:33:34": {
                                        "order": {
                                                "eng": " čeri-paradajz,mocarela ",
                                                "name": "SALATA ČERI",
                                                "prices": ["300"]
                                        },
                                        "orderPrice": 300,
                                        "sides": [{
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }],
                                        "sidesCost": 100,
                                        "time": "15:33:34 2020-01-15",
                                        "totalCost": 400
                                },
                                "18:19:36": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka  ",
                                                "name": "VESUVIO",
                                                "prices": ["340", "520", "710"]
                                        },
                                        "orderPrice": 710,
                                        "sidesCost": 0,
                                        "time": "18:19:36 2020-01-15",
                                        "totalCost": 710
                                },
                                "23:06:51": {
                                        "order": {
                                                "eng": " čeri-paradajz,mocarela ",
                                                "name": "SALATA ČERI",
                                                "prices": ["300"]
                                        },
                                        "orderPrice": 300,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 290,
                                        "time": "23:06:51 2020-01-15",
                                        "totalCost": 590
                                },
                                "23:07:00": {
                                        "order": {
                                                "eng": " namaz, mocarela, tunjevina, crveni luk ",
                                                "name": "TUNA",
                                                "prices": ["230"]
                                        },
                                        "orderPrice": 230,
                                        "sides": [{
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 80,
                                        "time": "23:07:00 2020-01-15",
                                        "totalCost": 310
                                },
                                "23:07:12": {
                                        "order": {
                                                "eng": " namaz, mocarela, šunka ",
                                                "name": "AL PACINO",
                                                "prices": ["200"]
                                        },
                                        "orderPrice": 200,
                                        "sides": [{
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 80,
                                        "time": "23:07:12 2020-01-15",
                                        "totalCost": 280
                                },
                                "23:07:16": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                                                "name": "CAPRICCIOSA",
                                                "prices": ["360", "530", "750"]
                                        },
                                        "orderPrice": 530,
                                        "sides": [{
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 250,
                                        "time": "23:07:16 2020-01-15",
                                        "totalCost": 780
                                },
                                "23:07:20": {
                                        "order": {
                                                "eng": " neutralnapavlaka, mocarela, parmezan, šunka, paradajz, rukola",
                                                "name": "BIANCO ROSSO",
                                                "prices": ["380", "580", "780"]
                                        },
                                        "orderPrice": 580,
                                        "sides": [{
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }],
                                        "sidesCost": 220,
                                        "time": "23:07:20 2020-01-15",
                                        "totalCost": 800
                                },
                                "23:08:06": {
                                        "order": {
                                                "eng": " pelat, pančeta, parmezan,ljute papričice, luk, maslinovo ulje ",
                                                "name": "AMATRICIANA",
                                                "prices": ["410"]
                                        },
                                        "orderPrice": 410,
                                        "sides": [{
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }, {
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }],
                                        "sidesCost": 240,
                                        "time": "23:08:06 2020-01-15",
                                        "totalCost": 650
                                }
                        },
                        "Vozač2": {
                                "04:25:14": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                                                "name": "CAPRICCIOSA",
                                                "prices": ["360", "530", "750"]
                                        },
                                        "orderPrice": 750,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }],
                                        "sidesCost": 350,
                                        "time": "04:25:14 2020-01-15",
                                        "totalCost": 1100
                                },
                                "04:47:25": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                                                "name": "CAPRICCIOSA",
                                                "prices": ["360", "530", "750"]
                                        },
                                        "orderPrice": 530,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }],
                                        "sidesCost": 210,
                                        "time": "04:47:25 2020-01-15",
                                        "totalCost": 740
                                }
                        }
                },
                "2020-01-16": {
                        "Vozač1": {
                                "00:07:28": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                                                "name": "CAPRICCIOSA",
                                                "prices": ["360", "530", "750"]
                                        },
                                        "orderPrice": 530,
                                        "sides": [{
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }],
                                        "sidesCost": 340,
                                        "time": "00:07:28 2020-01-16",
                                        "totalCost": 870
                                },
                                "00:08:09": {
                                        "order": {
                                                "eng": " pelat, mocarela, povrće ",
                                                "name": "VEGETARIJANA",
                                                "prices": ["370", "570", "770"]
                                        },
                                        "orderPrice": 570,
                                        "sides": [{
                                                "checked": true,
                                                "id": 2,
                                                "name": "Mocarela",
                                                "price": 170
                                        }, {
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }, {
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }],
                                        "sidesCost": 400,
                                        "time": "00:08:09 2020-01-16",
                                        "totalCost": 970
                                },
                                "00:08:15": {
                                        "order": {
                                                "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola, ementaler ",
                                                "name": "QUATTRO FORMAGGI",
                                                "prices": ["470"]
                                        },
                                        "orderPrice": 470,
                                        "sides": [{
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }],
                                        "sidesCost": 220,
                                        "time": "00:08:15 2020-01-16",
                                        "totalCost": 690
                                },
                                "00:08:26": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                                                "name": "CAPRICCIOSA",
                                                "prices": ["360", "530", "750"]
                                        },
                                        "orderPrice": 530,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 220,
                                        "time": "00:08:26 2020-01-16",
                                        "totalCost": 750
                                },
                                "00:08:50": {
                                        "order": {
                                                "eng": " namaz, mocarela, govedja pršuta ",
                                                "name": "CRUDO",
                                                "prices": ["250"]
                                        },
                                        "orderPrice": 250,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 290,
                                        "time": "00:08:50 2020-01-16",
                                        "totalCost": 540
                                },
                                "00:09:14": {
                                        "order": {
                                                "eng": " namaz, mocarela, pršuta ",
                                                "name": "PROSCIUTTO",
                                                "prices": ["240"]
                                        },
                                        "orderPrice": 240,
                                        "sides": [{
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }, {
                                                "checked": true,
                                                "id": 8,
                                                "name": "Piletina",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }],
                                        "sidesCost": 290,
                                        "time": "00:09:14 2020-01-16",
                                        "totalCost": 530
                                },
                                "00:09:28": {
                                        "order": {
                                                "eng": " namaz, mocarela, govedja pršuta ",
                                                "name": "CRUDO",
                                                "prices": ["250"]
                                        },
                                        "orderPrice": 250,
                                        "sides": [{
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }],
                                        "sidesCost": 0,
                                        "time": "00:09:28 2020-01-16",
                                        "totalCost": 250
                                },
                                "00:15:18": {
                                        "order": {
                                                "eng": " pelat, mocarela ",
                                                "name": "MARGHERITA",
                                                "prices": ["300", "480", "670"]
                                        },
                                        "orderPrice": 480,
                                        "sides": [{
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 150,
                                        "time": "00:15:18 2020-01-16",
                                        "totalCost": 630
                                },
                                "00:15:22": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                                                "name": "CAPRICCIOSA",
                                                "prices": ["360", "530", "750"]
                                        },
                                        "orderPrice": 750,
                                        "sides": [{
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 150,
                                        "time": "00:15:22 2020-01-16",
                                        "totalCost": 900
                                },
                                "00:45:55": {
                                        "order": {
                                                "eng": " pelat, mocarela, pršuta ",
                                                "name": "PALERMO",
                                                "prices": ["380", "580", "800"]
                                        },
                                        "orderPrice": 580,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }],
                                        "sidesCost": 210,
                                        "time": "00:45:55 2020-01-16",
                                        "totalCost": 790
                                },
                                "00:45:59": {
                                        "order": {
                                                "eng": " pelat, mocarela, pršuta ",
                                                "name": "PALERMO",
                                                "prices": ["380", "580", "800"]
                                        },
                                        "orderPrice": 800,
                                        "sides": [{
                                                "checked": true,
                                                "id": 9,
                                                "name": "Parmezan",
                                                "price": 0
                                        }, {
                                                "checked": true,
                                                "id": 11,
                                                "name": "Čili",
                                                "price": 0
                                        }],
                                        "sidesCost": 0,
                                        "time": "00:45:59 2020-01-16",
                                        "totalCost": 800
                                },
                                "15:06:13": {
                                        "order": {
                                                "eng": " pelat, mocarela, šunka  ",
                                                "name": "VESUVIO",
                                                "prices": ["340", "520", "710"]
                                        },
                                        "orderPrice": 710,
                                        "sides": [{
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }],
                                        "sidesCost": 70,
                                        "time": "15:06:13 2020-01-15",
                                        "totalCost": 780
                                },
                                "16:19:04": {
                                        "order": {
                                                "eng": " pelat, pančeta, parmezan,ljute papričice, luk, maslinovo ulje ",
                                                "name": "AMATRICIANA",
                                                "prices": ["410"]
                                        },
                                        "orderPrice": 410,
                                        "sides": [{
                                                "checked": true,
                                                "id": 1,
                                                "name": "Pršuta",
                                                "price": 210
                                        }, {
                                                "checked": true,
                                                "id": 2,
                                                "name": "Mocarela",
                                                "price": 170
                                        }, {
                                                "checked": true,
                                                "id": 4,
                                                "name": "Šunka",
                                                "price": 100
                                        }],
                                        "sidesCost": 480,
                                        "time": "16:19:04 2020-01-16",
                                        "totalCost": 890
                                }
                        }
                },
                "2020-01-17": {
                        "Vozač1": {
                                "15:56:11": {
                                        "order": {
                                                "eng": " pelat, mocarela, pršuta ",
                                                "name": "PALERMO",
                                                "prices": ["380", "580", "800"]
                                        },
                                        "orderPrice": 800,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }, {
                                                "checked": true,
                                                "id": 6,
                                                "name": "Rukola",
                                                "price": 70
                                        }, {
                                                "checked": true,
                                                "id": 11,
                                                "name": "Čili",
                                                "price": 0
                                        }],
                                        "sidesCost": 210,
                                        "time": "15:56:11 2020-01-17",
                                        "totalCost": 1010
                                },
                                "15:56:52": {
                                        "order": {
                                                "eng": " čeri-paradajz,mocarela ",
                                                "name": "SALATA ČERI",
                                                "prices": ["300"]
                                        },
                                        "orderPrice": 300,
                                        "sides": [{
                                                "checked": true,
                                                "id": 7,
                                                "name": "Paprika",
                                                "price": 80
                                        }],
                                        "sidesCost": 80,
                                        "time": "15:56:52 2020-01-17",
                                        "totalCost": 380
                                }
                        }
                },
                "2020-02-03": {
                        "Vozač1": {
                                "17:55:58": {
                                        "order": {
                                                "eng": " neutralna pavlaka, mocarela, piletina, pesto alla genovese, parmezan ",
                                                "name": "DI POLLO PESTO",
                                                "prices": ["500"]
                                        },
                                        "orderPrice": 500,
                                        "sides": [{
                                                "checked": true,
                                                "id": 1,
                                                "name": "Pršuta",
                                                "price": 210
                                        }, {
                                                "checked": true,
                                                "id": 3,
                                                "name": "Slanina",
                                                "price": 130
                                        }],
                                        "sidesCost": 340,
                                        "time": "17:55:58 2020-02-03",
                                        "totalCost": 840
                                },
                                "17:56:30": {
                                        "order": {
                                                "eng": " rukola, čeri-paradajz, parmezan ",
                                                "name": "SALATA RUKOLA",
                                                "prices": ["300"]
                                        },
                                        "orderPrice": 300,
                                        "sides": [{
                                                "checked": true,
                                                "id": 5,
                                                "name": "Čeri",
                                                "price": 140
                                        }],
                                        "sidesCost": 140,
                                        "time": "17:56:30 2020-02-03",
                                        "totalCost": 440
                                }
                        }
                }
        },
        "users": [{
                "name": "Vozač1",
                "password": "pizzahot"
        }, {
                "name": "Vozač2",
                "password": "230916"
        }, {
                "name": "Admin",
                "password": "080266"
        }]
}


console.log(jsonFile.menu.pizza), 'menu';


$.each(jsonFile.menu, function (key, val) {
        console.log(key, val);
        if (key !== 'salads') {
                var data = [];
                var placeholder = `images/seller-2-200x200.png`;
                if (key == 'pasta') {
                        placeholder = 'images/products/pasta_placeholder.png'
                }
                if (key == 'sandwitch') {
                        placeholder = 'images/products/sandwitch_placeholder.png'
                }
                if (key == 'salads') {
                        placeholder = 'images/products/salad_placeholder.png'
                }
                $.each(val, function (key, r) {

                        data += `<div class="col-lg-3 col-md-4  col-sm-6 ">
                <div class="center-text mb-30">
                        <div class="ïmg-200x mlr-auto pos-relative">
                                ${r.new ? `<h6 class="ribbon-cont"><div class="ribbon primary"></div><b>NOVO</b></h6>` : ''}
                                <img src="${r.img ? `./images/products/${r.img}` : placeholder}" alt="">
                        </div>
                        <h4 class="mt-20">${r.name}</h4>
                        <h6 class="mt-10">${r.eng}</h6>
                        <h5 class="mt-5">
                                <b>${r.prices ? r.prices : ''} rsd</b>
                        </h5>
                </div>
        </div>`
                });
                $(data).appendTo(`#${key} .row`);
        }
});
