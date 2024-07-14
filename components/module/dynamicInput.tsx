import { dynamicInputProps } from "@/constant/type"

import { Input } from "../ui/input"

const DynamicInput = ({name , onChange , label , value , placeholder} : dynamicInputProps) => {
  return (
    <div>
        <label>{label}</label>
        <Input onChange={onChange} value={value} name={name} placeholder={placeholder} className=" mt-2 w-[300px] border-gray-600 border focus-visible:ring-0" dir="ltr"/>
    </div>
  )
}

export default DynamicInput;