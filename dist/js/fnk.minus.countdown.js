(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(['jquery'], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
    }(function ($) {
 
        $.fn.fnkMinusCountDown = function( options ) {
   
            var settings = $.extend({
                targetDate: null,
                interval: 1000,
                endMessage: "Expired",
                days: true,
                hours: true,
                minutes: true,
                seconds: true,
                classNum: "fnk-minus-cd-num",
                classDays: "",
                classHours: "",
                classMin: "",
                classSec: "",
                stopTimer: false,
                isActive: function() {},
                isEnded: function() {},
                labelsStr: {
                    'days': 'days',
                    'hours': 'hours',
                    'minutes': 'min',
                    'seconds': 'sec'
                },
                callback: function() {}
            }, options ); 
            
            var element = $(this);
            var end = new Date(settings.targetDate);
       
            var _second = 1000;
            var _minute = _second * 60;
            var _hour = _minute * 60;
            var _day = _hour * 24;
            var timer;
            
            function showRemaining() {
                var now = new Date();
                var distance = end - now;
                settings.isActive.call(this);
      
                if (distance < 0) {    
                    clearInterval(timer);                
                    element.html(settings.endMessage);
                    settings.callback.call(this);
                    return;
                }
       
                var days = addZ( Math.floor(distance / _day) );
                var hours = addZ( Math.floor((distance % _day) / _hour) );
                var minutes = addZ( Math.floor((distance % _hour) / _minute) );
                var seconds = addZ( Math.floor( (distance % _minute) / _second) );
       
                var remainDate = '<span class="' +  settings.classNum + ' ' + settings.classDays + '"><span>' + days + '</span><span class="countdown__label">' + settings.labelsStr.days +'</span></span>';
                    remainDate += '<span class="countdown-dots">:</span>';
                    remainDate += '<span class="' + settings.classNum + ' ' + settings.classHours + '"><span>' + hours + '</span><span class="countdown__label">' + settings.labelsStr.hours +'</span></span>';
                    remainDate += '<span class="countdown-dots">:</span>';
                    remainDate += '<span class="' + settings.classNum + ' ' + settings.classMin + '"><span>' + minutes + '</span><span class="countdown__label">' + settings.labelsStr.minutes +'</span></span>';
                    remainDate += '<span class="countdown-dots">:</span>';
                    remainDate += '<span class="' + settings.classNum + ' ' + settings.classSec + '"><span>' + seconds + '</span><span class="countdown__label">' + settings.labelsStr.seconds +'</span></span>';
                
                element.html(remainDate);  
            }
       
            function addZ(n){return n < 10? '0'+n:''+n;}
            
            timer = setInterval(showRemaining, settings.interval);
        };
       

    }));