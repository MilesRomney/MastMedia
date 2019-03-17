$(function () {
    // Desktop only
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mast_init_youtube();
        // Mobile only
    } else {
        mast_prep_mobile_menu();
    }

    // Universal
    mast_cycle_statements();
    mast_init_discord();
    mast_prep_cognito();
    mast_render_video();
    /*mast_prep_video(true);*/
    mast_prompt_vote('labtopicspoll');
    mast_lift_embargoes();
});

function mast_init_youtube(which) {
    var videos = [
        {
            id: "Y5YTV8TZT8U",
            start: 4,
            duration: 30,
            title: "Reel",
            attribution: "Gabriela Badillo"
        },
        {
            id: "H4-96GqPup4",
            start: 80,
            duration: 90,
            title: "Brush: A Fox Tale",
            attribution: "Willi Anton, Faustina Arriola"
        },
        {
            id: "XxV4aUrGgeg",
            start: 48,
            duration: 180,
            title: "The Legend of the Crab Phare",
            attribution: "Supinfocom Valenciennes",
            zoom: 1.2
        },
        {
            id: "KwCtWfwYlkw",
            start: 120,
            duration: 120,
            title: "The Box",
            attribution: "Merve Cirisoglu Cotur, Yenal Cetin, Erhan Gezen"
        },
        {
            id: "v7jP4T26tLs",
            start: 20,
            duration: 90,
            title: "Un Sacré Mariage!",
            attribution: "Francis Papillon, Gregory Verreault"
        },
        {
            id: "gZyjJtBIlow",
            start: 90,
            duration: 190,
            title: "A Fox and a Mouse",
            attribution: "Camille Chaix et al",
            zoom: 1.2
        },
        {
            id: "x7QqijTXvaU",
            start: 197,
            duration: 120,
            title: "CALDERA",
            attribution: "Evan Viera",
            zoom: 1.4
        },
        {
            id: "VBps1IvCyj0",
            start: 60,
            duration: 180,
            title: "Lost and Found",
            attribution: "Andrew Goldsmith & Bradley Slabe",
            zoom: 1.2
        }
    ];
    which = which || (Math.floor(Math.random() * videos.length));
    var next = which + 1;
    if (next > (videos.length - 1)) {
        next = 0;
    }

    $("#youtube").children().remove();
    $("#youtube").append('<iframe class="canvas" width="100%" height="100%" src="//www.youtube.com/embed/' + videos[which]["id"] + '?start=' + videos[which]["start"] + '&autoplay=1&showinfo=0&controls=0&mute=1&enablejsapi=1" frameborder="0" allow="autoplay"></iframe>');
    $("#youtube").append('<div class="info"><div class="nod">A MAST nod to:</div><a class="title" target="_NEW" href="https://youtube.com/watch?v=' + videos[which]["id"] + '">' + videos[which]["title"] + '</a><div class="attribution">' + videos[which]["attribution"] + "</div></div>");
    $("#youtube .canvas").css("transform", "scale(" + (window.innerHeight / window.innerWidth * 2.4 * (videos[which]["zoom"] || 1)) + ")");

    setTimeout(function () {
        mast_init_youtube(next);
    }, videos[which]["duration"] * 1000);

    $(window).resize(function () {
        $("#youtube .canvas").css("transform", "scale(" + (window.innerHeight / window.innerWidth * 2.4 * (videos[which]["zoom"] || 1)) + ")");
    });
}

function mast_init_discord() {
    $('#discord').append('<iframe src="https://discordapp.com/widget?id=527546933494022144&theme=dark" width="275" height="400" allowtransparency="true" frameborder="0"></iframe>');

    $('#discord .button').click(function () {
        $('#discord').toggleClass('active').children('.button').toggleClass('xcon-chat').toggleClass('xcon-cancel-circled');
    });
}

function mast_cycle_statements(which) {
    var statements = $('.macro_tm_content #home .statement a');
    which = which || 0;
    var next = which + 1;
    if (next > (statements.length - 1)) {
        next = 0;
    }

    statements.removeClass("hovered");
    $(statements[which]).addClass("hovered");

    var nextTimeout = setTimeout(function () {
        mast_cycle_statements(next);
    }, 2500);

    $('.macro_tm_content #home .statement').hover(function () {
        statements.removeClass("hovered");
        clearTimeout(nextTimeout);
    })
}

function mast_prep_mobile_menu() {
    $('.macro_tm_mobile_menu_wrap .anchor_nav a').click(function () {
        $('.macro_tm_mobile_menu_wrap').slideUp();
        $('.hamburger').removeClass('is-active');
    });
}

function mast_prep_cognito() {
    $('.cognito').addClass('active').children('[data-field=ContestAndLicensingTerms] textarea').first().attr('disabled', 'disabled');
}

function mast_render_video() {
    if ($('.youtube').length) {
        $('head').prepend('<script src="https://www.youtube.com/iframe_api"></script>');
    }

    if ($('.vimeo').length) {
        onVimeoIframeAPIReady();
    }

    $(window).resize(function () {
        var $el = $('.player iframe'),
            x = $el.attr('width'),
            y = $el.attr('height'),
            ratio = y / x;

        $el.attr('width', $(window).width());
        $el.attr('height', $(window).width() * ratio);

        setPlayerWrapperSize($(window).width(), $(window).width() * ratio);
    });
}

function setPlayerWrapperSize(x, y) {
    x = x || $('.player iframe').width();
    y = y || $('.player iframe').height();

    $('.player').css('width', x);
    $('.player').css('height', y);
}

function onYouTubeIframeAPIReady() {
    window.YouTubePlayers = [];

    $('.youtube').each(function (k, v) {
        var $el = $(v),
            player = new YT.Player($el.attr('id'), {
                width: $el.parent().width(),
                height: $el.parent().width() * 0.56,
                videoId: $el.attr('id'),
                playerVars: { showinfo: 0 },
                events: {
                    'onReady': onYouTubePlayerReady,
                    'onStateChange': onYouTubePlayerStateChange
                }
            });

        setPlayerWrapperSize();

        window.YouTubePlayers.push(player);
    });
}

function onYouTubePlayerReady() {
}

function onYouTubePlayerStateChange(event) {
    if ([YT.PlayerState.UNSTARTED, YT.PlayerState.ENDED, YT.PlayerState.PAUSED].includes(event.data)) {
        setTimeout(function () {
            if (window.YouTubePlayers[0].getPlayerState() != YT.PlayerState.PLAYING) {
                $('body').removeClass('subtle');
                $('.player').removeClass('playing');
            }
        }, 1000);
    } else {
        setTimeout(function () {
            if (window.YouTubePlayers[0].getPlayerState() == YT.PlayerState.PLAYING) {
                $('body').addClass('subtle');
                $('.player').addClass('playing');
            }
        }, 1000);
    }
}

function onVimeoIframeAPIReady() {
    window.VimeoPlayers = [];

    $('.vimeo').each(function (k, v) {
        var $el = $(v);

        var player = new Vimeo.Player($el.attr('id'), {
            width: $el.parent().width(),
            id: $el.attr('id'),
        });

        setTimeout(function () {
            setPlayerWrapperSize();
        }, 1000);

        player.on('play', function () { onVimeoPlayerStateChange('PLAYING') });
        player.on('pause', function () { onVimeoPlayerStateChange('PAUSED') });

        window.VimeoPlayers.push(player);
    });
}

function onVimeoPlayerStateChange(state) {
    if (state == 'PLAYING') {
        $('body').addClass('subtle');
        $('.player').addClass('playing');
    } else {
        $('body').removeClass('subtle');
        $('.player').removeClass('playing');
    }
}

/*function mast_prep_video(set_on_resize) {
    var ratio = $('iframe.video').attr('height') / $('iframe.video').attr('width');
    var width = $('iframe.video').parent().width();
    var height = width * ratio;

    $('iframe.video').attr('width', width).attr('height', height);

    if(set_on_resize) {
        $(window).resize(function() {
            mast_prep_video(false);
        });
    }
}*/

function mast_prompt_vote(cookie) {
    var vote = $('.vote');

    if (document.cookie.indexOf(cookie) < 0) {
        setTimeout(function () {
            vote.addClass('active').find('.yes').click(function () {
                document.location.href = '#poll';
                document.cookie = cookie + '=true';
                vote.removeClass('active');
            });

            vote.find('.no').click(function () {
                document.cookie = cookie + '=true';
                vote.removeClass('active');
            });
        }, 1500);
    }
}

/* 
    Yes yes, we're full aware that a savy viewer might see content embargoed in this way. 
    These are informal embargoes, not sensitive. We're unconcerned. And usually, we'll be 
    relying on Jekyll's in-built embargo system anyway.
*/
function mast_lift_embargoes() {
    $('.embargoed').each(
        function (k, v) {
            date = new Date($(v).attr('date'));
            if (date < Date.now()) {
                $(v).removeClass('embargoed');
            }
        }
    );
}