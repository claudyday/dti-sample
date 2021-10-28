<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>DTI Sample Web Page</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="assets/img/favicon.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="assets/vendor/animate.css/animate.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="assets/css/style.css" rel="stylesheet">
</head>

<body>
    <div class="container">
        <div class="row">
            <p></p><p></p><p></p>
            <h1>Feedback Form Report</h1>
            <p></p>
            <table>
                <tr>
                    <td>ID</td>
                    <td>Ratings</td>
                    <td>Comments</td>
                </tr>

                <?php
                    //Database Connection
                    $conn = new mysqli('localhost','root','','dti-sample');
                    $query = mysqli_query($conn,"SELECT * FROM feedback");
                    while($data = mysqli_fetch_array($query))
                    {
                ?>
                    <tr>
                    <td><?php echo $data['id']; ?></td>
                    <td><?php echo $data['ratings']; ?></td>
                    <td><?php echo $data['comments']; ?></td>
                    </tr>	

                <?php
                }
                ?>
                <?php mysqli_close($conn); // Close connection ?>

            </table>
        </div>
    </div>
</body>

</html>
        