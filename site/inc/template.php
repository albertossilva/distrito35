<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br">

<head>
  <title><?=$pagina." - "?>Escoteiros do Brasil</title>
  <? include("header.php"); ?>
</head>

<body>

<? include("acesso_rapido.php"); ?>
<div id="layout">
    <? include("topo.php"); ?>

    <div id="menu">
        <div id="menu-mg">
        <? include("menu.php"); ?>
        </div>
    </div>

    <div id="internas">
        <div id="conteudo-mg">

            <div id="migalha">
                <span>Você está em:</span> <a href="index.html" title="Página Inicial" accesskey="H">Página Inicial</a> › <?=$migalha;?>
                <a name="content">&nbsp;</a>
            </div>
            <? include("controle.php"); ?>
            <br class="clr" />

            <div id="coluna1">
                <div id="coluna1-mg">

                    <div id="submenu">
                    <?if($submenu!=''){?>
                        <? include("submenu-".$submenu.".php"); ?>
                    <?} else {?>
                    &nbsp;
                    <?}?>
                    </div>

                </div>
            </div>
            <div id="coluna2">

                <?=$conteudo;?>

            </div>
            <div id="coluna3">
                <div id="coluna3-mg">
                <? include("coluna_auxiliar.php"); ?>
                </div>
            </div>

            <br class="clr" />

        </div>
    </div>
    <? include("rodape.php"); ?>
</div>

</body>
</html>