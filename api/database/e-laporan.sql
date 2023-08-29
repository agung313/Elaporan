-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Waktu pembuatan: 29 Agu 2023 pada 02.23
-- Versi server: 5.7.39
-- Versi PHP: 7.4.33

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
-- Struktur dari tabel `absensis`
--

CREATE TABLE `absensis` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `keterangan_hadir` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `tanggal` varchar(255) DEFAULT NULL,
  `waktu_hadir` varchar(255) DEFAULT NULL,
  `waktu_pulang` varchar(255) DEFAULT NULL,
  `keterangan_pulang` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `catatan_kasum` varchar(255) DEFAULT NULL,
  `approveAdmin` tinyint(11) NOT NULL DEFAULT '1',
  `isApprove` enum('diajukan','ditolak','diterima') NOT NULL DEFAULT 'diterima'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `absensis`
--

INSERT INTO `absensis` (`id`, `id_user`, `status`, `keterangan_hadir`, `foto`, `tanggal`, `waktu_hadir`, `waktu_pulang`, `keterangan_pulang`, `created_at`, `updated_at`, `longitude`, `latitude`, `catatan_kasum`, `approveAdmin`, `isApprove`) VALUES
(1, 3, 'hadir', NULL, NULL, '2023-07-04', '07:04:24', '16:10:09', NULL, '2023-07-05 19:04:24', '2023-07-05 19:10:09', NULL, NULL, NULL, 1, 'diterima'),
(4, 3, 'tidak hadir', NULL, NULL, '2023-07-05', '', '', NULL, '2023-07-05 19:14:50', '2023-07-05 19:15:20', NULL, NULL, NULL, 1, 'diterima'),
(6, 3, 'hadir', NULL, NULL, '2023-07-06', '09:21:37', '16:21:50', NULL, '2023-07-06 02:21:37', '2023-07-06 02:21:50', NULL, NULL, NULL, 1, 'diterima'),
(7, 4, 'hadir', NULL, NULL, '2023-07-07', '08:32:13', '08:32:22', NULL, '2023-07-07 01:32:13', '2023-07-07 01:32:22', NULL, NULL, NULL, 1, 'diterima'),
(8, 4, 'hadir', NULL, NULL, '2023-07-17', '09:03:02', '10:29:16', NULL, '2023-07-17 02:03:02', '2023-07-17 03:29:16', NULL, NULL, NULL, 1, 'diterima'),
(9, 3, 'izin', NULL, NULL, '2023-07-20', '10:38:54', NULL, NULL, '2023-07-20 03:38:54', '2023-07-20 03:38:54', NULL, NULL, NULL, 1, 'diterima'),
(12, 3, 'Izin', NULL, NULL, '2023-07-28', NULL, NULL, NULL, '2023-07-28 02:49:07', '2023-07-28 02:52:32', NULL, NULL, NULL, 1, 'diterima'),
(14, 4, 'hadir', NULL, NULL, '2023-08-12', '14:20:00', NULL, NULL, '2023-07-31 07:20:00', '2023-07-31 07:20:00', NULL, NULL, NULL, 1, 'diterima'),
(24, 3, 'izin', 'ada acara keluarga selama 4 hari di kampung', NULL, '2023-08-21', NULL, NULL, NULL, '2023-08-21 04:16:27', '2023-08-26 07:48:41', NULL, NULL, 'hanya boleh izin selama 3 hari', 1, 'diterima'),
(32, 9, 'sakit', 'diare', '/DIw3PIkVq9a7iQwjK8uINR2TaHb2SKCgrDlYzaWh.jpg', '2023-08-24', NULL, NULL, NULL, '2023-08-24 14:21:18', '2023-08-24 14:21:18', NULL, NULL, 'semoga lekas sembuh', 0, 'diterima'),
(55, 3, 'izin', NULL, NULL, '2023-08-22', NULL, NULL, NULL, '2023-08-26 07:48:41', '2023-08-26 07:48:41', NULL, NULL, NULL, 1, 'diterima'),
(56, 3, 'izin', NULL, NULL, '2023-08-23', NULL, NULL, NULL, '2023-08-26 07:48:41', '2023-08-26 07:48:41', NULL, NULL, NULL, 1, 'diterima'),
(57, 3, 'izin', NULL, NULL, '2023-08-24', NULL, NULL, NULL, '2023-08-26 07:48:41', '2023-08-26 07:48:41', NULL, NULL, NULL, 1, 'diterima'),
(58, 3, 'izin', NULL, NULL, '2023-08-25', NULL, NULL, NULL, '2023-08-26 07:48:41', '2023-08-26 07:48:41', NULL, NULL, NULL, 1, 'diterima');

-- --------------------------------------------------------

--
-- Struktur dari tabel `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `bulan` varchar(255) NOT NULL,
  `tahun` int(11) NOT NULL,
  `isDeleted` tinyint(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `saran` varchar(700) DEFAULT NULL,
  `kendala` varchar(700) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `documents`
--

INSERT INTO `documents` (`id`, `id_user`, `path`, `status`, `bulan`, `tahun`, `isDeleted`, `created_at`, `updated_at`, `saran`, `kendala`) VALUES
(33, 9, 'pdf/Lp5AB3iO6Bh36I2BdqZpC46vpEAU4uywAK8x30c1.pdf', 'diapprove', '8', 2023, 0, '2023-08-25 08:24:06', '2023-08-25 08:36:39', NULL, '[\"Kendala pertama(^*^)Solusi pertama\",\"Ondriiiii(^*^)Nurdiansyah\"]'),
(34, 4, 'pdf/0yTM0PLzFvmLDVm47KiLKzQ6HKiHUveSBT63RN6c.pdf', 'diapprove', '7', 2023, 0, '2023-08-27 07:25:51', '2023-08-27 07:25:51', 'saran', 'kendala');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Struktur dari tabel `laporans`
--

CREATE TABLE `laporans` (
  `id` int(11) NOT NULL,
  `judul_kegiatan` varchar(500) DEFAULT NULL,
  `uraian_kegiatan` varchar(500) DEFAULT NULL,
  `id_absensi` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `laporans`
--

INSERT INTO `laporans` (`id`, `judul_kegiatan`, `uraian_kegiatan`, `id_absensi`, `created_at`, `updated_at`) VALUES
(3, 'fixing bug', 'fixing bug pada applikasi e-laporan pada bagian back-end', 6, '2023-07-07 01:29:05', '2023-07-07 01:29:05'),
(4, 'fixing bug', 'fixing bug pada applikasi e-laporan pada bagian back-end', 7, '2023-07-07 01:34:04', '2023-07-07 01:34:04'),
(5, 'fixing bug', 'fixing bug pada applikasi e-laporan pada bagian back-end', 7, '2023-07-08 01:34:17', '2023-07-07 01:34:17'),
(6, 'fixing bug', 'fixing bug pada applikasi e-laporan pada bagian back-end', 7, '2023-07-31 06:48:12', '2023-07-31 06:48:12'),
(7, 'Kegiatan 1', 'urairan kegiatan', 14, '2023-08-24 14:34:07', '2023-08-24 14:34:07'),
(8, 'Dokumentasi', 'Mendokumentasukan kegiatan pimpinan', 8, '2023-08-27 01:36:10', '2023-08-27 01:36:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `liburs`
--

CREATE TABLE `liburs` (
  `id` int(11) NOT NULL,
  `tanggal` varchar(255) NOT NULL,
  `ket` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `liburs`
--

INSERT INTO `liburs` (`id`, `tanggal`, `ket`, `created_at`, `updated_at`) VALUES
(2, '2023-08-18', 'libur hari kejepit', '2023-08-18 03:44:37', '2023-08-18 03:44:37'),
(3, '2023-09-18', 'libur hari kejepit', '2023-08-18 08:13:55', '2023-08-18 08:13:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(13, 'App\\Models\\User', 7, 'MyAuthApp', '328bb0a26eab3f9f6134c58edb1a5f9bd8823f5e5bd9b0d0ed99e914f2ccc8a6', '[\"*\"]', NULL, '2023-07-04 19:39:43', '2023-07-04 19:39:43'),
(14, 'App\\Models\\User', 7, 'MyAuthApp', 'c1b9e6b53ba14eed2367c51c5426b2c532ba4eefa95750a47936045ed87966bd', '[\"*\"]', '2023-07-13 03:50:43', '2023-07-04 20:12:30', '2023-07-13 03:50:43'),
(32, 'App\\Models\\User', 1, 'MyAuthApp', 'e400cd27de908c49866a48b2f4ad6cb698c75275024a8a8345b8fcc1ee554ae4', '[\"*\"]', '2023-08-25 08:55:57', '2023-08-25 08:40:00', '2023-08-25 08:55:57'),
(33, 'App\\Models\\User', 9, 'MyAuthApp', 'fecc55ae2719c2b64fe7e7bd90a2c75dae7fac90db47a96442d2fa706bc425bd', '[\"*\"]', '2023-08-25 08:54:09', '2023-08-25 08:53:49', '2023-08-25 08:54:09'),
(34, 'App\\Models\\User', 1, 'MyAuthApp', '1afb7a02afada69a22d84bb918424074db9acecae4415cbed1c2c66f20307e59', '[\"*\"]', '2023-08-25 08:54:39', '2023-08-25 08:54:29', '2023-08-25 08:54:39'),
(35, 'App\\Models\\User', 9, 'MyAuthApp', 'd19f5ec83de04158b426990d86d1677bdcc7c533e992e35fd669f66efba2c9c8', '[\"*\"]', '2023-08-26 00:28:48', '2023-08-26 00:27:42', '2023-08-26 00:28:48'),
(36, 'App\\Models\\User', 1, 'MyAuthApp', 'b7f9c56056d7f3c99f28722369e050c674ec253c7dded2351ccd23ce456c4abd', '[\"*\"]', '2023-08-26 01:46:27', '2023-08-26 00:32:19', '2023-08-26 01:46:27'),
(37, 'App\\Models\\User', 1, 'MyAuthApp', 'b275607b5795f4aa6adc400748df2f6d3f0b6605d3983c15712ac3e43bee659f', '[\"*\"]', '2023-08-26 01:31:17', '2023-08-26 00:49:28', '2023-08-26 01:31:17'),
(38, 'App\\Models\\User', 1, 'MyAuthApp', '462cd328b6d58396463a73c3219dcf1dcc3738efd3d7ac3f1cecc510deaf5f59', '[\"*\"]', '2023-08-26 08:00:02', '2023-08-26 07:22:57', '2023-08-26 08:00:02'),
(39, 'App\\Models\\User', 1, 'MyAuthApp', '69f2126f335d3dd2225fa49969aaf1c4d03b43b898e031627711e7be5eb8ba9b', '[\"*\"]', '2023-08-26 07:33:32', '2023-08-26 07:29:54', '2023-08-26 07:33:32'),
(40, 'App\\Models\\User', 1, 'MyAuthApp', 'daa0d46618698592ac9f82f4ff8a733bd666e20d864ebeef2b0a112bb1bcd1e9', '[\"*\"]', '2023-08-26 09:44:33', '2023-08-26 09:39:25', '2023-08-26 09:44:33'),
(41, 'App\\Models\\User', 1, 'MyAuthApp', '2b32dd007e9b30176b24c33afc9d4b0b0bc3c93e64a37ec566c5ee849e22c33f', '[\"*\"]', '2023-08-26 15:52:10', '2023-08-26 11:49:04', '2023-08-26 15:52:10'),
(51, 'App\\Models\\User', 8, 'MyAuthApp', '178d488ca6165f13543c16879ca9230094e967c907f95bc546d282db25796903', '[\"*\"]', NULL, '2023-08-27 10:16:44', '2023-08-27 10:16:44'),
(52, 'App\\Models\\User', 8, 'MyAuthApp', 'fa661f0bbda5a64d0e8bef4513ec34e263c309f3d7bb4f1264c5abbc68782e45', '[\"*\"]', NULL, '2023-08-27 10:17:25', '2023-08-27 10:17:25'),
(53, 'App\\Models\\User', 8, 'MyAuthApp', '6cd80e9b9b82f3720beace7726b529315abe8cd6b8fbbeeb6bbd1b3c6dc94992', '[\"*\"]', NULL, '2023-08-27 10:17:45', '2023-08-27 10:17:45'),
(54, 'App\\Models\\User', 8, 'MyAuthApp', '850778f98db3ed087aa8231f5f15e9eaf276a230a4de8170f9fa5738f38bd683', '[\"*\"]', NULL, '2023-08-27 10:18:10', '2023-08-27 10:18:10'),
(55, 'App\\Models\\User', 8, 'MyAuthApp', 'b85e087407e184d627cd00aa7523923e482ea3b9a1dc16ea95b8f5ca8523fdad', '[\"*\"]', NULL, '2023-08-27 10:18:13', '2023-08-27 10:18:13'),
(61, 'App\\Models\\User', 8, 'MyAuthApp', 'fa89118780df87df5a09a02c2c7896a84424a679e8f77aa2657e5c2fe9ffe133', '[\"*\"]', NULL, '2023-08-28 03:15:25', '2023-08-28 03:15:25'),
(62, 'App\\Models\\User', 4, 'MyAuthApp', '9a2674412c5ec26169c6a452397a0a8b24b2e5a38e09e4b8de95d21dfe9de68d', '[\"*\"]', '2023-08-29 02:22:17', '2023-08-29 02:19:35', '2023-08-29 02:22:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `latar_belakang` varchar(700) DEFAULT NULL,
  `tujuan` varchar(700) DEFAULT NULL,
  `ruang_lingkup` varchar(700) DEFAULT NULL,
  `ttd` varchar(255) DEFAULT NULL,
  `isComplete` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `profiles`
--

INSERT INTO `profiles` (`id`, `id_user`, `foto`, `latar_belakang`, `tujuan`, `ruang_lingkup`, `ttd`, `isComplete`, `created_at`, `updated_at`) VALUES
(1, 3, '/foto_profile/KhMqJR9B8Ys8FffzvCFgQdfJaZspRm9ReoHEkT85.jpg', 'isian latar belakang wajib diisi', 'isian tujuan wajib diisi', '\"[\\\"pertama adalah blabla\\\",\\\"kedua adalah bla bla\\\",\\\"ketiga adalah bla bla\\\"]\"', 'public/UHRlfG1wQhxkisEDe6r2sCBm3WIZzSkFnWCFDhvM.png', 1, '2023-07-04 19:39:43', '2023-08-26 14:06:18'),
(2, 8, '/foto_profile/YasSsdGgtGYcOnZAtExRmlVdbys7uweVozYm1bl2.jpg', 'isian latar belakang wajib diisi 1', 'isian tujuan wajib diisi', '\"[\\\"pertama adalah blabla\\\",\\\"kedua adalah bla bla\\\",\\\"ketiga adalah bla bla\\\"]\"', '/ttd/64eac813eda88.png', 1, '2023-08-10 02:42:07', '2023-08-27 03:50:43'),
(3, 9, '/foto_profile/9FeRolOYCu34LsfGX5USSumFmD7G5uYkdWegaKIw.jpg', 'latar', 'adasdsadad', '\"[\\\"1111111\\\"]\"', '/ttd/64e767ea1a5a4.png', 1, '2023-08-24 06:36:16', '2023-08-24 15:11:19'),
(4, 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(5, 4, '/foto_profile/YasSsdGgtGYcOnZAtExRmlVdbys7uweVozYm1bl2.jpg', 'latar belakang pekerjaaan adalah', 'maksud dan tujuan pekerjaan adalaj', '\"[\\\"ruang lingkup 1\\\",\\\"ruang lingkup 2\\\"]\"', '/ttd/64eaabf198b64.png', 1, NULL, '2023-08-27 01:52:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jabatan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(3) DEFAULT '0',
  `device` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `jabatan`, `role`, `isActive`, `device`, `created_at`, `updated_at`, `remember_token`, `email_verified_at`) VALUES
(1, 'azwan', 'admin@laporan.com', '$2y$10$bXP57M.iREIc0M5V/QonBueDDOj93.93guX.23v3anwnyV77w5aQi', 'admin', 'admin', 1, 'PostmanRuntime/7.32.3', '2023-07-03 20:15:03', '2023-07-03 20:15:03', NULL, NULL),
(3, 'M . Azwan', 'tes@laporan.com', '$2y$10$bXP57M.iREIc0M5V/QonBueDDOj93.93guX.23v3anwnyV77w5aQi', 'Tenaga Ahli IT', 'admin', 1, 'PostmanRuntime/7.32.3', '2023-07-03 20:29:00', '2023-08-26 14:21:56', NULL, NULL),
(4, 'aulia', 'user@laporan.com', '$2y$10$bXP57M.iREIc0M5V/QonBueDDOj93.93guX.23v3anwnyV77w5aQi', 'THL', 'user', 1, NULL, '2023-07-03 23:29:47', '2023-08-28 03:14:53', NULL, NULL),
(7, 'azwan', 'azwan3@laporan.com', '$2y$10$/5f74SylkB7rs5S3GldEmejfDGWZ/m/WJsAIVk7qC7OBTCuiz/zJ6', 'kaban', 'user', 1, 'PostmanRuntime/7.32.3', '2023-07-04 19:39:43', '2023-07-05 00:02:56', NULL, NULL),
(8, 'kasum', 'kasum@laporan.com', '$2y$10$0tMr43iPeh8fcnM38eI7ruzlJtxZEYRMyItwEjYy5YJZ38FrhzhTK', 'kasum', 'kasum', 1, NULL, '2023-08-10 02:42:07', '2023-08-27 10:18:10', NULL, NULL),
(9, 'Ondri Nurdiansyah', 'ondri@absen.com', '$2y$10$bXP57M.iREIc0M5V/QonBueDDOj93.93guX.23v3anwnyV77w5aQi', 'THL', 'user', 1, 'okhttp/4.9.2', '2023-08-24 06:36:16', '2023-08-24 06:36:16', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `absensis`
--
ALTER TABLE `absensis`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indeks untuk tabel `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`) USING BTREE;

--
-- Indeks untuk tabel `laporans`
--
ALTER TABLE `laporans`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indeks untuk tabel `liburs`
--
ALTER TABLE `liburs`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indeks untuk tabel `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`) USING BTREE;

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`) USING BTREE,
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`) USING BTREE;

--
-- Indeks untuk tabel `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `users_email_unique` (`email`) USING BTREE;

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `absensis`
--
ALTER TABLE `absensis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT untuk tabel `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `laporans`
--
ALTER TABLE `laporans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `liburs`
--
ALTER TABLE `liburs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT untuk tabel `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
