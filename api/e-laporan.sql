-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 18 Jul 2023 pada 04.04
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.1.5

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
  `latitude` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `absensis`
--

INSERT INTO `absensis` (`id`, `id_user`, `status`, `keterangan_hadir`, `foto`, `tanggal`, `waktu_hadir`, `waktu_pulang`, `keterangan_pulang`, `created_at`, `updated_at`, `longitude`, `latitude`) VALUES
(1, 1, 'hadir', NULL, NULL, '2023-07-04', '07:04:24', '16:10:09', NULL, '2023-07-05 19:04:24', '2023-07-05 19:10:09', NULL, NULL),
(4, 1, 'hadir', NULL, NULL, '2023-07-05', '07:14:50', '14:15:20', NULL, '2023-07-05 19:14:50', '2023-07-05 19:15:20', NULL, NULL),
(6, 3, 'hadir', NULL, NULL, '2023-07-06', '09:21:37', '16:21:50', NULL, '2023-07-06 02:21:37', '2023-07-06 02:21:50', NULL, NULL),
(7, 3, 'hadir', NULL, NULL, '2023-07-07', '08:32:13', '08:32:22', NULL, '2023-07-07 01:32:13', '2023-07-07 01:32:22', NULL, NULL);

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
  `isDeleted` tinyint(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `saran` varchar(700) DEFAULT NULL,
  `kendala` varchar(700) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `documents`
--

INSERT INTO `documents` (`id`, `id_user`, `path`, `status`, `bulan`, `isDeleted`, `created_at`, `updated_at`, `saran`, `kendala`) VALUES
(12, 3, 'pdf/eZfSyBO1IGgBSBNqJW9yFOggANesQDiF4gDKr8c2.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-12 02:46:06', '2023-07-12 02:46:06', '', ''),
(13, 3, 'pdf/0rpcM3VvQhRpR3Oyba1YwltO46eYGu0ZyfPQeFAD.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-12 03:13:39', '2023-07-12 03:13:39', NULL, NULL),
(14, 3, 'pdf/chmchTZeipqp18S4uduKIZvYv1cCAqUGt47ftTaA.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-12 03:16:56', '2023-07-12 03:16:56', NULL, NULL),
(15, 3, 'pdf/rVmuAj9wDsSyAhuZQNaVhUXpkbLEVB1CuyZhFldB.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-12 03:17:38', '2023-07-12 03:17:38', NULL, NULL),
(16, 3, 'pdf/WXvGg8tpryVJAYnXMjj6qryvol8qh06qUR3lvKC9.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-12 03:18:17', '2023-07-12 03:18:17', NULL, NULL),
(17, 3, 'pdf/JP6aKSZxouLiCLBqn54BJV3qzTVU1qLDJIJXjVP1.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-12 03:47:10', '2023-07-12 03:47:10', NULL, NULL),
(18, 3, 'pdf/gTJXIEmiJ1OTQ1xEyVH75tEU9E4Tv4bFtOxhb2AQ.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-12 07:48:41', '2023-07-12 07:48:41', 'null', NULL),
(19, 3, 'pdf/w7B4lSt7Qa7eoJnCYUSEhUWluwDKszdRCL2xpffj.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-12 07:56:42', '2023-07-12 07:56:42', 'install office', 'laptop macbook tidak ada excel'),
(20, 3, 'pdf/oDrf2XKYfqJLlDHKfvPGGolnmtwFk4Vv06Rad8n8.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-13 01:29:38', '2023-07-13 01:29:38', 'install office', 'laptop macbook tidak ada excel'),
(21, 3, 'pdf/rCUE8ofDsclIK0NnCDBlYpP7sKQPuI3dixjVUaMe.pdf', 'Kasum', 'Jul 2023', 0, '2023-07-13 01:31:46', '2023-07-13 01:31:46', 'install office', 'laptop macbook tidak ada excel');

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
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
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
  `updated_at` timestamp NULL DEFAULT NULL,
  `year` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `laporans`
--

INSERT INTO `laporans` (`id`, `judul_kegiatan`, `uraian_kegiatan`, `id_absensi`, `created_at`, `updated_at`, `year`) VALUES
(1, 'fixing bug', 'fixing bug pada applikasi e-laporan pada bagian back-end', 1, '2023-07-07 01:28:12', '2023-07-07 01:28:12', ''),
(2, 'fixing bug', 'fixing bug pada applikasi e-laporan pada bagian back-end', 4, '2023-07-07 01:28:59', '2023-07-07 01:28:59', ''),
(3, 'fixing bug', 'fixing bug pada applikasi e-laporan pada bagian back-end', 6, '2023-07-07 01:29:05', '2023-07-07 01:29:05', ''),
(4, 'fixing bug', 'fixing bug pada applikasi e-laporan pada bagian back-end', 7, '2023-07-07 01:34:04', '2023-07-07 01:34:04', ''),
(5, 'fixing bug', 'fixing bug pada applikasi e-laporan pada bagian back-end', 7, '2023-07-08 01:34:17', '2023-07-07 01:34:17', '');

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
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'MyAuthApp', '6c45928c64c7a1a087da011b19a7454f32e1478a882efd133f9b6ed43f2f107d', '[\"*\"]', NULL, '2023-07-03 20:21:14', '2023-07-03 20:21:14'),
(2, 'App\\Models\\User', 1, 'MyAuthApp', '26b5784d8dad134ea29ee9ce0d4ea9f13c6d6ece6c1841c8be612a7a932fcc26', '[\"*\"]', NULL, '2023-07-03 20:22:22', '2023-07-03 20:22:22'),
(3, 'App\\Models\\User', 1, 'MyAuthApp', '693d27c691ea581d93e2f1d9f02aa67d5393459055b388009d1b9f3b0becf68d', '[\"*\"]', NULL, '2023-07-03 20:23:04', '2023-07-03 20:23:04'),
(5, 'App\\Models\\User', 1, 'MyAuthApp', '0846455f1ed1bf43a70d386f598285bd0ce06155052aaba4b0abeea03cd237e7', '[\"*\"]', '2023-07-12 02:18:37', '2023-07-03 20:53:32', '2023-07-12 02:18:37'),
(6, 'App\\Models\\User', 1, 'MyAuthApp', '5dd2b7f933df33089bf30c1369907b9a2c92e63ac1f1bcd8f498a39e2d707ef6', '[\"*\"]', NULL, '2023-07-03 20:57:35', '2023-07-03 20:57:35'),
(7, 'App\\Models\\User', 3, 'MyAuthApp', '16a6bc35f7f9791c3b389275853764d1c647cdd6f76ee8a76af1739f73c748c3', '[\"*\"]', NULL, '2023-07-03 22:40:06', '2023-07-03 22:40:06'),
(8, 'App\\Models\\User', 4, 'MyAuthApp', 'f48f11ed5e8cf1fd240f712bdb781f88d6fde68694e67110cf2dcfbdba7192a0', '[\"*\"]', NULL, '2023-07-03 23:29:47', '2023-07-03 23:29:47'),
(9, 'App\\Models\\User', 4, 'MyAuthApp', '2d2b8d6f2722ce414761b2781b1e0b46faa53edfa5f19acbfea6a0078287e4fe', '[\"*\"]', NULL, '2023-07-03 23:30:28', '2023-07-03 23:30:28'),
(10, 'App\\Models\\User', 4, 'MyAuthApp', 'cb9adb7cfae4957127c2e2f8333f042bf28c01e312df9725077c4623f81fddf6', '[\"*\"]', NULL, '2023-07-03 23:42:05', '2023-07-03 23:42:05'),
(11, 'App\\Models\\User', 4, 'MyAuthApp', 'b8cfdecb36024eb1de321e0e797df97d853e067111148269638c306abe8763df', '[\"*\"]', NULL, '2023-07-03 23:43:05', '2023-07-03 23:43:05'),
(12, 'App\\Models\\User', 1, 'MyAuthApp', '7a699a5abb5ece92e01434f76f82f0f70caadd9157810cb80e4eb2be7297744d', '[\"*\"]', NULL, '2023-07-03 23:43:47', '2023-07-03 23:43:47'),
(13, 'App\\Models\\User', 7, 'MyAuthApp', '328bb0a26eab3f9f6134c58edb1a5f9bd8823f5e5bd9b0d0ed99e914f2ccc8a6', '[\"*\"]', NULL, '2023-07-04 19:39:43', '2023-07-04 19:39:43'),
(14, 'App\\Models\\User', 7, 'MyAuthApp', 'c1b9e6b53ba14eed2367c51c5426b2c532ba4eefa95750a47936045ed87966bd', '[\"*\"]', '2023-07-12 03:06:38', '2023-07-04 20:12:30', '2023-07-12 03:06:38'),
(15, 'App\\Models\\User', 1, 'MyAuthApp', '1b90c0761fe26787ee3f4624c9326981f3db4300439c8ad7d112b21300dd273f', '[\"*\"]', '2023-07-06 03:15:03', '2023-07-05 18:58:10', '2023-07-06 03:15:03'),
(16, 'App\\Models\\User', 1, 'MyAuthApp', 'c72dd9aa1848ea0cef57580c4e44142e09167ded7f02899a22cbe77b8eb977b4', '[\"*\"]', NULL, '2023-07-06 08:04:36', '2023-07-06 08:04:36'),
(17, 'App\\Models\\User', 3, 'MyAuthApp', '64f95ebbc83bdf757cea2d10ee8083da4e680a396fa4ff2c5b8d3946008d49f5', '[\"*\"]', '2023-07-13 01:32:39', '2023-07-07 01:29:42', '2023-07-13 01:32:39'),
(18, 'App\\Models\\User', 1, 'MyAuthApp', '88a8b5b702731c0815c142a69b2aa3fa75d6664a3e22085301f1f97d3770071c', '[\"*\"]', NULL, '2023-07-13 02:34:52', '2023-07-13 02:34:52'),
(19, 'App\\Models\\User', 1, 'MyAuthApp', '2e68665788f31d155b444671d365541dba5896f97fd7220953df65e1aba88b3c', '[\"*\"]', NULL, '2023-07-13 03:53:27', '2023-07-13 03:53:27'),
(20, 'App\\Models\\User', 1, 'MyAuthApp', '736690593f20c18c1284570c49568d4741665dbe1719b9e96be87615e1e85859', '[\"*\"]', NULL, '2023-07-13 04:08:49', '2023-07-13 04:08:49'),
(21, 'App\\Models\\User', 1, 'MyAuthApp', 'e20bee39990f6ee060f1253c50afc6d49073d335a85e72d5031ff3e8243597c9', '[\"*\"]', NULL, '2023-07-13 08:06:36', '2023-07-13 08:06:36'),
(22, 'App\\Models\\User', 1, 'MyAuthApp', 'd210dde7df32398882f4031c9b2e3be639d02c07f389f83b1324e0fdee0bdd49', '[\"*\"]', NULL, '2023-07-14 07:31:02', '2023-07-14 07:31:02'),
(23, 'App\\Models\\User', 1, 'MyAuthApp', '521104996229a90c36e5e83d1aa0426b43341b11385eb3603b516a78fb540fa3', '[\"*\"]', NULL, '2023-07-14 07:58:44', '2023-07-14 07:58:44'),
(24, 'App\\Models\\User', 1, 'MyAuthApp', '243890098a2974cc1ec81eff849e628aece988d28a966962add70d562585f4d6', '[\"*\"]', NULL, '2023-07-14 08:00:08', '2023-07-14 08:00:08'),
(25, 'App\\Models\\User', 1, 'MyAuthApp', 'f0ba72c6af378649375102aa4f33664e5a5f21f6107d562c3255243624860148', '[\"*\"]', NULL, '2023-07-14 08:00:18', '2023-07-14 08:00:18'),
(26, 'App\\Models\\User', 1, 'MyAuthApp', '186dff95262d0a29642bf54a97f0f8077f7672288bce96cd3241096b4ebd8b01', '[\"*\"]', NULL, '2023-07-14 08:00:51', '2023-07-14 08:00:51'),
(27, 'App\\Models\\User', 1, 'MyAuthApp', '1a9e67331ba335cd02d82cc4578975ab2d1a2bce480f46191cf7cffa7990ec29', '[\"*\"]', NULL, '2023-07-14 08:02:41', '2023-07-14 08:02:41'),
(28, 'App\\Models\\User', 1, 'MyAuthApp', 'b25c6e6dd47a1184c6f2929c1465d31f3a018e9c71820633084f639f5f571a68', '[\"*\"]', NULL, '2023-07-14 08:02:41', '2023-07-14 08:02:41'),
(29, 'App\\Models\\User', 1, 'MyAuthApp', 'bdc64e45fd2fa146a8f6c96ee034a9a20d086dba12704c1b36cd544a570f100b', '[\"*\"]', NULL, '2023-07-14 08:03:09', '2023-07-14 08:03:09'),
(30, 'App\\Models\\User', 1, 'MyAuthApp', 'a2005df73b202ea3841156e70eb6056adc607f2717fb869d21ff0e16b79f21f0', '[\"*\"]', NULL, '2023-07-14 08:03:15', '2023-07-14 08:03:15'),
(31, 'App\\Models\\User', 1, 'MyAuthApp', 'c3104af68be7166552a67de2de725f08939f8ff45b41b5d5b45026534762ff3a', '[\"*\"]', NULL, '2023-07-14 08:03:15', '2023-07-14 08:03:15'),
(32, 'App\\Models\\User', 1, 'MyAuthApp', '57015bc6a16804727201b1afb58624c6204a7b51b7fdb62436759ec84107f9c5', '[\"*\"]', NULL, '2023-07-14 08:05:37', '2023-07-14 08:05:37'),
(33, 'App\\Models\\User', 1, 'MyAuthApp', 'ec5a27adbd1cd7c39bb6998000eb61c852692d0a0af1b1301b6ce8fb753418f9', '[\"*\"]', NULL, '2023-07-14 08:06:05', '2023-07-14 08:06:05'),
(34, 'App\\Models\\User', 1, 'MyAuthApp', 'e5329b6e08e764485a8196fbfef4691a7adf12e8b9b6abe8b9c3dd3444e03673', '[\"*\"]', NULL, '2023-07-14 08:06:05', '2023-07-14 08:06:05'),
(35, 'App\\Models\\User', 1, 'MyAuthApp', '32a28e286fba2dc6ebe0719df8e6728f020771429515d2b45baf1cfe3822aa77', '[\"*\"]', NULL, '2023-07-14 08:10:47', '2023-07-14 08:10:47'),
(36, 'App\\Models\\User', 1, 'MyAuthApp', '28fa5156e550c30bc088da81bdd8b52399870fad2592158959380d37b7675dc7', '[\"*\"]', NULL, '2023-07-14 08:11:02', '2023-07-14 08:11:02'),
(37, 'App\\Models\\User', 1, 'MyAuthApp', 'c881832564aea8ad40812963f1b4784bd0e71ccfa2d0d9881849ae51da24ac48', '[\"*\"]', NULL, '2023-07-14 08:11:03', '2023-07-14 08:11:03'),
(38, 'App\\Models\\User', 1, 'MyAuthApp', 'd2c43b604cfd394c5e51fd99fe0307c0840cd7d276cb3ca1332e72351b46ce42', '[\"*\"]', NULL, '2023-07-14 08:11:04', '2023-07-14 08:11:04'),
(39, 'App\\Models\\User', 1, 'MyAuthApp', '4c3936d76c598b796591636ea6f099a7c484d15037e1611cab3c44c1b350ce0f', '[\"*\"]', NULL, '2023-07-14 08:11:26', '2023-07-14 08:11:26'),
(40, 'App\\Models\\User', 1, 'MyAuthApp', 'e5fdec358d2ecf0bb815856ae8b581f5b53c2351c3f87402157e5365037d54b2', '[\"*\"]', NULL, '2023-07-14 08:11:27', '2023-07-14 08:11:27'),
(41, 'App\\Models\\User', 1, 'MyAuthApp', 'f04a5f3e2fdeef6c6dec5f3cbf03beec003e5c8d512ea83d671d48cc4e64ebfd', '[\"*\"]', NULL, '2023-07-14 08:11:43', '2023-07-14 08:11:43'),
(42, 'App\\Models\\User', 1, 'MyAuthApp', 'f8c3a5aa22424752475e3950ee8cc43467173ac78c91bee5f94e47d2db78ebca', '[\"*\"]', NULL, '2023-07-14 08:11:44', '2023-07-14 08:11:44'),
(43, 'App\\Models\\User', 1, 'MyAuthApp', '0ab2897a870d4c335ff2c303684de989c982094c1338d1c5f764327eb8040cb3', '[\"*\"]', NULL, '2023-07-14 08:11:44', '2023-07-14 08:11:44'),
(44, 'App\\Models\\User', 1, 'MyAuthApp', 'b510a789505ae2e2e509880e69de95bfc7b241796efdbafe17b119259c960975', '[\"*\"]', NULL, '2023-07-14 08:11:44', '2023-07-14 08:11:44'),
(45, 'App\\Models\\User', 1, 'MyAuthApp', '83f6c82d146d2c2ddf395b9d3244b6f0131916cb7e3403f6682079fb2d6b968d', '[\"*\"]', NULL, '2023-07-14 08:11:45', '2023-07-14 08:11:45'),
(46, 'App\\Models\\User', 1, 'MyAuthApp', '712bd221c4db72dcc03f97bd69db08062601a4607838f7a5e86f7396b6daac88', '[\"*\"]', NULL, '2023-07-14 08:12:45', '2023-07-14 08:12:45'),
(47, 'App\\Models\\User', 1, 'MyAuthApp', '78716682d423a7ebea52349a70fea4d5451c044aa3a9f91677b4d95cb78be91c', '[\"*\"]', NULL, '2023-07-14 08:12:45', '2023-07-14 08:12:45'),
(48, 'App\\Models\\User', 1, 'MyAuthApp', 'b8a180ae82c78ccfd44c94c8fd249f9abe23f9fed0e752822cf141dfefc62dad', '[\"*\"]', NULL, '2023-07-14 08:12:46', '2023-07-14 08:12:46'),
(49, 'App\\Models\\User', 1, 'MyAuthApp', 'be6e4cddb6e9eb5457c4457aa07a7d42052f47124e2f5991ffcd578374863a4b', '[\"*\"]', NULL, '2023-07-14 08:12:56', '2023-07-14 08:12:56'),
(50, 'App\\Models\\User', 1, 'MyAuthApp', 'dba62f559c9613f8b5cd457df8b959449fbbed0e2667c7eb9afc5dcdc26fb5dc', '[\"*\"]', NULL, '2023-07-14 08:13:36', '2023-07-14 08:13:36'),
(51, 'App\\Models\\User', 1, 'MyAuthApp', 'e7766c525e230b9ac1bc478b6df2cbc338fb5955ed534ff7cb85a63617377498', '[\"*\"]', NULL, '2023-07-14 08:13:37', '2023-07-14 08:13:37'),
(52, 'App\\Models\\User', 8, 'MyAuthApp', '4bb6cb9326de46330604e740d18193e4452c0d39927daa04864be8472909b45c', '[\"*\"]', NULL, '2023-07-14 08:14:39', '2023-07-14 08:14:39'),
(53, 'App\\Models\\User', 8, 'MyAuthApp', 'd692e07ba950d0d96117b186970b1065bba0bc492c573a54be812e4e3973e309', '[\"*\"]', NULL, '2023-07-14 08:14:39', '2023-07-14 08:14:39'),
(54, 'App\\Models\\User', 8, 'MyAuthApp', 'ac38d1adbc1e74bf33ddf1339f685463455ed09463beca046c20da1a24471d42', '[\"*\"]', NULL, '2023-07-14 08:15:17', '2023-07-14 08:15:17'),
(55, 'App\\Models\\User', 8, 'MyAuthApp', 'fb4516b4ee35b1f18d7436104ad4328ad9226fa11117eeb03cf562d0f7ae6f28', '[\"*\"]', NULL, '2023-07-14 08:42:59', '2023-07-14 08:42:59'),
(56, 'App\\Models\\User', 8, 'MyAuthApp', 'ff941bce25f0dacb7594a5281ac3e90eb3e798149a15f231e982f5cb727562ed', '[\"*\"]', NULL, '2023-07-14 08:43:39', '2023-07-14 08:43:39'),
(57, 'App\\Models\\User', 8, 'MyAuthApp', '93517580512ba5f271999d0306ba5889b194844d7cdaa5748e27a9d8c3396c3c', '[\"*\"]', NULL, '2023-07-14 08:49:55', '2023-07-14 08:49:55'),
(58, 'App\\Models\\User', 1, 'MyAuthApp', 'a23719d7ed3c80c0a360c7cc4cedf8f3608712ce7d40455a7b7e09f92dfad635', '[\"*\"]', NULL, '2023-07-17 02:12:43', '2023-07-17 02:12:43'),
(59, 'App\\Models\\User', 1, 'MyAuthApp', '12cf68da1314ea3229f9d95a9ccc91fc1186c29ba5a0c6b923adac10c071fa8f', '[\"*\"]', NULL, '2023-07-17 02:12:45', '2023-07-17 02:12:45'),
(60, 'App\\Models\\User', 1, 'MyAuthApp', '12f6cc4b791b48c315ed6447a4c35515506d3fe19e2e9daa0a3d9154304e89a4', '[\"*\"]', NULL, '2023-07-17 02:12:46', '2023-07-17 02:12:46'),
(61, 'App\\Models\\User', 1, 'MyAuthApp', '90b6c008b68209dd260012b722e81be83a9f6cc41dace7daa89be29a20b90863', '[\"*\"]', NULL, '2023-07-17 02:12:47', '2023-07-17 02:12:47'),
(62, 'App\\Models\\User', 1, 'MyAuthApp', 'c22d221f59482c5496c5e5f33eda750c9d87ccc8d9e9abe4e6023fcf069b5250', '[\"*\"]', NULL, '2023-07-17 02:12:48', '2023-07-17 02:12:48'),
(63, 'App\\Models\\User', 1, 'MyAuthApp', 'a17f2822b2f50ca787ba90533f8a09d2587ee4cea2056672c4b3f02312b6c269', '[\"*\"]', NULL, '2023-07-17 02:12:54', '2023-07-17 02:12:54'),
(64, 'App\\Models\\User', 1, 'MyAuthApp', '12ac927f3d59d5c740903fbb188669c92478399058fc887ed42d05991643e646', '[\"*\"]', NULL, '2023-07-17 02:12:55', '2023-07-17 02:12:55'),
(65, 'App\\Models\\User', 1, 'MyAuthApp', 'f65a4da42fcdb43d1ce8a0a19a57076381266c86956dbd985630f2116b9dc0e6', '[\"*\"]', NULL, '2023-07-17 02:12:56', '2023-07-17 02:12:56'),
(66, 'App\\Models\\User', 1, 'MyAuthApp', 'eb777bce945e22f79c4b4e7d13be48559b8f65d6c5708ca3b1d924865a9e6e05', '[\"*\"]', NULL, '2023-07-17 02:12:56', '2023-07-17 02:12:56'),
(67, 'App\\Models\\User', 1, 'MyAuthApp', 'c518aa93bf20e98844937e34e6a4ff4e3df727fa1eb303a075f42b71ddf28d47', '[\"*\"]', NULL, '2023-07-17 02:12:56', '2023-07-17 02:12:56'),
(68, 'App\\Models\\User', 1, 'MyAuthApp', 'e98367be5bd4c2870c2d2f703bf58a0c05490ee35d1ced6c9e308892dc0cf447', '[\"*\"]', NULL, '2023-07-17 02:12:57', '2023-07-17 02:12:57'),
(69, 'App\\Models\\User', 1, 'MyAuthApp', 'f5511f44f1ba6380dab1cabc81316c8a5610c6e2ce3abb3494a7b1bb9f6552b1', '[\"*\"]', NULL, '2023-07-17 02:12:57', '2023-07-17 02:12:57'),
(70, 'App\\Models\\User', 1, 'MyAuthApp', '9a228c2b8ac9d128970cd3847dc5bf240bd2b8a8e5770e42b4a4ddde033de491', '[\"*\"]', NULL, '2023-07-17 02:13:13', '2023-07-17 02:13:13'),
(71, 'App\\Models\\User', 1, 'MyAuthApp', '955c45b23e632cc9334afa9358c1f463e9ab003653301ff3b17318f5474e98f6', '[\"*\"]', NULL, '2023-07-17 02:16:19', '2023-07-17 02:16:19'),
(72, 'App\\Models\\User', 1, 'MyAuthApp', '311e7fe2c10042035b43e6457527369a0f5b3e31be2820097af48d79fa650f9d', '[\"*\"]', NULL, '2023-07-17 02:16:40', '2023-07-17 02:16:40'),
(73, 'App\\Models\\User', 1, 'MyAuthApp', 'df4be01c04c6bd42d4fa3319bc25ce5cb8f66d76deab2d7105615c13b53d197e', '[\"*\"]', NULL, '2023-07-17 02:16:40', '2023-07-17 02:16:40'),
(74, 'App\\Models\\User', 1, 'MyAuthApp', '24b6524801d2b1f101ea9961650daafaa2d2b23e24a02be8687d07c9d101a541', '[\"*\"]', NULL, '2023-07-17 02:23:38', '2023-07-17 02:23:38'),
(75, 'App\\Models\\User', 1, 'MyAuthApp', '1c36d9112b8dca4240a1d2c268f646c9d0ca0129a36a6cbf42170db3f43279c5', '[\"*\"]', NULL, '2023-07-17 02:23:50', '2023-07-17 02:23:50'),
(76, 'App\\Models\\User', 1, 'MyAuthApp', 'c46a512523c8783aa82a7de0003d00d559043e6c4b0b07508f4cf5d0e5444b69', '[\"*\"]', NULL, '2023-07-17 02:29:57', '2023-07-17 02:29:57'),
(77, 'App\\Models\\User', 1, 'MyAuthApp', 'c984d4c3d12cc8c65289b557182ee795ae4ad58def6b039202aa477061edc14b', '[\"*\"]', NULL, '2023-07-17 02:29:57', '2023-07-17 02:29:57'),
(78, 'App\\Models\\User', 1, 'MyAuthApp', 'c69d2e2817469a88d6d250e860696b90eed7a511e9b38958d38a67594247b7e7', '[\"*\"]', NULL, '2023-07-17 02:30:44', '2023-07-17 02:30:44'),
(79, 'App\\Models\\User', 1, 'MyAuthApp', 'aa5820edd7d3142964d1d48e7f456f0c791f95783d862890e319e1bb4a785742', '[\"*\"]', NULL, '2023-07-17 02:33:52', '2023-07-17 02:33:52'),
(80, 'App\\Models\\User', 1, 'MyAuthApp', 'd430335b171edfab05cddab1880e2d12119debe6a4410255adb12e8ebca5b81b', '[\"*\"]', NULL, '2023-07-17 02:33:53', '2023-07-17 02:33:53'),
(81, 'App\\Models\\User', 1, 'MyAuthApp', 'a22f00356786a604189e3ff631fa11a7ad9e5478b4c800eb739396547db5f84b', '[\"*\"]', NULL, '2023-07-17 02:34:01', '2023-07-17 02:34:01'),
(82, 'App\\Models\\User', 1, 'MyAuthApp', 'e3b7f2798f540fdec7da5e6b0107706a53a05dfee26ea95184cdf98c80ea10ce', '[\"*\"]', NULL, '2023-07-17 02:34:12', '2023-07-17 02:34:12'),
(83, 'App\\Models\\User', 1, 'MyAuthApp', '644c6ae7e1bb8675aea83a8615f191faf00631ca7a7a8302dd5cef16119699d8', '[\"*\"]', NULL, '2023-07-17 02:34:12', '2023-07-17 02:34:12'),
(84, 'App\\Models\\User', 1, 'MyAuthApp', '421ffddae7cbc40bfdca843fd5c643a28b455ca2f62d727e9c9ec2a318e37c75', '[\"*\"]', NULL, '2023-07-17 02:35:05', '2023-07-17 02:35:05'),
(85, 'App\\Models\\User', 1, 'MyAuthApp', '5c9ecdd32f92f72eecd73cefa8233429770afb401aea9c97721e270c350f838b', '[\"*\"]', NULL, '2023-07-17 02:35:07', '2023-07-17 02:35:07'),
(86, 'App\\Models\\User', 1, 'MyAuthApp', '58d2347ce43d2d5e0226564bb275e6de22b466d27689605d453b8c8ac61f225b', '[\"*\"]', '2023-07-17 04:34:58', '2023-07-17 02:36:36', '2023-07-17 04:34:58'),
(87, 'App\\Models\\User', 3, 'MyAuthApp', '0e0152c665bdbeb81b2e2fb996095a7f05f0ef929c72b6637a28416c34c9c24b', '[\"*\"]', '2023-07-17 04:40:24', '2023-07-17 04:40:12', '2023-07-17 04:40:24'),
(88, 'App\\Models\\User', 3, 'MyAuthApp', '494aa40b584583e36777dbc2f6ebeeba75bd98e3d0c55541ac9e1fe056d18053', '[\"*\"]', '2023-07-17 08:09:12', '2023-07-17 06:15:23', '2023-07-17 08:09:12'),
(89, 'App\\Models\\User', 3, 'MyAuthApp', '9f69a4d7e35885add9f1c8ff00161d0685a4add93af3e14f1a63ed7c75eddded', '[\"*\"]', '2023-07-17 07:18:37', '2023-07-17 06:46:54', '2023-07-17 07:18:37'),
(90, 'App\\Models\\User', 3, 'MyAuthApp', '1ebefd41dcacbace963dd0ec258b1a94b200190ba17b37ca608545a69b42dcdc', '[\"*\"]', '2023-07-17 08:37:26', '2023-07-17 08:19:38', '2023-07-17 08:37:26'),
(91, 'App\\Models\\User', 3, 'MyAuthApp', 'd696e4b0e5f2c582c5690af1614fd726cf597359330a3aabe038967b45dcaa94', '[\"*\"]', '2023-07-18 02:00:51', '2023-07-18 01:43:01', '2023-07-18 02:00:51');

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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `isComplete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data untuk tabel `profiles`
--

INSERT INTO `profiles` (`id`, `id_user`, `foto`, `latar_belakang`, `tujuan`, `ruang_lingkup`, `created_at`, `updated_at`, `isComplete`) VALUES
(1, 3, 'public/nsPD9BnvYpKRFofuJRBGPg69qDQO4rL9YVrh1yOD.jpg', 'tesss', 'tesss', '[\"pertama adalah\",\"kedua adalah\",\"ketiga adalah\"]', '2023-07-04 19:39:43', '2023-07-04 21:13:11', 1);

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
  `isActive` tinyint(255) DEFAULT 1,
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
(1, 'azwan', 'azwan@laporan.com', '$2y$10$lKcnGgOtJwDW.P4LtWKXteJXCX/9M4oeqSSAP7XwLeXaoLvcWOd56', 'admin', 'admin', 1, NULL, '2023-07-03 20:15:03', '2023-07-03 20:15:03', NULL, NULL),
(3, 'azwan1', 'tes@tes.com', '$2y$10$nqvWGgE0wnHZlHh9iuDNQuu8cWDlT1zqwHmwBi5FAHSFxyETNZ74.', 'Programmer', 'admin', 1, NULL, '2023-07-03 20:29:00', '2023-07-03 20:29:00', NULL, NULL),
(4, 'ondri', 'ondri@laporan.com', '$2y$10$gwlvSoI.iUKVgRaIPgwaaufUa.SFGPFRABy5JJh90Y606VfM9omwu', 'kaban', 'user', 1, NULL, '2023-07-03 23:29:47', '2023-07-03 23:29:47', NULL, NULL),
(7, 'azwan', 'azwan3@laporan.com', '$2y$10$/5f74SylkB7rs5S3GldEmejfDGWZ/m/WJsAIVk7qC7OBTCuiz/zJ6', 'kaban', 'user', 1, NULL, '2023-07-04 19:39:43', '2023-07-05 00:02:56', NULL, NULL),
(8, 'thl', 'thl@tes.com', '$2y$10$lKcnGgOtJwDW.P4LtWKXteJXCX/9M4oeqSSAP7XwLeXaoLvcWOd56', 'thl', 'thl', 1, NULL, '2023-07-14 07:58:57', '2023-07-14 07:58:57', NULL, '2023-07-14 07:58:57');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `laporans`
--
ALTER TABLE `laporans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT untuk tabel `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
