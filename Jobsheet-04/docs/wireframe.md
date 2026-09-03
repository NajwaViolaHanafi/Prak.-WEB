````markdown
## 3. Struktur Navigasi

Struktur navigasi sistem informasi perpustakaan adalah sebagai berikut:

```text
Login
  |
  v
Dashboard Petugas
  |
  +-- Peminjaman
  |
  +-- Pengembalian
  |
  +-- Riwayat
  |
  +-- Logout
````

---

## 4. Wireframe Login

```text
+----------------------------------+
|       SISTEM PERPUSTAKAAN        |
|                                  |
|              LOGIN               |
|                                  |
| Username                         |
| [____________________________]   |
|                                  |
| Password                         |
| [____________________________]   |
|                                  |
|          [     LOGIN     ]       |
|                                  |
+----------------------------------+
```

### Keterangan

Halaman login digunakan oleh petugas untuk masuk ke dalam sistem. Petugas mengisi username dan password, kemudian menekan tombol Login.

---

## 5. Wireframe Dashboard Petugas

```text
+------------------------------------------------+
| SISTEM PERPUSTAKAAN             Petugas Logout |
+------------------------------------------------+
|                                                |
| Dashboard                                      |
|                                                |
| +------------+ +------------+ +------------+   |
| | Total Buku | |  Anggota   | | Dipinjam   |   |
| |    120     | |     50     | |     15     |   |
| +------------+ +------------+ +------------+   |
|                                                |
| Menu:                                          |
| [ Peminjaman ] [ Pengembalian ] [ Riwayat ]    |
|                                                |
| Aktivitas Terbaru                              |
| +--------------------------------------------+ |
| | No | Anggota | Buku | Aktivitas | Tanggal | |
| +--------------------------------------------+ |
| | 1  | ...     | ...  | ...       | ...     | |
| | 2  | ...     | ...  | ...       | ...     | |
| +--------------------------------------------+ |
+------------------------------------------------+
```

### Keterangan

Dashboard merupakan halaman utama petugas setelah berhasil login. Dashboard menampilkan informasi singkat seperti jumlah buku, jumlah anggota, jumlah buku yang sedang dipinjam, serta menu untuk mengakses fitur utama.

---

## 6. Wireframe Peminjaman

```text
+------------------------------------------------+
| SISTEM PERPUSTAKAAN             Petugas Logout |
+------------------------------------------------+
|                                                |
| Peminjaman                                     |
|                                                |
| Anggota                                        |
| [ Pilih Anggota             v ]                |
|                                                |
| Buku                                            |
| [ Pilih Buku                v ]                |
|                                                |
| Tanggal Peminjaman                             |
| [____________________________]                 |
|                                                |
| Tanggal Jatuh Tempo                            |
| [____________________________]                 |
|                                                |
|       [ Simpan Peminjaman ]                    |
|                                                |
| Data Peminjaman                                |
| +--------------------------------------------+ |
| | No | Anggota | Buku | Tanggal | Jatuh Tempo| |
| +--------------------------------------------+ |
+------------------------------------------------+
```

### Keterangan

Halaman peminjaman digunakan petugas untuk mencatat transaksi peminjaman buku. Petugas memilih anggota dan buku, kemudian mengisi tanggal peminjaman serta tanggal jatuh tempo.

---

## 7. Wireframe Pengembalian

```text
+------------------------------------------------+
| SISTEM PERPUSTAKAAN             Petugas Logout |
+------------------------------------------------+
|                                                |
| Pengembalian                                   |
|                                                |
| Cari Peminjaman                                |
| [________________________] [ Cari ]            |
|                                                |
| Detail Peminjaman                              |
| Nama Anggota    : ...........................  |
| Judul Buku      : ...........................  |
| Tanggal Pinjam  : ...........................  |
| Jatuh Tempo     : ...........................  |
|                                                |
| Tanggal Kembali                                |
| [____________________________]                 |
|                                                |
|      [ Proses Pengembalian ]                   |
+------------------------------------------------+
```

### Keterangan

Halaman pengembalian digunakan petugas untuk memproses buku yang dikembalikan. Petugas mencari data peminjaman, memeriksa detail transaksi, kemudian mengisi tanggal pengembalian dan memproses pengembalian.

---

## 8. Wireframe Riwayat

```text
+------------------------------------------------+
| SISTEM PERPUSTAKAAN             Petugas Logout |
+------------------------------------------------+
|                                                |
| Riwayat Transaksi                              |
|                                                |
| Filter                                         |
| [ Semua Aktivitas v ] [ Tanggal ] [ Cari ]     |
|                                                |
| +--------------------------------------------+ |
| | No | Anggota | Buku | Aktivitas | Tanggal | |
| +--------------------------------------------+ |
| | 1  | ...     | ...  | Peminjaman| ...     | |
| | 2  | ...     | ...  | Pengembalian| ...   | |
| | 3  | ...     | ...  | Peminjaman| ...     | |
| +--------------------------------------------+ |
+------------------------------------------------+
```

### Keterangan

Halaman riwayat digunakan petugas untuk melihat transaksi peminjaman dan pengembalian yang telah dilakukan. Petugas dapat menggunakan filter atau pencarian untuk menemukan transaksi tertentu.

---

## 9. User Flow Login

```text
Mulai
  |
  v
Halaman Login
  |
  v
Isi Username dan Password
  |
  v
Klik Login
  |
  v
Validasi Data
  |
  +---- Tidak Valid ----> Tampilkan Pesan Error
  |                              |
  |                              v
  |                         Kembali ke Login
  |
  +---- Valid ----------> Dashboard Petugas
```

---

## 10. User Flow Peminjaman

```text
Dashboard
  |
  v
Pilih Peminjaman
  |
  v
Pilih Anggota
  |
  v
Pilih Buku
  |
  v
Isi Tanggal Peminjaman
  |
  v
Isi Tanggal Jatuh Tempo
  |
  v
Klik Simpan
  |
  v
Data Peminjaman Tersimpan
  |
  v
Riwayat Diperbarui
```

---

## 11. User Flow Pengembalian

```text
Dashboard
  |
  v
Pilih Pengembalian
  |
  v
Cari Data Peminjaman
  |
  v
Tampilkan Detail Peminjaman
  |
  v
Isi Tanggal Pengembalian
  |
  v
Klik Proses Pengembalian
  |
  v
Status Peminjaman Diperbarui
  |
  v
Riwayat Diperbarui
```

---

## 12. User Flow Riwayat

```text
Dashboard
  |
  v
Pilih Riwayat
  |
  v
Pilih Filter
  |
  v
Klik Cari
  |
  v
Sistem Menampilkan Data Transaksi
  |
  v
Petugas Melihat Riwayat
```

---

## 13. User Flow Keseluruhan

```text
                    +---------+
                    |  LOGIN  |
                    +----+----+
                         |
                         v
                +------------------+
                |    DASHBOARD     |
                |     PETUGAS      |
                +--------+---------+
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
   +-------------+ +-------------+ +-------------+
   | PEMINJAMAN  | |PENGEMBALIAN | |   RIWAYAT   |
   +-------------+ +-------------+ +-------------+
          |              |
          v              v
     Simpan Data    Update Status
          |              |
          +------+-------+
                 |
                 v
              RIWAYAT
```

---

## 14. Kesimpulan

Wireframe ini digunakan sebagai rancangan awal untuk pengembangan Sistem Informasi Perpustakaan. Rancangan mencakup halaman Login, Dashboard Petugas, Peminjaman, Pengembalian, dan Riwayat.

Wireframe ini akan menjadi acuan dalam pengembangan tampilan dan fitur pada jobsheet berikutnya.

