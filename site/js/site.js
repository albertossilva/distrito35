$(document).ready(function() {
	$(".external").click(function(e) { e.preventDefault(); window.open($(this).attr("href")); });

	$('#chamadas-box-dir DIV A').mouseover(function(e){
		e.preventDefault();

		$("#chamadas-box-esq").html('<a href="'+$(this).attr("rel")+'" title="'+$(this).attr("title")+'"><img src="'+$(this).attr("href")+'" width="758" height="254" alt="'+$(this).attr("title")+'" title="'+$(this).attr("title")+'" /></a><div id="legenda"><div id="legenda-mg">'+$(this).attr("title")+'</div></div>');

		$('.chamadas-box-botao-ativo').addClass('chamadas-box-botao');
		$('.chamadas-box-botao-ativo').removeClass('chamadas-box-botao-ativo');

		$(this).parent().parent().addClass('chamadas-box-botao-ativo');
		$(this).parent().parent().removeClass('chamadas-box-botao');

	});

});