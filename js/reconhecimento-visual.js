const video = document.getElementById('video');
const quadranteRosto = document.getElementById('quadrante-rosto');
const quadranteDigital = document.getElementById('quadrante-digital');
const tempoBaseDeDelayEmMs = 1000;

function alterarIcone(icone, delay) {
  setTimeout(() => {
    icone.src = '../assets/icon-verificado.svg';

    const todosVerificados = Array.from(document.querySelectorAll('.icon-reconhecimento'))
      .every((icon) => icon.src.includes('icon-verificado'));

    if (todosVerificados) {
      setTimeout(() => {
        window.location.href = '../pages/contrato-reconhecimento-facial.html';
      }, tempoBaseDeDelayEmMs + 1000);
    }
  }, delay);
}

function alterarQuadranteFacial(quadrante, delay, manterVerde = false) {
  if (!quadrante) return;

  setTimeout(() => {
    quadrante.src = '../assets/quadrante-verde.svg';

    if (!manterVerde) {
      setTimeout(() => {
        quadrante.src = '../assets/quadrante-azul.svg';
      }, 500);
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
        const delay = (index + 1) * tempoBaseDeDelayEmMs;
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
      }, tempoBaseDeDelayEmMs);

      setTimeout(() => {
        window.location.href = '../pages/contrato-scanner-digital.html';
      }, tempoBaseDeDelayEmMs + 1000);
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
      const delay = (index + 1) * tempoBaseDeDelayEmMs;
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