<?php
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    define('MODX_API_MODE', true);
    include_once(dirname(__FILE__) . "../../../../index.php");
    $modx->db->connect();
    if (empty($modx->config)) {
        $modx->getSettings();
    }
    $output = '';

    if (isset($_REQUEST['action'])) {
        $action = $modx->db->escape($_REQUEST['action']);
        switch ($action) {
            case 'ShkChangeCount':
                if (isset($_SESSION['purchases'])) {
                    $index = (int)$_POST['index'];
                    $count = (int)$_POST['count'];
                    $curSavedP = unserialize($_SESSION['purchases']);
                    $outputArray = array();
                    for ($i = 0; $i < count($curSavedP); $i ++) {
                        $outputArray[$i] = $curSavedP[$i];
                        if($i == $index){
                            $outputArray[$i][1] = $count;
                        }
                    }
                    $_SESSION['purchases'] = serialize($outputArray);
                    $output = 'ok';
                } else {
                    $output = 'empty';
                }
                break;   
            default:
                break;
        }
        echo $output;
    }
    exit;
}
exit;
