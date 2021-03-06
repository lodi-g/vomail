SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `mails` (
  `id` BINARY(16) NOT NULL PRIMARY KEY,
  `subject` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body_html` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `raw` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `read` TINYINT(1) NOT NULL DEFAULT 0,
  `received_on` TIMESTAMP NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `attachments` (
  `id` BINARY(16) NOT NULL PRIMARY KEY,
  `mail_id` BINARY(16) NOT NULL,
  `filename` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `addresses` (
  `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `mail_id` BINARY(16) NOT NULL,
  `address` TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` TEXT COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` ENUM('from', 'to', 'cc', 'bcc') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `attachments` ADD FOREIGN KEY (`mail_id`) REFERENCES `mails` (`id`) ON DELETE CASCADE;

ALTER TABLE `addresses` ADD FOREIGN KEY (`mail_id`) REFERENCES `mails` (`id`) ON DELETE CASCADE;

COMMIT;
