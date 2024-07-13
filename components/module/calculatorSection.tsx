

import Image from "next/image";
import Calculator from "./calculator";

const CalculatorSection = async () => {
    const DataInJson = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH,BTC,BNB,SOL,TON,DOT,AVAX,USDT&convert=USD', {
        headers: {
            'X-CMC_PRO_API_KEY': (process.env.API_KEY as string)
        }
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
    <section className="flex flex-col w-full p-10 md:p-20">
        <div className="text-[#2E3133] text-3xl font-bold mb-10">ماشین حساب آنلاین</div>
        <div className="w-full flex justify-center items-center">
          <div className="flex justify-center lg:justify-between w-[1220px] items-center">
              <div className="sm:block hidden">
                <Image className="hidden lg:block w-[360px] h-[360px] " alt="Calculator" src={'/img/Rectangle.svg'} width={550} height={550}/>
              </div>
              <div>
                <Image className="w-[350px] h-[350px] " alt="Calculator" src={'/img/Illustration.svg'} width={550} height={550}/>
                <div className="relative -top-64">
                  <Calculator data={cryptoDetails}/>
                </div>
              </div>
          </div>
        </div>
    </section>
  )
}


export default CalculatorSection;