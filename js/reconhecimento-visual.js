const video = document.getElementById('video');
const quadranteRosto = document.getElementById('quadrante-rosto');
const quadranteDigital = document.getElementById('quadrante-digital');
const tempoBaseDeDelayEmMs = 1000;
const tipoDeAutenticacao = localStorage.getItem('opcaoSelecionada');

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
      }, 500);
    }
  }, delay);
}

function verificarSeTodosOsIconesForamAlterados() {
  const icones = document.querySelectorAll('.icon-reconhecimento');
  return Array.from(icones).every((icon) => icon.src.includes('icon-verificado'));
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

        setTimeout(() => {
          if (verificarSeTodosOsIconesForamAlterados()) {
            setTimeout(() => {
              window.location.href = '../pages/contrato-reconhecimento-facial.html';
            }, 1000);
          }
        }, delay + 500);
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

    const quantidadeDeIcones = icones.length + 1;

    switch (tipoDeAutenticacao) {
      case 'Reconhecimento Facial':
        setTimeout(() => {
          window.location.href = '../pages/disclaimer-facial.html';
        }, tempoBaseDeDelayEmMs * quantidadeDeIcones);
        break;
      case 'Biometria':
        setTimeout(() => {
          window.location.href = '../pages/disclaimer-digital.html';
        }, tempoBaseDeDelayEmMs * quantidadeDeIcones);
        break;
      default:
        console.error('Tipo de autenticação inválido!');
    }

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