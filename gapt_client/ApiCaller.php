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
    public function sendRequest($search_text, $type)
    {
	
        //create the params array, which will
        //be the POST parameters
        $params = explode(' ',$search_text);
		if($type == 'date')
		{
			$query_string = '?date='.$params[0];
		}
		else if($type == 'judge')
		{
			$query_string = '?date='.$params[0];
		}

        //initialize and setup the curl handler
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->_api_url. $query_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 
        //execute the request
        $result = curl_exec($ch);
        
        //json_decode the result
        $result = @json_decode($result,true);
         
        //if everything went great, return the data
        return $result;

    }


}