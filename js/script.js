// Script para capturar vídeo da câmera e exibir na tela
// e alterar ícones após um certo tempo

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;

    const icones = document.querySelectorAll('.icon-reconhecimento');

    function MudarIcone(icone, delay) {
      setTimeout(() => {
        icone.src = '../assets/icon-verificado.svg';
      }, delay);
    }

    icones.forEach((icone, index) => {
      MudarIcone(icone, (index + 1) * 2000);
    });
  })
  .catch((err) => {
    console.error('Erro ao acessar a câmera:', err);
  });