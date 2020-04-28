<?php   
header('Content-Type: application/json; charset= utf-8');
$response = array();
$response['status'] = 'ok';

if(!empty($_FILES['file']['tmp_name'])){
     
    for($key = 0; $key < count($_FILES['file']['tmp_name']); $key++){
        $upload_patch = __DIR__."/upload/";
        $user_file_name = $_FILES['file']['name'][$key];
        $basename = pathinfo($user_file_name, PATHINFO_FILENAME);
        $extension = pathinfo($user_file_name, PATHINFO_EXTENSION);


        $server_filename = $basename .".". $extension;
        $server_filepath = $upload_patch . $server_filename;
        $i=0;
        while(file_exists($server_filepath)){
            $i++;
            $server_filepath = $upload_patch . $basename . "($i)." . $extension;

        }
        if(copy($_FILES['file']['tmp_name'][$key], $server_filepath)){
            $response['status'] = 'ok';
        }
    }
}





echo json_encode($response);


?>