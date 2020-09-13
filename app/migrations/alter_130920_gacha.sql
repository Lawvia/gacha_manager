INSERT INTO `ms_games` (`id`, `name`, `image`, `description`, `id_genre`, `is_active`, `created`, `updated`) VALUES (NULL, 'Fate/Grand Order', 'https://pht.qoo-static.com/WRixOqWRZQHfCgFhqfWbjCh6myA4hO4bOPQ_KJJEKrB_G8KZvl0IvNEUmRuxnfx8Tbw=w300-rw', 'A new mobile \"Fate RPG,\" presented by TYPE-MOON!\r\nWith an impressive main scenario and multiple character quests,\r\nthe game features millions of words of original story!\r\nPacked with content that both fans of the Fate franchise and newcomers will be able to enjoy.', '1', '1', current_timestamp(), current_timestamp());

ALTER TABLE `ms_genre` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT, add PRIMARY KEY (`id`); 

CREATE TABLE `ms_server` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(100) NOT NULL , `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB; 
INSERT INTO `ms_server` (`id`, `name`, `created`, `updated`) VALUES (NULL, 'Japan', current_timestamp(), current_timestamp());
INSERT INTO `ms_server` (`id`, `name`, `created`, `updated`) VALUES (NULL, 'China', current_timestamp(), current_timestamp());
INSERT INTO `ms_server` (`id`, `name`, `created`, `updated`) VALUES (NULL, 'Korea', current_timestamp(), current_timestamp());
INSERT INTO `ms_server` (`id`, `name`, `created`, `updated`) VALUES (NULL, 'Global', current_timestamp(), current_timestamp());
INSERT INTO `ms_server` (`id`, `name`, `created`, `updated`) VALUES (NULL, 'SEA', current_timestamp(), current_timestamp());

ALTER TABLE `tr_user_account` ADD `server_id` INT NOT NULL AFTER `description`; 