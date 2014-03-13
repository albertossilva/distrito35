$(document).ready(function() {
	$(".external").click(function(e) { e.preventDefault(); window.open($(this).attr("href")); });

	//AUMENTAR E DIMINUIR FONTE
	var pc = 100;

	if (($.cookie("font-modify")) != undefined) {
		pc  = ($.cookie("font-modify"))*1;
		setFontSize(pc);
	} else {
		$.cookie('font-modify', '100', { expires: 7, path: '/', secure: true });
	}

	// Reset Font Size
	$(".fonte-menos").click(function(){
		if (pc > 90) { pc -= 10; } else { pc = 90; }
		setFontSize(pc);
		return false;
	});
	// Decrease Font Size
	$(".fonte-mais").click(function(){
		if (pc < 180) { pc += 10; } else { pc = 180; }
		setFontSize(pc);
		return false;
	});

	function setFontSize(porc) {
		$('#coluna2').css('font-size', pc+"%");
		$.cookie("font-modify",pc);
	}

    $('.styleswitch').click(function()
    {
        var estilo = this.getAttribute("rel")
        if($.cookie("style") == estilo)
        {
            switchStylestyle(estilo,'off');
        } else {
            switchStylestyle(estilo,'on');
        }
        return false;

    });
    var c = $.cookie('style');
    if (c) switchStylestyle(c);

    $('#chamadas-box-dir DIV A').mouseover(function(e)
    {
        e.preventDefault();

        $("#chamadas-box-esq").html('<a href="'+$(this).attr("rel")+'" title="'+$(this).attr("title")+'"><img src="'+$(this).attr("href")+'" width="758" height="254" alt="'+$(this).attr("title")+'" title="'+$(this).attr("title")+'" /></a><div id="legenda"><div id="legenda-mg">'+$(this).attr("title")+'</div></div>');

        $('.chamadas-box-botao-ativo').addClass('chamadas-box-botao');
        $('.chamadas-box-botao-ativo').removeClass('chamadas-box-botao-ativo');

        $(this).parent().parent().addClass('chamadas-box-botao-ativo');
        $(this).parent().parent().removeClass('chamadas-box-botao');

    });

});


function switchStylestyle(styleName,action)
{
    //$('link[@rel*=style][title]').each(function(i){})        this.disabled = true;;

    if(action=='on')
    {
        if (this.getAttribute('title') == styleName) this.disabled = false;
        $.cookie('style', styleName, { expires: 7, path: '/', secure: true });
    } else {
        if (this.getAttribute('title') == styleName) this.disabled = true;
        $.cookie('style', styleName, { expires: 7, path: '/', secure: false });
    }


}