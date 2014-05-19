<?php
class ApiCaller
{
    //some variables for the object
    //private $search_text;
    //private $type;//date/reference/name/judge
    private $_api_url;
     
    //construct an ApiCaller object, taking an
    //APP ID, APP KEY and API URL parameter
    public function __construct($api_url)
    {
        //$this->_search_text = $app_id;
        //$this->_type = $app_key;
        $this->_api_url = $api_url;
    }
     
    //send the request to the API server
    //also encrypts the request, then checks
    //if the results are valid
    public function sendRequest($search_text, $type)
    {
			
        try
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
        //curl_setopt($ch, CURLOPT_POST, count($params));
        //curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
 
        //execute the request
        $result = curl_exec($ch);
        
        //json_decode the result
        $result = @json_decode($result,true);
        //var_dump($result);
        
        //check if we're able to json_decode the result correctly
       /* if( $result == false || isset($result['success']) == false ) {
            throw new Exception('Request was not correct');
        }
         
        //if there was an error in the request, throw an exception
        if( $result['success'] == false ) {
            throw new Exception($result['errormsg']);
        }*/
        //$weather_arr = sendWeather($result['due_date']);
         
        //if everything went great, return the data
        return $result;
    }catch(Exception $e){ return "There is error";}

}


}