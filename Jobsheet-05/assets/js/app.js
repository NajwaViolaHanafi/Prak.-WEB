// ===== Hamburger Menu =====
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");

    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}


// ===== Validasi Form Tambah Buku / Anggota =====
function tampilkanError(input, pesan) {
    hapusError(input);

    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;

    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;

    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        const fieldWajib = [
            "judul",
            "pengarang",
            "nama",
            "no_anggota"
        ];

        fieldWajib.forEach(function (namaField) {
            const input = form.querySelector("[name='" + namaField + "']");

            if (input && input.value.trim() === "") {
                tampilkanError(
                    input,
                    namaField === "no_anggota"
                        ? "No. Anggota wajib diisi."
                        : namaField.charAt(0).toUpperCase() +
                        namaField.slice(1) +
                        " wajib diisi."
                );

                valid = false;
            } else if (input) {
                hapusError(input);
            }
        });

        const isbn = form.querySelector("[name='isbn']");

        if (isbn && isbn.value.trim() !== "") {
            const polaISBN = /^[0-9-]+$/;

            if (!polaISBN.test(isbn.value.trim())) {
                tampilkanError(
                    isbn,
                    "ISBN hanya boleh berisi angka dan tanda hubung (-)."
                );
                valid = false;
            } else {
                hapusError(isbn);
            }
        } else if (isbn) {
            hapusError(isbn);
        }

        // Validasi Tahun
        const tahun = form.querySelector("[name='tahun']");

        if (tahun) {
            const nilai = parseInt(tahun.value, 10);

            if (isNaN(nilai) || nilai < 1900 || nilai > 2026) {
                tampilkanError(
                    tahun,
                    "Tahun harus di antara 1900-2026."
                );
                valid = false;
            } else {
                hapusError(tahun);
            }
        }

        if (!valid) {
            e.preventDefault();
        }
    });
}


// ===== Filter Tabel =====
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");

    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach(function (row) {

            const kolomJudul = row.querySelector("td");
            const teks = kolomJudul
                ? kolomJudul.textContent.toLowerCase()
                : "";

            row.style.display = teks.includes(keyword)
                ? ""
                : "none";
        });
        const jumlahTersisa = Array.from(rows).filter(function (row) {
            return row.style.display !== "none";
        }).length;

        const counter = document.getElementById("jumlah-data");

        if (counter) {
            counter.textContent =
                "Menampilkan " + jumlahTersisa +
                " dari " + rows.length + " buku";
        }
    });
}


// ===== Konfirmasi Hapus =====
function initHapusConfirm() {
    document.querySelectorAll(".btn-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");

            const yakin = confirm("Yakin ingin menghapus data ini?");

            if (yakin && row) {
                row.remove();

                const rows = document.querySelectorAll(
                    ".table-responsive table tbody tr"
                );

                const counter = document.getElementById("jumlah-data");

                if (counter) {
                    counter.textContent =
                        "Menampilkan " + rows.length +
                        " dari " + rows.length + " buku";
                }
            }
        });
    });
}


function initMuatUlang() {
    const btnMuatUlang = document.getElementById("btn-muat-ulang");

    if (!btnMuatUlang) return;

    btnMuatUlang.addEventListener("click", function () {
        muatDaftarBuku();
    });
}


document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initValidasiForm();
    initTableFilter();
    initHapusConfirm();
    initMuatUlang();
});