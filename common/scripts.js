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

// TEMP

var jsonFile = {
        "menu": {
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
                "dodaci_palacinke": [{
                        "id": 12,
                        "name": "Plazma keks",
                        "price": 30
                }],
                "pasta": [{
                        "eng": " pelat, pančeta, parmezan,ljute papričice, luk, maslinovo ulje ",
                        "name": "AMATRICIANA",
                        "prices": ["410"],
                        "img": 'AMATRICIANA-PASTA.png'
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, pančeta, maslinovo ulje ",
                        "name": "CARBONARA",
                        "prices": ["410"],
                        "img": 'pasta1.png'
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola, ementaler ",
                        "name": "QUATTRO FORMAGGI",
                        "prices": ["470"],
                        "img": 'SIR-PASTA.png'
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola, piletina ",
                        "name": "DI POLLO",
                        "prices": ["490"],
                        "img": 'DIPOLLO-PASTA.png'
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola, pršuta, pančeta ",
                        "name": "PROSCIUTO",
                        "prices": ["510"],
                        "img": 'PRSUTA-PASTA.png'
                }, {
                        "eng": " neutralna pavlaka, mocarela, piletina, pečurke, parmezan ",
                        "name": "DI POLLO FUNGHI",
                        "prices": ["510"],
                        "img": 'DIPOLLOFUNGI-PASTA.png'
                }, {
                        "eng": " pelat, mocarela,crevni luk, paprika, pečurke, čeri paradajz, rukola, parmezan",
                        "name": "VEGETARIAN",
                        "prices": ["450"],
                        "new": true,
                        "img": 'pasta-2-300x300.png'
                }],
                "standard": [{
                        "eng": " pelat, mocarela ",
                        "name": "MARGHERITA",
                        "prices": ["300", "530", "720"],
                        "img": "MARGHERITA.png"
                }, {
                        "eng": " pelat, mocarela, pečurke ",
                        "name": "FUNGHI",
                        "prices": ["320", "550", "730"],
                        "img": "FUNGHI.png"
                }, {
                        "eng": " pelat, mocarela, šunka  ",
                        "name": "VESUVIO",
                        "prices": ["340", "570", "750"],
                        "img": "VESUVIO.png"
                }, {
                        "eng": " pelat, mocarela, šunka, pečurke, origano, masline",
                        "name": "CAPRICCIOSA",
                        "prices": ["360", "580", "790"],
                        "img": "CAPRICCIOSA.png"
                }, {
                        "eng": " pelat, mocarela, pančeta, parmezan",
                        "name": "SICILIA",
                        "prices": ["380", "630", "820"],
                        "img": "SICILIA.png"
                }, {
                        "eng": " pelat, mocarela, pršuta ",
                        "name": "PALERMO",
                        "prices": ["380", "630", "850"],
                        "img": "PALERMO.png"
                }, {
                        "eng": " pelat, mocarela, paprika, čeri, pečurke, rukola, crveni luk, masline",
                        "name": "VEGETARIANA",
                        "prices": ["370", "620", "800"],
                        "img": "VEGETARIANA.png"
                }, {
                        "eng": " pelat, mocarela, kulen ",
                        "name": "KULEN",
                        "prices": ["390", "630", "850"],
                        "img": "KULEN.png"
                }, {
                        "eng": " pelat, mocarela, tuna,crveni luk ",
                        "name": "TUNA",
                        "prices": ["390", "640", "810"],
                        "img": "TUNA.png"
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola, orasi, rukola",
                        "name": "FORMAGGI VERDE",
                        "prices": ["430", "680", "880"],
                        "new": true,
                        "img": "FORMAGGI-VERDE.png"
                }],
                "sandwitch": [{
                        "eng": " namaz, mocarela, šunka ",
                        "name": "AL PACINO",
                        "prices": ["230"],
                        "img": 'ALPACINO-SENDVIC.png'
                }, {
                        "eng": " namaz, mocarela, pršuta ",
                        "name": "PROSCIUTTO",
                        "prices": ["270"],
                        "img": 'PRSUTA-SENDVIC.png'
                }, {
                        "eng": " namaz, mocarela, govedja pršuta ",
                        "name": "CRUDO",
                        "prices": ["290"],
                        "img": 'CRUDO-SENDVIC.png'
                }, {
                        "eng": " namaz, mocarela, tunjevina, crveni luk ",
                        "name": "TUNA",
                        "prices": ["260"],
                        "img": 'TUNA-SENDVIC.png'
                }, {
                        "eng": " namaz, mocarela, paprika, pečurke, rukola, paradajz, crveni luk, čeri",
                        "name": "VEGETARIAN",
                        "prices": ["260"],
                        "new": true,
                        "img": 'VEGETARIAN-SENDVIC.png'
                }, {
                        "eng": " namaz, mocarela, dimljena piletina",
                        "name": "PILETINA",
                        "prices": ["260"],
                        "new": true,
                        "img": 'DIPOLLO-SENDVIC.png'
                }, {
                        "eng": " namaz, mocarela, kulen",
                        "name": "KULEN",
                        "prices": ["260"],
                        "new": true,
                        "img": 'KULEN-SENDVIC.png'
                }, {
                        "eng": " namaz, mocarela, pančeta",
                        "name": "PANČETA",
                        "prices": ["260"],
                        "new": true,
                        "img": 'PANCETA-SENDVIC.png'
                }, {
                        "eng": " namaz, mocarela, šunka, pršuta, govedja pršuta, pančeta ",
                        "name": "HOT",
                        "prices": ["300"],
                        "img": 'HOT-SENDVIC.png'
                }],
                "white": [{
                        "eng": " neutralna pavlaka, mocarela, parmezan, gorgonzola ",
                        "name": "QUATTRO FORMAGGI",
                        "prices": ["400", "650", "850"],
                        "img": "QUATTRO-FORMAGGI.png"
                }, {
                        "eng": " neutralnapavlaka, mocarela, parmezan, šunka, paradajz, rukola",
                        "name": "BIANCO ROSSO",
                        "prices": ["380", "630", "830"],
                        "img": "BIANCO-ROSSO.png"
                }, {
                        "eng": " neutralna pavlaka, mocarela, parmezan, dimljena piletina,kikiriki ",
                        "name": "DI POLLO",
                        "prices": ["380", "630", "830"],
                        "img": "DI-POLLO.png"
                }, {
                        "eng": " pelat, mocarela, dimljena piletina, pesto genovese ",
                        "name": "DI POLLO PESTO",
                        "prices": ["400", "630", "830"],
                        "img": "DI-POLLO-PESTO.png"
                }, {
                        "eng": " neutralna pavlaka, mocarela, gorgonzola, pršuta, parmezan, orasi, suve šljive",
                        "name": "MONACO",
                        "prices": ["500", "750", "950"],
                        "new": true
                }, {
                        "eng": " neutralna pavlaka, pršuta, rukola, paradajz, parmezan ",
                        "name": "BIANCO PROSCUITO",
                        "prices": ["450", "700", "900"],
                        "img": "BIANCO-PROSCUITO.png"
                }],
                "premium": [{
                        "eng": " pelat, mocarela, pršuta, rukola, čeri-paradajz, ulje-pikante ",
                        "name": "NEW YORK",
                        "prices": ["450", "700", "880"],
                        "img": "NEW-YORK.png"
                }, {
                        "eng": " pelat, mocarela, šunka, kulen, pančeta, crveni luk, paprika ",
                        "name": "ROYAL",
                        "prices": ["480", "730", "930"],
                        "img": "ROYAL.png"
                }, {
                        "eng": " pelat, mocarela, gorgonzola, pršuta, rukola, čeri-paradajz, parmezan",
                        "name": "PARIS",
                        "prices": ["460", "720", "900"],
                        "img": "seller-6-200x200.png"
                }, {
                        "eng": " pelat, govedja pršuta, rukola, čeri paradajz",
                        "name": "BRESAOLA",
                        "prices": ["460", "730", "910"],
                        "new": true,
                        "img": "BRESAOLA.png"
                }, {
                        "eng": " pelat, mocarela, pršuta, šunka, govedja pršuta, pančeta ",
                        "name": "QUATTRO CARNE",
                        "prices": ["440", "700", "910"],
                        "img": 'QUATTRO-CARNE.png'
                }, {
                        "eng": " pelat, mocarela, dimljena piletina, pančeta, pečurke, paradajz, parmezan",
                        "name": "ROMA",
                        "prices": ["480", "730", "930"],
                        "img": "ROMA.png"
                }, {
                        "eng": " pelat, mocarela, parmezan, pršuta, šunka, govedja pršuta, pančeta, kulen, rukola ",
                        "name": "PIZZA HOT 7",
                        "prices": ["530", "780", "980"],
                        "img": "PIZZA_HOT.png"
                }, {
                        "eng": " pelat, mocarela, parmezan, piletina, kulen, pančeta, luk, paprika ",
                        "name": "DI POLLO PICANTE",
                        "prices": ["460", "720", "930"],
                        "img": "DI-POLLO-PICANTE.png"
                }],
                "palacinke": [{
                        "eng": "nutella",
                        "name": "NUTELLA",
                        "prices": ["180"],
                        "img":  "nutella-placeholder.png"
                }, {
                        "eng": "eurokrem",
                        "name": "EURO KREM",
                        "prices": ["170"],
                        "img":  "EUROKREM-PALACINKA.png"
                }, {
                        "eng": "med",
                        "name": "MED",
                        "prices": ["170"],
                        "img":  "MED-PALACINKA.png"
                }, {
                        "eng": "dzem",
                        "name": "DžEM",
                        "prices": ["170"],
                        "img":  "DZEM-PALACINKA.png"
                }],
                // "sweet": [{
                //         "eng": " nutella, banana, šećer u prahu",
                //         "name": "NUTELLA BANANA",
                //         "prices": ["450", "650", "850"],
                //         "img":  "NUTELLA-BANANA.png"
                // }, {
                //         "eng": " nutella, lešnik, šećer u prahu",
                //         "name": "NUTELLA LEŠNIK",
                //         "prices": ["450", "650", "850"],
                //         "img":  "NUTELLA-BANANA.png"
                // }, {
                //         "eng": " vanila krem, voće, šećer u prahu",
                //         "name": "VANILLA",
                //         "prices": ["450", "650", "850"],
                //         "img":  "VANILLA.png"
                // }]
        }
}



$.each(jsonFile.menu, function (key, val) {
        if (key !== 'salads') {
                var data = [];
                var placeholder = `images/seller-2-200x200.png`;
                if (key == 'pasta') {
                        placeholder = 'images/products/pasta_placeholder.png'
                }
                if (key == 'sandwitch') {
                        placeholder = 'images/products/sandwitch-placeholder.png'
                }
                if (key == 'salads') {
                        placeholder = 'images/products/salad_placeholder.png'
                }
                $.each(val, function (key, r) {

                        data += `<div class="col-lg-3 col-md-4  col-sm-6 menu-item-wrapper">
                <div class="center-text mb-30">
                        <div class="ïmg-200x mlr-auto pos-relative">
                                ${r.new ? `<h6 class="ribbon-cont"><div class="ribbon primary"></div><b>NOVO</b></h6>` : ''}
                                <img src="${r.img ? `./images/products/${r.img}` : placeholder}" alt="">
                        </div>
                        <h4 class="mt-20">${r.name}</h4>
                        <h6 class="mt-10 capitalise">${r.eng}</h6>
                        <h5 class="mt-5 prices">
                                <b>${r.prices ? r.prices.toString().replace(/,/g, "<span class='highlight'> / </span>") : ''} rsd</b>
                        </h5>
                </div>
        </div>`
                });
                $(data).appendTo(`#${key} .row`);
        }
});

$(document).keydown(function (e) {
        if (e.which === 123) {

                return false;

        }

});

$('.menu-anchor').on('click', function () {
        var menu = $('#premium').offset().top - 80;
        $('html, body').animate({
                scrollTop: menu
        }, 500);
});