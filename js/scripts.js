const resultadoLista = document.querySelector('#listaExp');
if (resultadoLista === undefined){
  resultadoLista.style.overflowY = 'hidden';
} else {
  resultadoLista.style.overflowY = 'auto';
}

function inserirValor(value) {
  // Coleta o valor inserido no display
  let inserido = document.getElementById('display').value += value;

  // Atualizar o valor atual no localStorage
  localStorage.setItem('valorDisplay', inserido);
  inserido.innerHTML = '';
}

function calcular() {
  var exibeValor = document.getElementById('display').value;
  var resultado = eval(exibeValor); // utiliza eval() para a expressão matemática dentro da string valorDisplay 
  
  // Salvar o cálculo realizado no histórico
  let historicoAnterior = localStorage.getItem('historico') || ''; 
  let calculo = `${exibeValor} = ${resultado}`;
  
  // Adicionar o cálculo ao histórico
  let novoHistorico = historicoAnterior ? historicoAnterior + '<br>' + calculo : calculo;
  
  // Salvar o novo histórico no localStorage
  localStorage.setItem('historico', novoHistorico);

  // Exibir o resultado no display
  document.getElementById('display').value = resultado;

  // Exibe a expressão matemática inserida no display
  let expressaoNum = document.getElementById('expressaoNum');
  if(resultado.value != ''){
    expressaoNum.innerHTML = localStorage.getItem('valorDisplay') + " =";
  }
}

// Exibe todo o histórico do localStorage
function exibirHistorico() {
  let historicoSalvo = localStorage.getItem('historico');
  
  // Exibir o histórico na lista
  let listaExp = document.getElementById('listaExp');
  listaExp.innerHTML = ''; 
  
  // Se houver histórico salvo será inserido numa lista
  if (historicoSalvo) {
    let historicoArray = historicoSalvo.split('<br>'); // Divide os cálculos salvos
    historicoArray.forEach(calculo => {
      let li = document.createElement('li');
      li.textContent = calculo; // Adiciona o texto de cada cálculo
      listaExp.appendChild(li);
    });
  } else { // Se não tiver nenhum cálculo
    let li = document.createElement('li');
    li.textContent = 'Ainda não há histórico.';
    listaExp.appendChild(li);
  }

  // Lixeira para apagar o histórico, só aparece ao clicar no icon-historico
  let iconLimpar = document.querySelector('.icon-limpar');
  iconLimpar.style.display = 'flex';

  document.querySelector('.display').style.opacity = 0.5;
  document.querySelector('.img-icon-calc').style.opacity = 0.5;
}

// Limpa o resultado do display
function limparResultado() {
  display.value = '';
  expressaoNum.innerHTML = '';
}

// Limpa o histórico do localStorage
function limparHistorico() {
  let listaExp = document.getElementById('listaExp');
  listaExp.innerHTML = ''
  localStorage.removeItem('historico');

  // Lixeira para apagar o histórico; some a lixeira/histórico ao clicar no icon-limpar
  let iconLimpar = document.querySelector('.icon-limpar');
  iconLimpar.style.display = 'none';

  document.querySelector('.display').removeAttribute("style");
  document.querySelector('.img-icon-calc').removeAttribute("style");
}