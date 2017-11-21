//是否显示导航栏
var showNavBar = true;
//是否展开导航栏
var expandNavBar = true;

$(document).ready(function () {
    var h1s = $("body").find("h1");
    var h2s = $("body").find("h2");
    var h3s = $("body").find("h3");
    var h4s = $("body").find("h4");
    var h5s = $("body").find("h5");
    var h6s = $("body").find("h6");

    var headCounts = [h1s.length, h2s.length, h3s.length, h4s.length, h5s.length, h6s.length];
    var vH1Tag = 'h1';
    var vH2Tag = 'h2';
    var vH3Tag = 'h3';
    
    var vH1Index = 0;
    var vH2Index = 0;
    var vH3Index = 0;
    $("body").find("h1,h2,h3").each(function (i, item) {
        var tocid = '';
        var name = '';
        var tag = $(item).get(0).tagName.toLowerCase();
        var className = '';
        if (tag == vH1Tag) {
            tocid = name = ++vH1Index;
            name = tocid;
            vH2Index = 0;
            className = 'item_h1';
        } else if (tag == vH2Tag) {
            tocid = vH1Index + '_' + ++vH2Index;
            name = vH1Index + '.' + vH2Index;
            className = 'item_h2';
        } else if (tag == vH3Tag){
            tocid = vH1Index + '_' + ++vH2Index + '_' + ++vH3Index;
            name = vH1Index + '.' + vH2Index + '.' + vH3Index;
            className = 'item_h3';
        }
        $(item).attr("id", "toc" + tocid);
        $(item).addClass("toc_head");
        $("#AnchorContent").css('max-height', ($(window).height() - 180) + 'px');
        $("#AnchorContent").append('<li><a class="nav_item ' + className + ' anchor-link" onclick="return false;" href="#" link="#toc' + tocid + '">' + $(this).text() + '</a></li>');
    });

    $("#AnchorContentToggle").click(function () {
        var text = $(this).attr("title");
        if (text == "收起") {
            $(this).attr({
                "class": "glyphicon glyphicon-plus",
                "title": "展开"
            });
        } else {
            $(this).attr({
                "class": "glyphicon glyphicon-minus",
                "title": "收起"                
            });
        }
        $("#AnchorContent").toggle();
    });
    
    $(".anchor-link").click(function () {
        $("html,body").animate({
            scrollTop: $($(this).attr("link")).offset().top
        }, 500);
    });


    var headerNavs = $(".toc-body li .nav_item");
    var headerTops = [];
    $(".toc_head").each(function (i, n) {
        headerTops.push($(n).offset().top);
    });
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        $.each(headerTops, function (i, n) {
            var distance = n - scrollTop;
            if (distance >= 0) {
                $(".toc-body li .nav_item.current").removeClass('current');
                $(headerNavs[i]).addClass('current');
                return false;
            }
        });
    });

    if (!showNavBar) {
        $('.toc-body').hide();
    }
    if (!expandNavBar) {
        $(this).attr({
            "class": "glyphicon glyphicon-minus",            
            "title": "展开"
        });
        $("#AnchorContent").hide();
    }
});


