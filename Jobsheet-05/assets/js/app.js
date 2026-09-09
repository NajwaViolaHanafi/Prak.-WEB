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

        // Validasi Judul Buku / Nama Anggota
        const judul = form.querySelector("[name='judul']");
        const nama = form.querySelector("[name='nama']");

        if (judul && judul.value.trim() === "") {
            tampilkanError(judul, "Judul wajib diisi.");
            valid = false;
        } else if (judul) {
            hapusError(judul);
        }

        if (nama && nama.value.trim() === "") {
            tampilkanError(nama, "Nama wajib diisi.");
            valid = false;
        } else if (nama) {
            hapusError(nama);
        }

        // Validasi Pengarang
        const pengarang = form.querySelector("[name='pengarang']");

        if (pengarang && pengarang.value.trim() === "") {
            tampilkanError(pengarang, "Pengarang wajib diisi.");
            valid = false;
        } else if (pengarang) {
            hapusError(pengarang);
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

        // Validasi No. Anggota
        const noAnggota = form.querySelector("[name='no_anggota']");

        if (noAnggota && noAnggota.value.trim() === "") {
            tampilkanError(
                noAnggota,
                "No. Anggota wajib diisi."
            );
            valid = false;
        } else if (noAnggota) {
            hapusError(noAnggota);
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
            const teks = row.textContent.toLowerCase();

            row.style.display = teks.includes(keyword)
                ? ""
                : "none";
        });
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
            }
        });
    });
}


// ===== Jalankan JavaScript =====
document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initValidasiForm();
    initTableFilter();
    initHapusConfirm();
});