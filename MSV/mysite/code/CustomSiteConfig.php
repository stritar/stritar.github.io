<?php

class CustomSiteConfig extends DataExtension {
     
    private static $db = array(
    	'GoogleAnalytics' => 'Varchar(20)',
    	'FooterLocation' => 'Varchar(200)',
    	'FooterLocationURL' => 'Varchar(200)',
    	'FooterEmail' => 'Varchar(200)',
    	'FooterPhone1' => 'Varchar(200)',
    	'FooterPhone2' => 'Varchar(200)',
    	'FooterFB' => 'Varchar(200)',
    	'FooterTW' => 'Varchar(200)',
    	'FooterIN' => 'Varchar(200)',
        'FooterContent' => 'HTMLText'
    );
 
    public function updateCMSFields(FieldList $fields) {
    	$fields->addFieldToTab("Root.Main", new TextField ("GoogleAnalytics", 'Google Analytics Code'));
    	$fields->addFieldToTab("Root.Main", new TextField ("FooterLocation", 'Footer: Location'));
    	$fields->addFieldToTab("Root.Main", new TextField ("FooterLocationURL", 'Footer: Location URL'));
    	$fields->addFieldToTab("Root.Main", new TextField ("FooterEmail", 'Footer: Email'));
    	$fields->addFieldToTab("Root.Main", new TextField ("FooterPhone1", 'Footer: Phone #1'));
    	$fields->addFieldToTab("Root.Main", new TextField ("FooterPhone2", 'Footer: Phone #2'));
    	$fields->addFieldToTab("Root.Main", new TextField ("FooterFB", 'Footer: Facebook URL'));
    	$fields->addFieldToTab("Root.Main", new TextField ("FooterTW", 'Footer: Twiiter URL'));
    	$fields->addFieldToTab("Root.Main", new TextField ("FooterIN", 'Footer: Instagram URL'));
        $fields->addFieldToTab("Root.Main", new HTMLEditorField("FooterContent", "Footer sponzorji (UREJAJ HTML KODO!)"));
    }
}

?>