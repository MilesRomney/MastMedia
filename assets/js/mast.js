// Desktop only
if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mast_init_youtube();
}

// Universal
mast_cycle_statements();

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
            attribution: "Willi Anton & Faustina Arriola"
        }
    ];
    which = which || (Math.floor(Math.random() * videos.length));
    var next = which + 1;
    if(next > (videos.length - 1)) {
        next = 0;
    }

    $("#youtube").children().remove();
    $("#youtube").append('<iframe class="canvas" width="100%" height="100%" src="//www.youtube.com/embed/' + videos[which]["id"] + '?start=' + videos[which]["start"] + '&autoplay=1&showinfo=0&controls=0&mute=1&enablejsapi=1" frameborder="0" allow="autoplay"></iframe>');
    $("#youtube").append('<div class="info"><div class="nod">A MAST nod to:</div><a class="title" target="_NEW" href="https://youtube.com/watch?v=' + videos[which]["id"] + '">' + videos[which]["title"] + '</a><div class="attribution">' + videos[which]["attribution"] + "</div></div>");
    $("#youtube .canvas").css("transform", "scale(" + (window.innerHeight / window.innerWidth * 2.4) + ")");

    setTimeout(function() {
        mast_init_youtube(next);
    }, videos[which]["duration"] * 1000);

    $(window).resize(function() {
        $("#youtube .canvas").css("transform", "scale(" + (window.innerHeight / window.innerWidth * 2.2) + ")");
    });
}

function mast_cycle_statements(which) {
    var statements = $('.macro_tm_content #home .statement a');
    which = which || 0;
    var next = which + 1;
    if(next > (statements.length - 1)) {
        next = 0;
    }

    statements.removeClass("hovered");
    $(statements[which]).addClass("hovered");

    var nextTimeout = setTimeout(function(){
        mast_cycle_statements(next);
    }, 2500);

    $('.macro_tm_content #home .statement').hover(function(){
        statements.removeClass("hovered");
        clearTimeout(nextTimeout);
    })
}