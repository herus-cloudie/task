import Image from "next/image";

const PriceList = async () => {
    const DataInJson = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH,BTC,BNB,SOL,TON,DOT,AVAX&convert=USD', {
    headers: {
        'X-CMC_PRO_API_KEY': (process.env.API_KEY as string)
    },
    cache: 'no-store'
    });
    const {data} = await DataInJson.json();

    const cryptoDetails = Object.keys(data).map(key => {
        const crypto = data[key];
        return {
            name: crypto.name,
            symbol: crypto.symbol,
            price: crypto.quote.USD.price,
            change: crypto.quote.USD.percent_change_24h
        };
    });
  return (
    <div className="bg-BTC relative" id="USDT">
        <Image src={'/img/BTC.png'} width={2000} height={2000} className="w-full h-[800px] opacity-20 z-10 object-cover" alt="btc picture"/>
        <div className="z-20 absolute top-5 flex justify-center items-center flex-col w-full">
            <Image src={'/img/frame.svg'} width={800} height={800} className="w-[380px] sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1220px] my-auto" alt="frame"/>
            <div className="w-[360px] sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1220px] bg-white p-5 rounded shadow-lg shadow-blue-300">
                <div className="flex justify-between items-center mb-5 font-bold text-xl xl:text-2xl">
                    <span className="text-[#4C5254]">نام</span>
                    <span className="text-[#4C5254] -ml-12 sm:-ml-16">قیمت</span>
                    <span className="text-[#4C5254]">تغییرات 24</span>
                </div>
                {
                    cryptoDetails.map(({ price , change , symbol}) =>{
                        let roundedPrice = parseFloat(price.toFixed(2));
                        let roundedChange = parseFloat(change.toFixed(2));
                    
                        return(
                            <div className="flex justify-between items-start py-4 border-t sm:text-xl">
                                <span className="">{symbol}</span>
                                <span className=" text-blue-1">{roundedPrice} $</span>
                                <span className={`${change > 0 ? 'text-green-500' : 'text-red-500'} `}>{roundedChange} %</span>
                            </div>
                        )
                    }     
                )
                }
            </div>
        </div>
    </div>
  )
}

export default PriceList;

