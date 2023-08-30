<?php

namespace App\Traits;
use App\Models\Perangkat;

use GuzzleHttp\Client;

trait FireNotif
{
    function actionFire()  {
        
        $client = new Client();
        $requestUrl = 'https://fcm.googleapis.com/fcm/send';
        $requestHeaders = [
            'Authorization' => 'key=AAAAr7YVf38:APA91bHagnM2wvo3VLvp7AzG4-POF9Sdg9zSU9Xj8DoY562ZyUOli-aL4NQeE_5GX7uOBooQho_iY7lQ1OOmF2ZyUSraPORnpw1NldBQOaipBec_WVXN4PcTi9gklGrjnINVI4dPDuvo',
        ];
        
        $json_req = '{
            "to": "fOjcLHMxRGSKkTLvaWrWeU:APA91bGh6FRr1TiB0nwkPoQTalWQxewIG9g-8m2yvqG23Rs4f0cOTT-9tKN0_Od4I7CzEbXDjHQvvbVtNTX0fOeqgQ0SzQP4WMCc8KWt1LCWidhspPctQOqMAf61LSTjS8BQKv7n6aIS",
            "priority":"high",
            "soundName":"default",
            "notification":{
                "title":"Halo Ondri",
                "body":"ini dari Firenotif ondri"
            }
        }';

        $requestBody = json_decode($json_req);

        $response = $client->request('POST', $requestUrl, [
            'headers' => $requestHeaders,
            'json' => $requestBody,
        ]);
        
        if ($response->getStatusCode() == 200) {
            echo 'Notification sent successfully!';
        } else {
            echo 'Something went wrong.';
        }        
        

    }
    function toKasum($params) {
        


    }

    function toUser(){
        
    }

    function getPerangkat($id_user){

        $perangkat = Perangkat::join('users','users.id', 'perangkat.id_user')
                                ->where('perangkat.id_user', $id_user )
                                ->get();

        return $perangkat;
                                
    }
}
