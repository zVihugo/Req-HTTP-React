import {useState, useEffect} from 'react'

//Fazendo um custom hook

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    //Refatorando o POST

    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    //Basicamento quando adicionarmos um dado no sistema, essa variavel vai ser reenderizada
    const [callFetch, setCallFetch] = useState(false);

    //Estado de loading
    const [loading, setLoading] = useState(false);

    //Tratando erros
    const [error, setError] = useState(null);

    //Setando os métodos e configuração

    const httpConfig = (data, method) => {
        if(method === 'POST'){ 
            setConfig({
                method,
                headers: {
                  'Content-type': "application/json"
                },
                body: JSON.stringify(data)
            })
        }else if(method === 'DELETE'){
            setConfig({
                method,
                headers: {
                  'Content-type': "application/json"
                },
                body: JSON.stringify(data)
            })
        }
        setMethod(method);
    }

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            try{
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            }catch(error){
                setError("Aconteceu um erro ao carregar dados");
            }
            setLoading(false);
        };
        fetchData();
    }, [url, callFetch]);

    //Refatorando post

    useEffect(() => {
        const httpRequest = async () => {
            if(method === 'POST'){
                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                const json = await res.json();
    
                setCallFetch(json);
            }
        } 

        httpRequest();
    }, [config, method, url])

   

    return { data, httpConfig, loading , error};
}