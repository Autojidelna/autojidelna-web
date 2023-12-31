document.addEventListener('DOMContentLoaded', () => {
    const androidButton = document.querySelector('.android');
    const appleButton = document.querySelector('.apple');

    androidButton.addEventListener('click', () => {
        Toastify({
            text: "Stahování aplikace pro Android...",
            duration: 3000, // 3 seconds
            newWindow: true,
            close: true,
            gravity: "top", // top or bottom
            position: "right", // right, center, or left
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
            (async () => {
                const url = 'https://api.github.com/repos/tpkowastaken/autojidelna/releases/latest';
                fetch(url, {
                    headers: {
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    //download apk file from the latest release
                    let downloadUrl = '';
                    let downloadFileName = '';
                    for(var i = 0; i < data.assets.length; i++) {
                    if(!data.assets[i].name.includes('arm64') && !data.assets[i].name.includes('x86_64') && !data.assets[i].name.includes('armeabi') && data.assets[i].name.includes('.apk')) {
                        downloadUrl = data.assets[i].browser_download_url;
                        downloadFileName = data.assets[i].name;
                    }
                    }
                    const downloadLink = document.createElement('a');
                    downloadLink.href = downloadUrl;
                    downloadLink.download = downloadFileName;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);

                    const downloadButton = document.createElement('button');
                    downloadButton.innerText = 'Pokud se aplikace nestáhne sama klikněte zde';
                      downloadButton.style.backgroundColor = '#4CAF50';
                    downloadButton.style.border = 'none';
                    downloadButton.style.color = 'white';
                    downloadButton.style.padding = '15px 32px';
                    downloadButton.style.textAlign = 'center';
                    downloadButton.style.textDecoration = 'none';
                    downloadButton.style.fontSize = '16px';
                    downloadButton.style.cursor = 'pointer';
                    downloadButton.style.position = 'absolute';
                    downloadButton.style.bottom = '20%';
                    downloadButton.style.left = '50%';
                    downloadButton.style.transform = 'translateX(-50%)';
                    downloadButton.addEventListener('click', () => {
                        const downloadLink = document.createElement('a');
                        downloadLink.href = downloadUrl;
                        downloadLink.download = downloadFileName;
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                    });
                    document.body.appendChild(downloadButton);
                })
                .catch(error => {
                    console.error(error);
                });
                })();
    });

    appleButton.addEventListener('click', () => {
        Toastify({
            text: "Pro Apple zatím není podpora. Je nám líto.",
            duration: 3000, // 3 seconds
            newWindow: true,
            close: true,
            gravity: "top", // top or bottom
            position: "right", // right, center, or left
            //red color
            backgroundColor: "linear-gradient(to right, #f85032, #e73827)",
            }).showToast();
    });
});