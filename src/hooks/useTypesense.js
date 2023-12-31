import { useState, useEffect } from "react";

import Typesense from 'typesense'

const useTypesense = () => {
  const [client, setClient] = useState(null)

  useEffect(() => {
    if(client) return;
    let TypesenseClient = new Typesense.Client({
      'nodes': [{
        'host': process.env.REACT_APP_TYPESENSE_HOST, 
        'port': '443',      
        'protocol': 'https' 
      }],
      'apiKey': process.env.REACT_APP_TYPESENSE_API_KEY
    })
    setClient(TypesenseClient)
  }, [client]);

  return {
    client
  }

}

export default useTypesense