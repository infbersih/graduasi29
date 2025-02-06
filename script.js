function generateQR() {
    let nama = document.getElementById("nama").value.trim().toUpperCase();
    let kelas = document.getElementById("kelas").value.toUpperCase();

    if (!nama || !kelas) {
        alert("Harap masukkan nama dan pilih kelas!");
        return;
    }

    let qrData = `${kelas}-${nama}`;
    let qrCanvas = document.getElementById("qr-canvas");
    let qrText = document.getElementById("qr-text");

    qrText.innerHTML = ""; // Bersihkan teks sebelumnya

    // Buat Micro QR Code menggunakan qrcode-generator
    let qr = qrcode(0, 'L');
    qr.addData(qrData);
    qr.make();

    let ctx = qrCanvas.getContext("2d");
    let cellSize = 4; // Ukuran sel QR Code untuk menjaga ukuran tetap proporsional
    let margin = 2; // Margin di dalam QR Code

    qrCanvas.width = (qr.getModuleCount() * cellSize) + (2 * margin);
    qrCanvas.height = (qr.getModuleCount() * cellSize) + (2 * margin);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);
    ctx.fillStyle = "black";

    for (let r = 0; r < qr.getModuleCount(); r++) {
        for (let c = 0; c < qr.getModuleCount(); c++) {
            if (qr.isDark(r, c)) {
                ctx.fillRect(
                    (c * cellSize) + margin,
                    (r * cellSize) + margin,
                    cellSize,
                    cellSize
                );
            }
        }
    }

    // Tambahkan Nama & Kelas dalam huruf kapital dengan format yang benar
    qrText.innerHTML = `<div class="kelas">${kelas}</div><div class="nama">${nama}</div>`;

    document.getElementById("invitation-container").classList.remove("d-none");
}

function downloadInvitation() {
    let invitationCard = document.getElementById("invitation-card");
    let nama = document.getElementById("nama").value.trim().toUpperCase();
    let kelas = document.getElementById("kelas").value.toUpperCase();

    if (!nama || !kelas) {
        alert("Harap masukkan nama dan pilih kelas!");
        return;
    }

    let fileName = `${kelas}_${nama}.png`.replace(/\s+/g, "_");

    html2canvas(invitationCard, { scale: 3 }).then((canvas) => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = fileName;
        link.click();
    });
}