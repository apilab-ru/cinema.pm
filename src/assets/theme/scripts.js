$(function() {
    // Side Bar Toggle
    $('.hide-sidebar').click(function() {
	  $('#sidebar').hide('fast', function() {
	  	$('#content').removeClass('span9');
	  	$('#content').addClass('span12');
	  	$('.hide-sidebar').hide();
	  	$('.show-sidebar').show();
	  });
	});

	$('.show-sidebar').click(function() {
		$('#content').removeClass('span12');
	   	$('#content').addClass('span9');
	   	$('.show-sidebar').hide();
	   	$('.hide-sidebar').show();
	  	$('#sidebar').show('fast');
	});
        
        $(document).on('click','.nav-list li.top',function(event){
            event.preventDefault();
            $(this).addClass('active');
            $(this).siblings('.active').removeClass('active');
        })
        
        $(document).on('click','.nav-list li.top ul a',function(event){
            event.preventDefault();
            event.stopPropagation();
            var $a = $(this);
            var $li = $a.parents('li:first');
            $li.addClass('active');
            $li.siblings('.active').removeClass('active');
            
            navi.go( $a.attr('href') );
            
        })
});

base = new function(){
    var self = this;
    this.post = function (act, send, callback) {
        $.post("/ajax/" + act, send, function (re) {
            var data = self.parseSend(re);
            if(callback){
                callback(data.re, data.mas);
            }
        });
    }

    this.parseSend = function (re) {
        var res = re.split('<ja>');
        if (res[1] != undefined) {
            var text = res[0];
            res = res[1].split('</ja>');
            text += res[1];
            re = text;
            var mas = $.parseJSON(res[0]);
        } else {
            var mas = {};
        }
        return {
            re: re,
            mas: mas
        };
    }
    
    this.createPop = function(title,html){
        var $div = $("<div class='popWindow'>");

        $div.html(
                "<div class='title'>"+ title +"</div>" +  
                "<div class='close btn btn-danger'><i class='icon-remove icon-white'></i></div>" +            
                "<div class='body'>"+ html +"</div>"     
                );

        var $box = $('.boxPop');
        if(!$box.length){
            $box = $('<div class="boxPop"><div class="dialogs"></div></div>'); 
            $('body').append( $box ); 
        }

        $box.find('.dialogs').append( $div );

        var width = $div.outerWidth();
        $box.css({
            left : (screen.width - width) / 2 
        });
        $box.on('click','.close',function(){
            $box.remove();
        })
        
        $div.draggable({handle:".title"});
        
        return $div;
    };
}

navi = new function(){
    
    var self = this;
    this.__proto__ = base;
    
    this.go = function(link){
        history.pushState('navigation', 'navigation', link);
        self.post(link.replace('/page/',''),{getmenu:1},function(re,mas){
            $('.mainContent').html(re);
            $('.navBox').html(mas.navi);
        })
    }
}

api = new function(){
    
    var self = this;
    this.__proto__ = base;
    
    this.authVk = function(url){
        self.openerVK = window.open(null, 'name', 'width=600,height=400,left=50,top=100,scrollbars=0');
        self.openerVK.location.href = url;
        /*self.post('authVK', null, function (re, mas) {
            self.opener.location.href = mas.url;
            $win.update(re);
        });*/
    }
    
}