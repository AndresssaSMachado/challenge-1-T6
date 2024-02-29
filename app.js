const textareaInput = document.querySelector('textarea');

textareaInput.addEventListener('keydown', function (event) {
    if (event.key === " ") {
        return;
    }
    if (!/[a-zç,.]/.test(event.key)) {
        event.preventDefault();
    }
});

function encryptor() {
    let phrase = document.querySelector('textarea').value;

    const vowelMapper = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    let encryptedPhrase = '';

    for (let i = 0; i < phrase.length; i++) {
        const currentCharacter = phrase[i];

        if (currentCharacter in vowelMapper) {            
            encryptedPhrase += vowelMapper[currentCharacter];
        } else {
            encryptedPhrase += currentCharacter;
        }
    }

    removeElementsFromResultSection();

    createNewTextareaAndCopyUserInput(encryptedPhrase);
    
    addButtonCopiar();

}

function removeElementsFromResultSection() {
    const sectionResult = document.querySelector('.main-content__result');
    sectionResult.innerHTML = '';
}

function createNewTextareaAndCopyUserInput(encryptedPhrase) { 
    const sectionResult = document.querySelector('.main-content__result');

    const newTextArea = document.createElement('textarea');
    newTextArea.setAttribute('id', 'decryptTextarea');
    newTextArea.setAttribute('readonly', 'readonly');

    newTextArea.classList.add('content__result__textarea');
  
    sectionResult.appendChild(newTextArea);

    newTextArea.value = encryptedPhrase;
  }
  
function addButtonCopiar() {
    const sectionResult = document.querySelector('.main-content__result');

    const newButton = document.createElement('button');
    newButton.setAttribute('id', 'copyButton');
    newButton.textContent = 'Copiar';

    newButton.classList.add('main-content__result-button');

    newButton.addEventListener('click', function() {
        copyToClipboard('decryptTextarea');
    });

    sectionResult.appendChild(newButton);
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);

    navigator.clipboard.writeText(element.value)
    .then(() => {
      alert('Texto copiado para a área de transferência');
    })
    .catch(err => {
        alert('Não foi possível copiar o texto para a área de transferência: ', err);
    });
}

function decryptor() {
    let encryptedPhrase = document.querySelector('textarea').value;

    const regrasSubstituicao = [
        { padrao: /ai/g, substituicao: 'a' },
        { padrao: /enter/g, substituicao: 'e' },
        { padrao: /imes/g, substituicao: 'i' },
        { padrao: /ober/g, substituicao: 'o' },
        { padrao: /ufat/g, substituicao: 'u' }
    ];
  
    for (const regra of regrasSubstituicao) {
        encryptedPhrase = encryptedPhrase.replace(regra.padrao, regra.substituicao);
    }
  
    let decryptTextarea = document.getElementById('decryptTextarea');

    decryptTextarea.value = encryptedPhrase;
  }