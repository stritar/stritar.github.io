<?php


class MyObject extends DataObject {
  static $db = array(
    'Mesec' => "Enum('Januar,Februar,Marec, April, Maj, Junij, Julij, Avgust, September, Oktober, November, December','Januar')",
    'Leto' => "Enum('2014,2015,2016,2017,2018,2019,2020','2014')"
  );
}


class ArticlePage extends Page {
	private static $db = array(
		'Date' => 'Date',
		'ShortText' => 'HTMLText',
		'DisplayCalendar' => 'Boolean',
		'Mesec' => "Varchar(100)",
		'Leto' => "Varchar(100)",
	);

	private static $has_one = array(
		
	);

	public function getCMSFields() {
        $fields = parent::getCMSFields();
        $fields->addFieldToTab("Root.Main", new CheckboxField ("DisplayCalendar", 'Prikaži koledar dogodkov na tej novici!')); 


        $field = new DropdownField('Mesec', 'Izberite mesec (koledar dogodkov)', singleton('MyObject')->dbObject('Mesec')->enumValues());
        $field->setEmptyString('(Izberite)');
        $fields->addFieldToTab('Root.Main', $field, 'Content');

        $field2 = new DropdownField('Leto', 'Izberite leto (koledar dogodkov)', singleton('MyObject')->dbObject('Leto')->enumValues());
        $field2->setEmptyString('(Izberite)');
        $fields->addFieldToTab('Root.Main', $field2, 'Content');

        $dateField = new DateField('Date');
        $dateField->setConfig('showcalendar', true);
        $dateField->setConfig('dateformat', 'dd.MM.YYYY');
        $fields->addFieldToTab('Root.Main', $dateField, 'Content');
        $fields->addFieldToTab('Root.Main', new HtmlEditorField('ShortText', 'Kratki opis novice'),'Content');

		return $fields;    	
    }

}

class ArticlePage_Controller extends Page_Controller {
	private static $allowed_actions = array (

	);
	public function init() {
		parent::init();

		//Requirements::themedCSS('reset');
		//Requirements::themedCSS('layout'); 
		//Requirements::themedCSS('typography'); 
		//Requirements::themedCSS('form'); 
	}
	public function getCalendar($month,$year) {

		if ($month == "Januar") 		{ $m_month = "01"; } 
		if ($month == "Februar") 		{ $m_month = "02"; } 
		if ($month == "Marec") 			{ $m_month = "03"; } 
		if ($month == "April") 			{ $m_month = "04"; } 
		if ($month == "Maj") 			{ $m_month = "05"; } 
		if ($month == "Junij") 			{ $m_month = "06"; } 
		if ($month == "Julij") 			{ $m_month = "07"; } 
		if ($month == "Avgust") 		{ $m_month = "08"; } 
		if ($month == "September") 		{ $m_month = "09"; } 
		if ($month == "Oktober") 		{ $m_month = "10"; } 
		if ($month == "November") 		{ $m_month = "11"; } 
		if ($month == "December") 		{ $m_month = "12"; } 

		$daysArr = array('Mon','Tue','Wed','Thu','Fri','Sat','Sun');
		$m_monthtotdays= cal_days_in_month(CAL_GREGORIAN,$m_month,$year);
		$currdays=jddayofweek (cal_to_jd(CAL_GREGORIAN, $m_month,1, $year) , 2 );
		$currdaysval = 0;

        //$getCalendar = 'Mesec: '.$m_month.'<br> Leto: '.$year;


		$getCalendar = "<table border='0'>";
		$getCalendar .= "<thead><tr>";
		for($d=0;$d<=6;$d++){

		if ($daysArr[$d] == "Mon") { $dan = "p"; }
		if ($daysArr[$d] == "Tue") { $dan = "t"; }
		if ($daysArr[$d] == "Wed") { $dan = "s"; }
		if ($daysArr[$d] == "Thu") { $dan = "č"; }
		if ($daysArr[$d] == "Fri") { $dan = "p"; }
		if ($daysArr[$d] == "Sat") { $dan = "s"; }
		if ($daysArr[$d] == "Sun") { $dan = "n"; }

		$getCalendar .= "<td>". $dan."</td>";
		if($daysArr[$d]==$currdays)  $currdaysval = $d;
		}

		$getCalendar .= "</tr></thead>";
		$getCalendar .= "<tbody><tr>";
		if($currdaysval > 0 ){
		$getCalendar .= '<td colspan="'.$currdaysval.'">&nbsp;</td>';
		}
		for($i=1;$i<=$m_monthtotdays;$i++){



		$getCalendar .= "<td><a href='javascript:void(0);' class='opendatepopup' data-date='".sprintf("%02s",$i)."".$m_month."".$year."' data-day='".sprintf("%02s",$i)."' data-month='".$m_month."' data-year='".$year."' data-content=''>".$i."</a></td>";

		if(($i+$currdaysval )%7 <= 0 ){
			$getCalendar .= "</tr>";
		}

		}
		$getCalendar .= "</tbody></table>";




        return $getCalendar;
    }
    

}
