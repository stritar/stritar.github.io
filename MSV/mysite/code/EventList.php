<?php
class EventList extends Page {

    private static $db = array(
    );

    private static $has_one = array(
    );

    public function getCMSFields() {
        $fields = parent::getCMSFields();
        $fields->removeFieldFromTab('Root', 'Main');


		return $fields;    	
    }

}
class EventList_Controller extends Page_Controller {

   
    private static $allowed_actions = array (
    );

    public function init() {
        parent::init();
    }
   
}
