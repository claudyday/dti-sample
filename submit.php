<?php
        //initialization
        $ratings = $_POST['ratings'];
        $comments = $_POST['comments'];

        //Database Connection
        $conn = new mysqli('localhost','root','','dti-sample');
        if($conn->connect_error){
            die('Connection Failed : '.$conn->connect_error);
        } else {
            $stmt = $conn->prepare("INSERT INTO feedback(ratings, comments) VALUES(?,?)");
            $stmt->bind_param("ss",$ratings,$comments);
            $stmt->execute();
            echo "Success";
            $stmt->close();
            $conn->close();
        }
?>