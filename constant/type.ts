interface signUpType{
  name : string,
  email : string,
  password : string,
  secondPassword : string,
}
  
interface signInType{
  email : string,
  password : string,
}

interface dynamicInputProps{
  name : string ,
  onChange : (e : any) => void ,
  label : string,
  value : any,
  placeholder ?: string
}

export type {signInType , signUpType , dynamicInputProps}