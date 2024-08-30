import axios from 'axios'
import {z} from 'zod'
import { SearchType} from '../components/Form/types'
import { useMemo, useState } from 'react'


// TYPE GUARD O ASSERTION SOLO SIRVE PARA UN ENDPOINT DE API
// function isWeatherResponse(weather : unknown) : weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number' 
//     )
// }
// ZOD 
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

export type Weather = z.infer<typeof Weather>

// VALIBOT

// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// })

// type Weather = InferOutput<typeof WeatherSchema>


export default function useWheater() {

    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })
    const [notFound, setNotFound] = useState(false)

    const fetchWheater = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY 
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const {data} = await axios(geoUrl)
             
            if(!data[0]) {
                console.log('Clima no encontrador')
                setNotFound(true)
                return
            }
        
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`



            // ZOD

            const {data: weatherResults} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResults)
            if(result.success) {
                setWeather(result.data)
            }

         


        } catch (error) {
            console.log(error)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    

    return {
        weather,
        fetchWheater,
        hasWeatherData,
        notFound
    }
}