<?php

namespace App\Traits;
use App\Models\Perangkat;

use GuzzleHttp\Client;

trait FireNotif
{
    public function tesNotif()  {


        $client = new Client();
        $requestUrl = 'https://fcm.googleapis.com/fcm/send';
        $requestHeaders = [
            'Authorization' => 'key=AAAAr7YVf38:APA91bHagnM2wvo3VLvp7AzG4-POF9Sdg9zSU9Xj8DoY562ZyUOli-aL4NQeE_5GX7uOBooQho_iY7lQ1OOmF2ZyUSraPORnpw1NldBQOaipBec_WVXN4PcTi9gklGrjnINVI4dPDuvo',
        ];
        
        $json_req = '{
            "to": "cZ_9MygDQgW_g-sXhA-D7g:APA91bGmB2Z7bEHAb2POIvxBkxrvrFM-Lq16TWFzeQXluDi6hDZvk97RMCX1ELGz_qbXrAQ0Y1jJNZed7s0aHEBDrKIRQAhFMuPSayWVOtufJ2V_oRxymbwQAlbSGnQEa8U-Di5cypw1",
            "priority":"high",
            "soundName":"default",
            "notification":{
                "title":"Judul Notif",
                "body":"isi notif"
            }
        }';

        $requestBody = json_decode($json_req);

        $response = $client->request('POST', $requestUrl, [
            'headers' => $requestHeaders,
            'json' => $requestBody,
        ]);
        
        return $response->getStatusCode();
        

    }    
    public function actionFire($params=[])  {


        $client = new Client();
        $requestUrl = 'https://fcm.googleapis.com/fcm/send';
        $requestHeaders = [
            'Authorization' => 'key=AAAAr7YVf38:APA91bHagnM2wvo3VLvp7AzG4-POF9Sdg9zSU9Xj8DoY562ZyUOli-aL4NQeE_5GX7uOBooQho_iY7lQ1OOmF2ZyUSraPORnpw1NldBQOaipBec_WVXN4PcTi9gklGrjnINVI4dPDuvo',
        ];
        
        $json_req = '{
            "to": "'.$params['token_fb'].'",
            "priority":"high",
            "soundName":"default",
            "notification":{
                "title":"'.$params['title'].'",
                "body":"'.$params['message'].'"
            }
        }';

        $requestBody = json_decode($json_req);

        $response = $client->request('POST', $requestUrl, [
            'headers' => $requestHeaders,
            'json' => $requestBody,
        ]);
        
        return $response->getStatusCode();
        

    }
    public function notifKasum($title ='', $message='') {
        
        $params = array();

        $params['title'] = $title;
        $params['message']= $message;


        $arrUser = $this->getPerangkat('kasum');

        foreach ($arrUser as $us) {
            $params['token_fb']=  $us->token_perangkat;
            $this->actionFire($params);
        }
    }

    public function notifUser($id_user=0, $title ='', $message=''){

        $params = array();

        $params['title'] = $title;
        $params['message']= $message;


        $arrUser = $this->getPerangkat('user', $id_user);

        foreach ($arrUser as $us) {
            $params['token_fb']=  $us->token_perangkat;
            $this->actionFire($params);
        }        
    
    }

    public function getPerangkat($role , $id_user=0){

        $perangkat = Perangkat::select('perangkat_aktif.*','perangkat_aktif.id AS id_perangkat_aktif','users.id', 'users.name')
                            ->where(function($q) use( $role, $id_user){

                                if ($role == 'kasum') {

                                    $q->where('role', 'kasum');
                                 
                                    }elseif ($role =='admin') {
                                     $q->where('role', 'admin');
                         
                                 }else {
                                     $q->where('role', $id_user);
                                 }                                      
                            })
                            ->join('users','users.id', 'perangkat_aktif.id_user')
                            ->get();

        return $perangkat;
                                
    }
}
