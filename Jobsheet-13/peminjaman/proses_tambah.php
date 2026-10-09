<?php
require __DIR__ . '/../includes/auth.php';
require __DIR__ . '/../includes/koneksi.php';
require __DIR__ . '/../includes/csrf.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: tambah.php');
    exit;
}

csrf_verify();

$anggota_id = (int)($_POST['anggota_id'] ?? 0);
$buku_id = (int)($_POST['buku_id'] ?? 0);

if ($anggota_id <= 0 || $buku_id <= 0) {
    $_SESSION['flash'] = 'Anggota dan buku wajib dipilih.';
    header('Location: tambah.php');
    exit;
}

try {
    $pdo->beginTransaction();

    // Cek apakah anggota memiliki peminjaman aktif yang terlambat lebih dari 14 hari
    $stmt = $pdo->prepare("
        SELECT id
        FROM peminjaman
        WHERE anggota_id = :anggota_id
          AND status = 'dipinjam'
          AND CURRENT_DATE - tanggal_pinjam > 14
        LIMIT 1
    ");

    $stmt->execute([
        ':anggota_id' => $anggota_id
    ]);

    $terlambat = $stmt->fetch();

    if ($terlambat) {
        $pdo->rollBack();

        $_SESSION['flash'] = [
            'type' => 'error',
            'pesan' => 'Peminjaman ditolak. Anggota memiliki peminjaman yang terlambat lebih dari 14 hari.'
        ];

        header('Location: tambah.php');
        exit;
    }

    // Kunci stok buku agar aman dari peminjaman bersamaan
    $stmt = $pdo->prepare("
        SELECT stok
        FROM buku
        WHERE id = :id
        FOR UPDATE
    ");

    $stmt->execute([
        ':id' => $buku_id
    ]);

    $buku = $stmt->fetch();

    if (!$buku) {
        throw new Exception('Buku tidak ditemukan.');
    }

    if ((int)$buku['stok'] < 1) {
        throw new Exception('Stok buku tidak tersedia.');
    }

    // Tambahkan data peminjaman
    $stmt = $pdo->prepare("
    INSERT INTO peminjaman
        (buku_id, anggota_id, tanggal_pinjam, tanggal_jatuh_tempo, status)
    VALUES
        (:buku_id, :anggota_id, CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days', 'dipinjam')
");

    $stmt->execute([
        ':buku_id' => $buku_id,
        ':anggota_id' => $anggota_id
    ]);

    // Kurangi stok buku
    $stmt = $pdo->prepare("
        UPDATE buku
        SET stok = stok - 1
        WHERE id = :id
    ");

    $stmt->execute([
        ':id' => $buku_id
    ]);

    $pdo->commit();

    $_SESSION['flash'] = [
        'type' => 'success',
        'pesan' => 'Peminjaman berhasil ditambahkan.'
    ];
    header('Location: ../index.php');
    exit;
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => 'Gagal menambahkan peminjaman: ' . $e->getMessage()
    ];
    header('Location: tambah.php');
    exit;
}
