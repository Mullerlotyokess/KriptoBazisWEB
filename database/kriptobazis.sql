-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 24. 12:01
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kriptobazis`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `forumposts`
--

CREATE TABLE `forumposts` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `date` date NOT NULL,
  `replies` int(11) NOT NULL,
  `description` varchar(9999) NOT NULL,
  `title` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `news`
--

CREATE TABLE `news` (
  `ID` int(11) NOT NULL,
  `title` varchar(40) NOT NULL,
  `author` varchar(40) NOT NULL,
  `content` varchar(500) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `news`
--

INSERT INTO `news` (`ID`, `title`, `author`, `content`, `date`) VALUES
(1, 'Legújabb hír', 'vezetőség', 'A Bitcoin elérte a valaha legnagyobb értéket és evvel újabb szenzáció kíséri a kriptovaluták világát!', '2024-04-23'),
(2, 'Cardano fél dollár', 'Ferenc', 'Cardano a mai nap elérte a fél dollárt amire egészen 2 éve nem volt példa, \r\nsokak szerint 2025-ben elérheti az 5 dollárt is!', '2024-03-01'),
(9, 'Solana 100 $ felett', 'István', 'minapokban a solana az a coin ami a legnagyobbat emelkedett a népszerű coinok körében, rengetegen fektetnek be, mondván ez a valuta veheti át az uralmat', '2024-04-05');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `profiles`
--

CREATE TABLE `profiles` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `statusmsg` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `social` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(40) NOT NULL,
  `privilege` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `username`, `email`, `pass`, `privilege`) VALUES
(24, 'admin', 'admin@admin.hu', '7af2d10b73ab7cd8f603937f7697cb5fe432c7ff', 'admin'),
(33, 'bruhcamelxd', 'bruhcamelxd@gmail.com', '7af2d10b73ab7cd8f603937f7697cb5fe432c7ff', 'user');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `forumposts`
--
ALTER TABLE `forumposts`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `forumposts`
--
ALTER TABLE `forumposts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `news`
--
ALTER TABLE `news`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `profiles`
--
ALTER TABLE `profiles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
