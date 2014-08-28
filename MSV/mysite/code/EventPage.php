<?php
class EventPage extends Page {
	private static $db = array(
		'Date' => 'Date',
		//'Dogodek' => 'HTMLText', 
	);
	private static $has_one = array(
		
	);
	public function oneLineContent($input)
	{
		$string = trim(preg_replace('/\s+/', ' ', $input));
		return $string;
	}
	public function getCMSFields() {
        $fields = parent::getCMSFields();
        $dateField = new DateField('Date');
        $dateField->setConfig('showcalendar', true);
        $dateField->setConfig('dateformat', 'dd.MM.YYYY');
        $fields->addFieldToTab('Root.Main', $dateField, 'Content'); 
        //$fields->removeFieldFromTab('Root.Main', 'Content');
        //$fields->removeFieldFromTab('Root.Main', 'MenuTitle');
        $fields->removeFieldFromTab('Root.Main', 'URLSegment');
        $fields->removeFieldFromTab('Root.Main', 'Title');
        $fields->removeFieldFromTab('Root.Main', 'Metadata');
        //$fields->addFieldToTab("Root.Main", new TextareaField("Dogodek", "Opis dogodka"));
		return $fields;    	
    }
}
class EventPage_Controller extends Page_Controller {
	
}
