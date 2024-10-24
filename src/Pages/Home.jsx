import React,{ useEffect,useState }  from 'react'
import { TextField, Spinner } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

export const Home = () => {
    const [quote, setQuote] = useState([])
    const [image, setImage] = useState([])
    const [load,setLoad] = useState(false)


    useEffect(() => {
        const getQuote = async () => {
            setLoad(true)
            const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
                headers: {
                    'X-Api-Key' : import.meta.env.VITE_API_QUOTE_KEY
                }
            })

            const [data]  = await res.json()

            setQuote(data)
            setLoad(false)
        }
        getQuote()

        const getImage = async () => {
            setLoad(true)
            // const res = await fetch('https://api.api-ninjas.com/v1/randomimage?category=nature', {
            const res = await fetch('https://picsum.photos/200/300', {
                headers: {
                    // 'X-Api-Key' : import.meta.env.VITE_API_QUOTE_KEY,
                    // 'Accept' : 'image/jpg'
                }
            })

            const {data}  = await res
            // console.log(data)
            setImage(data)
            setLoad(false)
        }
        
        getImage()
    },[])
    // console.log(image.urls.raw)

    // const getSearch = (query) => {

    //     console.log(query)
    // }
    // const date = Date.now();
    // const

    const getClock = setInterval(() => {
        let now = new Date()
        let hours = now.getHours().toString().padStart(2,'0')
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
            
        let timeString = `${hours}:${minutes}:${seconds}`;
        // console.log(timeString)
        document.getElementById('clock').textContent = timeString
    }, 1000);

    // getClock()
    // window.load

    return (
        <>
        <div className='flex min-w-full flex-col min-h-screen  m-0 p-0 justify-center items-center'>
            <div className='flex flex-col justify-between min-w-full gap-5 '>

                <div className='flex flex-col gap-5'>
                    <h1 className='font-semibold text-3xl text-gray-400'>Hi there!</h1>
                    <p id='clock' className='font-bold text-7xl '></p>

                    <form className='mt-5' onSubmit={(e) => {
                        e.preventDefault()
                        const searchValue = e.target.elements.search.value
                        console.log(searchValue)
                        window.location.href = `https://www.google.com/search?q=${searchValue}`
                    }}>
                        <TextField.Root type="text"  name="search" placeholder="blablabla...">
                            <TextField.Slot >
                                <MagnifyingGlassIcon height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>
                    </form>
                </div>

            </div>

            <div className='mt-10'>
            {load ? (
                <Spinner />
            ) : (
                    <>
                        <p className='font-thin text-lg'>"{quote.quote}"</p>
                        <p className='font-thin text-sm text-gray-400'>- {quote.author}</p>
                    </>
                )}
            </div>

            
        </div>
        </>
    )
}
