$(document).ready(function(){

    $('.header-menu_open').on('click', function() {
        $(this).add('.header-nav nav').toggleClass('active');
        $('body').toggleClass('menu-opened');
    });

	$('.layout-grid').masonry({
		itemSelector: '.layout-item',
		columnWidth: '.layout-sizer',
		percentPosition: true,
		gutter: 4
	});

	$('.js-search').on('click', function(){
        window.location.href = '/search/';
    });

	articleCounter = 0;
	$('article h1, article h2, article h3, article h4').each(function(){

		let text = $(this).text();
		$('.js-article-list').append('<li><a href="#id-'+articleCounter+'">'+text+'</a></li>');
		$(this).attr('id', 'id-'+articleCounter);
		$(this).data('id', 'id-'+articleCounter);

		articleCounter++;
	});

	if(articleCounter > 1) $('.article-list').addClass('active');

    $('.js-authors-carousel').owlCarousel({
        loop: false,
        margin: 30,
        dots: false,
        nav: false,
        autoWidth: true,
        responsive : {
            0 : {
                margin: 20,
                mouseDrag: true,
                touchDrag: true
            },
            768 : {
                margin: 15,
                mouseDrag: false,
                touchDrag: false,
                items: 4
            },
            992 : {
                margin: 25,
                mouseDrag: false,
                touchDrag: false,
                items: 4
            },
        }
    });

});