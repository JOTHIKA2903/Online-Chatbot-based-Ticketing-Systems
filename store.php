<?php
// Database connection
$host = "localhost";
$user = "root";
$password = ""; // your DB password
$database = "ticket"; // change this to your DB name

$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$amount = $_POST['amount'];
$time = date("Y-m-d H:i:s");

// Generate random ticket number
$ticket_number = "TICKET" . rand(1000, 9999);

// Insert into database
$sql = "INSERT INTO ticket_payments (name, amount, payment_time, ticket_number)
        VALUES ('$name', '$amount', '$time', '$ticket_number')";

if ($conn->query($sql) === TRUE) {
?>
<!DOCTYPE html>
<html>
<head>
    <title>Your Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .ticket-box {
            border: 2px dashed #333;
            padding: 20px;
            width: 300px;
            margin: auto;
            text-align: center;
        }
        .ticket-box h2 {
            margin-top: 0;
        }
        .btn-print {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
        }
    </style>
</head>
<body>

<div class="ticket-box" id="ticketBox">
    <h2>Museum Ticket</h2>
    <p><strong>Ticket ID:</strong> <?php echo $ticket_number; ?></p>
    <p><strong>Name:</strong> <?php echo $name; ?></p>
    <p><strong>Amount Paid:</strong> ₹<?php echo $amount; ?></p>
    <p><strong>Date & Time:</strong> <?php echo $time; ?></p>
</div>

<div style="text-align:center;">
    <button class="btn-print" onclick="printTicket()">Print / Download Ticket</button>
</div>

<script>
function printTicket() {
  const ticket = document.getElementById("ticketBox").innerHTML;
  const newWin = window.open('', '', 'width=400,height=600');
  newWin.document.write('<html><head><title>Print Ticket</title></head><body>');
  newWin.document.write(ticket);
  newWin.document.write('</body></html>');
  newWin.document.close();
  newWin.focus();
  newWin.print();
  newWin.close();
}
</script>

</body>
</html>
<?php
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
