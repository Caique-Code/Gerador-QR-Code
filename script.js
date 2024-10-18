document.getElementById('generateBtn').addEventListener('click', function () {
    const text = document.getElementById('textInput').value;
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Limpa o conteúdo anterior
    qrCodeContainer.innerHTML = '';
    downloadBtn.style.display = 'none';
    
    if (text.trim() === '') {
        alert('Por favor, insira um texto ou URL para gerar um QR Code.');
        return;
    }

    // Verifica se é uma URL válida (mesmo regex anterior)
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
        '((\\d{1,3}\\.){3}\\d{1,3}))' + 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' + 
        '(\\#[-a-z\\d_]*)?$', 'i');
    
    if (!urlPattern.test(text) && !text.startsWith('http')) {
        alert('O texto inserido não parece ser uma URL válida. O QR Code ainda será gerado para o texto.');
    }

    // Gera o QR Code
    const qrCode = new QRCode(qrCodeContainer, {
        text: text,
        width: 256,
        height: 256,
    });

    // Mostra o botão de download
    downloadBtn.style.display = 'block';

    downloadBtn.addEventListener('click', function () {
        const qrImage = qrCodeContainer.querySelector('img');
        if (qrImage) {
            const imageData = qrImage.src;
            const link = document.createElement('a');
            link.href = imageData;
            link.download = 'qrcode.png';
            link.click();
        }
    });
});
