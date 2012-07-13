// Avoid `console` errors in browsers that lack a console
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// place any jQuery/helper plugins in here, instead of separate, slower script files.

//quiz plugin
(function ( $ ){
	var currentIndex, //current quiz index
		qLength, //question length
		methods = {
		init: function(options)
		{
			var settings = $.extend( {
		      'start' : 1
		    }, options);
			return this.each(function(){
				var $this = this;
				$(window).bind('load.quizSelector', methods.build($this, settings.start));
				$('article input[type="radio"]', $this).click(function(){
					methods.markAnswer($this, this);
				});					
				
			});		
		},
		build: function($this, start)
		{
			var qWidth = $('article', $this).width();
			qLength = $('article', $this).length;
			
			$('.questions_answer', $this).width(Math.floor(qWidth * qLength));
			$('.questions_answer article:first', $this).addClass('current');
			var questionCounter = '<p class="questionCounter"><span>' + start + '</span> of ' + (qLength - 1) + '</p>'
			$($this).append(questionCounter);
			$('.questions_answer article').not('.current').hide(); //hide all articles
			
		},
		markAnswer: function($this)
		{
			$(this).parent('li').addClass('answered');
			setTimeout(function(){
				$('article.current').hide('explode', {pieces: 12}, 500, function(){
					currentIndex = $('article').index(this) + 1;
					$(this).removeClass('current');
					console.log(qLength - 1);
					console.log(currentIndex);
					if(qLength - 1 <= currentIndex)
					{
						$(this).next().html('loading');
						methods.showAnswers($this, this);
					}
					else
					{
						methods.showQuestion($this, this);	
					}
					
				});
			}, 500);
		},
		showQuestion: function($this, that)
		{
			var qCount = parseInt($('.questionCounter span', $this).text());
			$('.questionCounter span', $this).text(qCount + 1);
			$(that).next().show('blind', 500, function(){
				$(this).addClass('current');	
			});
		}, 
		showAnswers: function($this, that)
		{
			$('.questionCounter', $this).fadeOut();
			$(that).next().show('explode', 300, function(){
				$(this).addClass('current');
				var data = $('form', $this).serialize();
				setTimeout(function(){
					$('.result', $this).html(data);	
				}, 500);
			});
		}
		
	}
	
	$.fn.quizSelector = function(method) {
    
	    // Method calling logic
	    if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	    }    
	  
	  };
	
})(jQuery);
