import { dynamicInputProps } from "@/constant/type"

import { Input } from "../ui/input"

const DynamicInput = ({name , onChange , label , value} : dynamicInputProps) => {
  return (
    <div>
        <label>{label}</label>
        <Input onChange={onChange} value={value} name={name} className="bg-gray-500 mt-2 w-[300px] text-white border-none focus-visible:ring-0" dir="ltr"/>
    </div>
  )
}

export default DynamicInput;