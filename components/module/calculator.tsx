 
'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import { useState } from "react"
import {e2p, p2e, sp} from '@/utils/changeFormat'

const Calculator = ({data} : {data : any}) => {

    const [first, setFirst] = useState({
        price : data[2].price,
        count : 1,
        name : data[2].name
    });
    const [second, setSecond] = useState({
        price : data[7].price,
        name : data[7].name
    });

  return (
    <div>
        <div className="bg-[#9d9d9d36] w-[360px] h-[330px] rounded text-black p-5">
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="relative top-[70px] right-44 w-12" >
                        <Select onValueChange={(data) => setFirst({...first , price : data})}>
                            <SelectTrigger className="w-[135px] border-none focus-visible:ring-0 h-7">
                            <SelectValue placeholder='Bitcoin'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup >
                                {
                                    data.map(({name , price} : {name : string , price : any}) => (
                                        <div onClick={() => setFirst({...first , name : name})}>
                                            <SelectItem value={price}>{name}</SelectItem>
                                        </div>
                                    ))
                                }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <label>پرداختی</label>
                    <Input value={+first.count} onChange={(e) => setFirst({...first , count : p2e(e.target.value)})} className="w-full my-3 bg-white text-black" placeholder="مبلغ مورد نظر را وارد کنید"/>
                </div>
                <div className="w-full">
                    <div className="relative top-[70px] right-44 w-12" >
                        <Select onValueChange={(data) => setSecond({...second , price : data})}>
                            <SelectTrigger className="w-[135px] border-none focus-visible:ring-0 h-7">
                            <SelectValue placeholder='Tether USDt'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup >
                                {
                                    data.map(({name , price} : {name : string , price : any}) => (
                                        <div onClick={() => setSecond({...second , name : name})}>
                                            <SelectItem value={price}>{name}</SelectItem>
                                        </div>
                                    ))
                                }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <label className="mb-2">دریافتی</label>
                    <Input value={`${parseFloat(((first.price / second.price) * +first.count).toFixed(2))} ${second.name == 'te' ? '$' : ''}`} className="w-full my-3 bg-white text-black"/>
                </div>
            </div>
            <div className="w-full text-center mt-5 text-blue-1">
                <span>Price in dollar</span> = <span>{(first.price).toFixed(2)}$ </span>
            </div>
        </div>
    </div>
  )
}

export default Calculator;