<?php

class ContactPage extends Page {
}
class ContactPage_Controller extends Page_Controller {
    private static $allowed_actions = array('Form');
    public function Form() {
        $fields = new FieldList(
            new TextField('Name','Ime'),
            new EmailField('Email','E-naslov'),
            new TextareaField('Message','Sporočilo')
        );
        $actions = new FieldList(
            new FormAction('submit', 'Pošlji')
        );
        $validator = new RequiredFields('Name', 'Message', 'Email');
        return new Form($this, 'Form', $fields, $actions, $validator); 

    }
    public function submit($data, $form) {

        require_once '../swiftmailer/lib/swift_required.php';
        $transport = Swift_SmtpTransport::newInstance('mail.msvic.si', 25)->setUsername('noreply@msvic.si')->setPassword('VMgrK0sm');
        /*
        You could alternatively use a different transport such as Sendmail or Mail:

        // Sendmail
        $transport = Swift_SendmailTransport::newInstance('/usr/sbin/sendmail -bs');

        // Mail
        $transport = Swift_MailTransport::newInstance();
        */

        // Create the Mailer using your created Transport
        $mailer = Swift_Mailer::newInstance($transport);

        // Create a message
        $message = Swift_Message::newInstance('msvic.si: novo sporočilo preko kontaktnega obrazca')
          ->setFrom(array($data['Email'] => $data["Name"]))
          ->setTo(array('info@msvic.si' => 'info@msvic.si'))
          ->setContentType('text/html')
          ->setBody("
            <p>Pozdravljeni,
            <br><br>
            prejeli ste novo sporočilo preko kontaktnega obrazca na spletni strani <a href='http://msvic.si'>msvic.si</a>!</p>
            <p><b>Vsebina sporočila:</b></p>
            <p><strong>Ime:</strong> {$data['Name']}</p>
            <p><strong>Email:</strong> {$data['Email']}</p>
            <p><strong>Sporočilo:</strong> {$data['Message']}</p>
            ")
          ;

        // Send the message
        $result = $mailer->send($message);


  /*      $e = new Email();
  
        $e->setTo = "darix88@gmail.com";
        $e->setFrom = $data['Email'];
        $e->setSubject = "Contact Message from {$data["Name"]}";
        $e->setBody  =  "
            <p><strong>Ime:</strong> {$data['Name']}</p>
            <p><strong>Sporočilo:</strong> {$data['Message']}</p>
        ";
        $e->send();*/




        return array(
            'Content' => '<p><b>Vaše sporočilo je bilo uspešno poslano!</b></p><p>Odgovorili vam bomo v najkrajšem možnem času.</p><style type="text/css">#kontaktform { display:none;}</style>',
            'Form' => ''
        );
    }
}