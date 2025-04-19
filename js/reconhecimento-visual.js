const video = document.getElementById('video');
const quadranteRosto = document.getElementById('quadrante-rosto');
const quadranteDigital = document.getElementById('quadrante-digital');

function alterarIcone(icone, delay) {
  setTimeout(() => {
    icone.src = '../assets/icon-verificado.svg';
  }, delay);
}

function alterarQuadranteFacial(quadrante, delay, manterVerde = false) {
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

function iniciarReconhecimentoFacial() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      quadranteRosto.style.visibility = 'visible';
      const icones = document.querySelectorAll('.icon-reconhecimento');

      icones.forEach((icone, index) => {
        const delay = (index + 1) * 2000;
        const ultimoIcone = index === icones.length - 1;

        alterarIcone(icone, delay);
        alterarQuadranteFacial(quadranteRosto, delay, ultimoIcone);
      });
    })
    .catch((err) => {
      console.error('Erro ao acessar a câmera:', err);
    });
}

function iniciarReconhecimentoDigital() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      quadranteDigital.style.visibility = 'visible';

      setTimeout(() => {
          quadranteDigital.src = '../assets/icone-digital-verde.svg';
      }, 2000);
    })
    .catch((err) => {
      console.error('Erro ao acessar a câmera:', err);
    });
}

function iniciarReconhecimentoRG() {
  navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    const icones = document.querySelectorAll('.icon-reconhecimento');

    icones.forEach((icone, index) => {
      const delay = (index + 1) * 2000;
      alterarIcone(icone, delay);
    });
  })
  .catch((err) => {
    console.error('Erro ao acessar a câmera:', err);
  });
}

function inicializarReconhecimento(contexto) {
  switch (contexto) {
    case 'facial':
      iniciarReconhecimentoFacial();
      break;
    case 'digital':
      iniciarReconhecimentoDigital();
      break;
    case 'rg':
      iniciarReconhecimentoRG();
      break;
    default:
      console.error('Contexto de reconhecimento inválido!');
  }
}

if (quadranteDigital) {
  inicializarReconhecimento('digital');
} else if (quadranteRosto) {
  inicializarReconhecimento('facial');
} else {
  inicializarReconhecimento('rg');
}