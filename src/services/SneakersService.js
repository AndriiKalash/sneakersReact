import axios from 'axios';


export  const fetchItems = async(url) => {
        try {
            const itemsResponse =  await axios.get(url);
            return itemsResponse.data;  
        } catch (error) {
                console.warn(error);
                alert('coud not fetch');
        }
} 
        
export const postOrderItems = async(obj) => {
        const itemsResponse = await axios.post('https://62837a1092a6a5e46224964a.mockapi.io/orders', obj);
        return itemsResponse.data;   
}    

export const postUser = async(obj) => {
        try {
             const itemsResponse = await axios.post('https://62837a1092a6a5e46224964a.mockapi.io/cart', obj);
             return itemsResponse.data;  
        } catch (error) {
                console.warn(error);
                alert('coud not fetch');
        }
          
}  
   




