<?php

require __DIR__ . '/includes/koneksi.php';

$file = __DIR__ . '/data/buku.json';

if (!file_exists($file)) {
    die("File buku.json tidak ditemukan.");
}

$dataJson = file_get_contents($file);
$dataBuku = json_decode($dataJson, true);

if ($dataBuku === null) {
    die("Data JSON tidak bisa dibaca.");
}

$stmt = $pdo->prepare(
    "INSERT INTO buku (judul, pengarang, tahun, isbn, stok, kategori)
     VALUES (:judul, :pengarang, :tahun, :isbn, :stok, :kategori)"
);

$jumlah = 0;

foreach ($dataBuku as $buku) {

    $stmt->execute([
        'judul' => $buku['judul'],
        'pengarang' => $buku['pengarang'],
        'tahun' => $buku['tahun'],
        'isbn' => '',
        'stok' => $buku['stok'],
        'kategori' => ''
    ]);

    $jumlah++;
}

echo "Migrasi berhasil. Sebanyak $jumlah data buku berhasil dimasukkan ke database.";