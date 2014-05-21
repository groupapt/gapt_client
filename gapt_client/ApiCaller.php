<?php
class ApiCaller
{
    
    private $_api_url;
    
    public function __construct($api_url)
    {
        $this->_api_url = $api_url;
    }
     
    //send the request to the API server
    //also encrypts the request, then checks
    //if the results are valid
    public function sendRequest()
    {

        //initialize and setup the curl handler
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->_api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 
        //execute the request
        $result = curl_exec($ch);
        
        //json_decode the result
        $result = @json_decode($result, true);
         
        //if everything went great, return the data
        return $result;

    }


}