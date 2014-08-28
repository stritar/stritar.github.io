<?php

global $project;
$project = 'msvic';

global $databaseConfig;
$databaseConfig = array(
	"type" => 'MySQLDatabase',
	"server" => 'localhost',
	"username" => 'msvicsi_prod',
	"password" => 'M782X8SR4W',
	"database" => 'msvicsi_prod',
	"path" => '',
);
HTTP::set_cache_age('26000000');
i18n::set_date_format('d.m.Y');
i18n::set_time_format('H:i');
FulltextSearchable::enable();
SSViewer::set_theme('msvic');
Security::setDefaultAdmin('igD2zitc','kQ2D7b7c');

ini_set("log_errors", "On");
ini_set("error_log", "/logs/error_log");

// Set the site locale
i18n::set_locale('sl_SI');
// dodaj live ali dev
Director::set_environment_type("live");
// nastavi folder na kerem se nahaja ali pa samo črtico
Director::setBaseURL('/'); 