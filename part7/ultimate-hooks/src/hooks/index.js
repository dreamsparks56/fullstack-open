import axios from "axios"
import { useState, useEffect } from "react"

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    useEffect(() => {
        axios.get(baseUrl)
        .then(response => {
                setResources(response.data)
            }
        )        
    }, [])
  
    const create = async (resource) => {        
          const response = await axios.post(baseUrl, resource)
          setResources([...resources, response.data])
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }