var rodada = 1;
var placarsoma1 = 0;
var placarsoma2 = 0;

var ponto = 0;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function(){ 

	$('#btn_iniciar').click(function(){
		
		//valida nomes
		if($('#nome_player_1').val()==''){
			alert('Preencha o nome do jogador 1');
			return false;
		}
		if($('#nome_player_2').val()==''){
			alert('Preencha o nome do jogador 2');
			return false;
		}

		//exibir apelidos

		$('#player_1').html($('#nome_player_1').val());
		$('#player_2').html($('#nome_player_2').val());

		//exibir navegação
		
		$('#pagina_inicial').hide();
		$('#palco_jogo').show();

		$('#fala').html('Anda logo, '+ $('#nome_player_1').val() + ', tu começa peste...')
		
	});

	$('.jogada').click(function(){
		var id_campo_clicado = this.id;
		/*$('#'+id_campo_clicado).off();*/
		jogada(id_campo_clicado);
	});

	function jogada(id){
		var icone = '';
		
		if((rodada % 2) == 1){
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
			$('#fala').html('Agora é '+ $('#nome_player_2').val() + ' que joga...')
		} else{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
			$('#fala').html('Agora é '+ $('#nome_player_1').val() + ' que joga...')
		}

		$('#'+id).css('background-image', icone);
		
		rodada++;

		//dividir a informação do id de cada campo em linhas e colunas, as linhas vão para o 0 e as colunas para o 1.

		var linha_coluna = id.split('-');

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica_combinacao();

	}

	function verifica_combinacao(){

		//verifica horizontal
		var pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['a'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['b'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['c'][i];
		}
		ganhador(pontos);
		
		//verifica vertical
		
		for(var l = 1; l <= 3; l++){
			pontos = 0;
			pontos += matriz_jogo['a'][l];
			pontos += matriz_jogo['b'][l];
			pontos += matriz_jogo['c'][l];

			ganhador(pontos);
		}

		//verifica diagonal
		pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);


		//console.log(matriz_jogo);		
	}

	function ganhador(pontos){
		if (pontos == -3){
			var jogada_1 = $('#nome_player_1').val();
			$('#fala').html('Eita, '+ $('#nome_player_2').val() + ' perdeu! kkk...')
			placarsoma1++;			
			$('#placarsoma1').html(placarsoma1)
			/*$('.jogada').off();*/
			reset();

		} else if (pontos == 3){
			var jogada_2 = $('#nome_player_2').val();
			$('#fala').html('Eita, '+ $('#nome_player_1').val() + ' perdeu! kkk...')
			placarsoma2++;			
			$('#placarsoma2').html(placarsoma2)
			/*$('.jogada').off();*/
			reset();			
		}
	}

	function reset(){	
		var ponto = 0;
		
		matriz_jogo['a'][1] = 0;
		matriz_jogo['a'][2] = 0;
		matriz_jogo['a'][3] = 0;

		matriz_jogo['b'][1] = 0;
		matriz_jogo['b'][2] = 0;
		matriz_jogo['b'][3] = 0;

		matriz_jogo['c'][1] = 0;
		matriz_jogo['c'][2] = 0;
		matriz_jogo['c'][3] = 0;

		 $('.quadrotab').removeAttr('style');
		 


	};

});

