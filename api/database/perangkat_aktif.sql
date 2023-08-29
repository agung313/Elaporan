-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Waktu pembuatan: 29 Agu 2023 pada 15.52
-- Versi server: 5.7.39
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-laporan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `perangkat_aktif`
--

CREATE TABLE `perangkat_aktif` (
  `id` int(11) NOT NULL,
  `token_perangkat` varchar(255) NOT NULL,
  `time_login` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time_logout` datetime DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `perangkat_aktif`
--

INSERT INTO `perangkat_aktif` (`id`, `token_perangkat`, `time_login`, `time_logout`, `id_user`, `created_at`, `updated_at`) VALUES
(1, 'fogy4TzeQx-4SbAjwGXmcA:APA91bGEr-QzAvDXrK6yGCM9eHbs_JloIhKhEVNK1Sy_wQrOH0d_i5MnFwRauEueXSuuM4o0h2LN-3wCgO5u8j1HnHKp8msNMt5KEiIBEsTYAw2RgUzZr7xRLDO4fjqe9hbVv-sc4Zer', '2023-08-29 22:31:11', '2023-08-29 22:50:17', 4, '2023-08-29 15:31:11', '2023-08-29 15:50:17'),
(2, 'fvfiDgZdTxWXDgFRG0__os:APA91bHjpMDlM0kQowjYEvtn3Iz_Iue5kyZM-RVkAHO-MoVc--K9lcsFCIXTnX50zLTVsVJzQFV2HS1OI8xNKIxnEQk5KXGg2RcL-e4kK_bPgbzJZu-N56COA2g2r3OgRyo_-_gA-KA8', '2023-08-29 22:44:29', NULL, 4, '2023-08-29 15:44:29', '2023-08-29 15:44:29'),
(3, 'fcWwPdhqRYmKjObaT4mj1b:APA91bGkvsqQqml1BP92b2zQkQqq0QvknET5nkuq8DJeCXRaVqu17WcyRz7Hmd-QJAyj_4rk5ajhtW0ThIEzx_51Du4pcBNIBJHs4_8fOGQJqpm_kQ7d9-UNHUrIAGqN8OfjUkNhW6nk', '2023-08-29 22:51:08', '2023-08-29 22:51:15', 4, '2023-08-29 15:51:08', '2023-08-29 15:51:15');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `perangkat_aktif`
--
ALTER TABLE `perangkat_aktif`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `perangkat_aktif`
--
ALTER TABLE `perangkat_aktif`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
