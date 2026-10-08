<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require __DIR__ . '/../includes/csrf.php';
require __DIR__ . '/../includes/koneksi.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.php');
    exit;
}

csrf_verify();

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = [];
}

if (!isset($_SESSION['login_attempts'][$username])) {
    $_SESSION['login_attempts'][$username] = 0;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->execute(['username' => $username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {

    session_regenerate_id(true);

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['nama'] = $user['nama'];
    $_SESSION['role'] = $user['role'];

    $_SESSION['login_attempts'][$username] = 0;

    if (isset($_POST['remember'])) {
        setcookie(
            'remember_username',
            $user['username'],
            time() + (60 * 60 * 24 * 30),
            '/',
            '',
            false,
            true
        );
    }

    header('Location: ../index.php');
    exit;
}

$_SESSION['login_attempts'][$username]++;

$attempts = $_SESSION['login_attempts'][$username];

if ($attempts >= 3) {
    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => "Login gagal {$attempts} kali. Terlalu banyak percobaan login."
    ];
} else {
    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => "Username atau password salah. Percobaan gagal: {$attempts}/3."
    ];
}

header('Location: login.php');
exit;
