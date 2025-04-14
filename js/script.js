// Script para capturar vídeo da câmera, exibir na tela e alterar ícones após um certo tempo

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const quadrante = document.getElementById('quadrante-rosto');

function alterarIcone(icone, delay) {
  setTimeout(() => {
    icone.src = '../assets/icon-verificado.svg';
  }, delay);
}

function alterarQuadrante(delay, manterVerde = false) {
  if (!quadrante) return;

  setTimeout(() => {
    quadrante.src = '../assets/quadrante-verde.svg';

    if (!manterVerde) {
      setTimeout(() => {
        quadrante.src = '../assets/quadrante-azul.svg';
      }, 1000);
    }
  }, delay);
}

function iniciarReconhecimento() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;

      const icones = document.querySelectorAll('.icon-reconhecimento');

      icones.forEach((icone, index) => {
        const delay = (index + 1) * 2000;
        const ultimoIcone = index === icones.length - 1;

        alterarIcone(icone, delay);
        alterarQuadrante(delay, ultimoIcone);
      });
    })
    .catch((err) => {
      console.error('Erro ao acessar a câmera:', err);
    });
}

iniciarReconhecimento();