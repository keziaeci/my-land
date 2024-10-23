import React,{ useEffect,useState }  from 'react'

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

    return (
        <>
        <div className='flex bg-red-400 min-w-full min-h-screen m-0 p-0'>
            <div>
                <h1>Hi there!</h1>
                {load ? (
                    <p>loding</p>
                ) : (
                    // <div className='bg-[url("https://random-image-pepebigotes.vercel.app/api/random-image")]'>
                    <div>
                        {/* <img className='object-cover' src="https://random-image-pepebigotes.vercel.app/api/random-image" alt="" /> */}
                        {/* <img className='object-cover' src={image.url} alt="" /> */}
                        {/* <img className='object-cover' src={image.urls?.regular} alt="" /> */}
                        <p>"{quote.quote}"</p>
                        <p>- {quote.author}</p>
                    </div>
                )}
            </div>
            
        </div>
        </>
    )
}
