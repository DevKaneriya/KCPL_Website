<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . "/vendor/autoload.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

// Receive FormData
$first_name = $_POST['first_name'] ?? '';
$last_name  = $_POST['last_name'] ?? '';
$email      = $_POST['email'] ?? '';
$phone      = $_POST['phone'] ?? '';
$jobTitle   = $_POST['jobTitle'] ?? '';
$jobId      = $_POST['jobId'] ?? '';
$resume     = $_FILES['resume'] ?? null;

if(!$first_name || !$email || !$phone){
    echo json_encode(["status"=>"error","message"=>"Required fields missing"]);
    exit;
}

$mail = new PHPMailer(true);

try {
    // SMTP SETTINGS
    $mail->isSMTP();
    $mail->Host       = "smtp.gmail.com";
    $mail->SMTPAuth   = true;

    $mail->Username   = "dxtouza1617@gmail.com";       // REQUIRED
    $mail->Password   = "tpld ujjj nmzc yxzp";          // REQUIRED (16 char)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Mail info
    $mail->setFrom("dxtouza1617@gmail.com", "Career Form");
    $mail->addAddress("dxtouza1617@gmail.com");
    $mail->addReplyTo($email, $first_name);

    // Attach resume if uploaded
    if($resume && $resume['tmp_name']){
        $mail->addAttachment($resume['tmp_name'], $resume['name']);
    }

    $mail->isHTML(true);
    $mail->Subject = "New Job Application - $jobTitle";

    $mail->Body = "
    <h2>Job Application Received</h2>
    <b>Job ID:</b> $jobId <br>
    <b>Job Title:</b> $jobTitle <br>
    <b>Name:</b> $first_name $last_name <br>
    <b>Email:</b> $email <br>
    <b>Phone:</b> $phone <br>
    <p>Resume attached below (if uploaded)</p>
    ";

    $mail->send();
    echo json_encode(["status"=>"success"]);

} catch (Exception $e) {
    echo json_encode(["status"=>"error","message"=>$mail->ErrorInfo]);
}
