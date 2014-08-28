<!DOCTYPE html>
<html lang="sl">
<head>
	<meta charset="utf-8">
	<title>datumi</title>
</head>
<body>
	<?php
	$m_month = 7;
	$year = 2014;
$daysArr = array('Mon','Tue','Wed','Thu','Fri','Sat','Sun');
$m_monthtotdays= cal_days_in_month(CAL_GREGORIAN,$m_month,$year);
$currdays=jddayofweek (cal_to_jd(CAL_GREGORIAN, $m_month,1, $year) , 2 );
$currdaysval = 0;
echo "<table border='0' cellspacing='2' cellpadding='2'>";
echo "<tr>";
for($d=0;$d<=6;$d++){

if ($daysArr[$d] == "Mon") { $dan = "p"; }
if ($daysArr[$d] == "Tue") { $dan = "t"; }
if ($daysArr[$d] == "Wed") { $dan = "s"; }
if ($daysArr[$d] == "Thu") { $dan = "č"; }
if ($daysArr[$d] == "Fri") { $dan = "p"; }
if ($daysArr[$d] == "Sat") { $dan = "s"; }
if ($daysArr[$d] == "Sun") { $dan = "n"; }

echo "<td><b>". $dan."</b></td>";
if($daysArr[$d]==$currdays)  $currdaysval = $d;
}

echo "</tr>";
echo "<tr>";
if($currdaysval > 0 ){
echo '<td colspan="'.$currdaysval.'">&nbsp;</td>';
}
for($i=1;$i<=$m_monthtotdays;$i++){



echo "<td class='y_".$year."-m_".$m_month."-d_".$i."'>".$i."</td>";

if(($i+$currdaysval )%7 <= 0 ){
	echo "</tr><tr>";
}

}
echo "</tr></table>"
?>
</body>
</html>