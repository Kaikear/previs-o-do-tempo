// Obtém os elementos do DOM
const temperaturaAtual = document.querySelector('.temperature .value');
const temperaturaMinima = document.querySelector('.temperature .min');
const temperaturaMaxima = document.querySelector('.temperature .max');
const descricaoClima = document.querySelector('.descricao-clima');
const imagemClima = document.querySelector('.imagem-clima');
const detalhesClima = document.querySelectorAll('.detalhes-clima li');
const tabs = document.querySelectorAll('.tabs button');
const forecast = document.querySelector('.forecast');
const chart = document.querySelector('.chart svg');
const labels = document.querySelectorAll('.labels li');
const hourly = document.querySelector('.hourly');

// Define as informações do clima
const clima = {
  temperatura: 25,
  descricao: 'Sunny',
  imagem: 'sunny',
  detalhes: [
    { label: 'Chuva', valor: '2%' },
    { label: 'Umidade', valor: '81%' },
    { label: 'Vento', valor: '10 km/h' }
  ],
  previsao: [
    { temperatura: 28, descricao: 'Sunny', imagem: 'sunny' },
    { temperatura: 30, descricao: 'Cloudy', imagem: 'cloudy' },
    { temperatura: 25, descricao: 'Rainy', imagem: 'rainy' },
    { temperatura: 22, descricao: 'Sunny', imagem: 'sunny' },
    { temperatura: 20, descricao: 'Cloudy', imagem: 'cloudy' }
  ]
};

// Atualiza os elementos do DOM com as informações do clima
atualizarClima();

// Função para atualizar os elementos do DOM com as informações do clima
function atualizarClima() {
  temperaturaAtual.textContent = clima.temperatura + '°C';
  temperaturaMinima.textContent = clima.previsao[0].temperatura + '°C';
  temperaturaMaxima.textContent = clima.previsao[clima.previsao.length - 1].temperatura + '°C';
  descricaoClima.textContent = clima.descricao;
  imagemClima.src = `img/${clima.imagem}.svg`;
  detalhesClima.forEach((detalhe, index) => {
    detalhe.textContent = `${clima.detalhes[index].label}: ${clima.detalhes[index].valor}`;
  });
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      atualizarPrevisao(index);
    });
  });
  atualizarPrevisao(0);
}

// Função para atualizar a previsão do clima
function atualizarPrevisao(index) {
  forecast.innerHTML = '';
  chart.innerHTML = '';
  labels.forEach((label, index) => {
    label.textContent = clima.previsao[index].temperatura + '°C';
  });
  hourly.innerHTML = '';
  clima.previsao.forEach((previsao, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="time">${index * 3}:00</span>
      <span class="day">${getDayOfWeek(index)}</span>
      <img src="img/${previsao.imagem}.svg" alt="${previsao.descricao}">
      <span class="temperature">${previsao.temperatura}°C</span>
    `;
    hourly.appendChild(li);
  });
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', getPath(clima.previsao));
  path.setAttribute('stroke', '#4CAF50');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('fill', 'none');
  chart.appendChild(path);
}

// Função para obter o dia da semana
function getDayOfWeek(index) {
  const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  return dias[index % 7];
}

// Função para obter o caminho da previsão do clima
function getPath(previsao) {
  let path = 'M 0 100 ';
  previsao.forEach((p, index) => {
    path += `L ${index * 100} ${100 - p.temperatura * 2} `;
  });
  return path;
}