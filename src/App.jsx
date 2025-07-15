import { useState,useCallback,useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState(0)
  const passwordRef = useRef();
  
  const generatePassword = useCallback(() => {
    let pass="";
    let str ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numbers) str += "0123456789";
    if(char) str += "!@#$%^&*()_+[]{}|;:,.<>?";
    for(let i=0; i<length; i++){
      pass += str.charAt(Math.floor(Math.random() * str.length));
      setPassword(pass);
    }
  }, [length, numbers, char]);

  const copyToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  },[password])
    

  useEffect(() => {
    generatePassword();
  }, [length, numbers, char, generatePassword]);

  return (
    <>
      <div className='flex justify-center bg-[#B6E2D3] h-screen items-center'>
        <div className='bg-[#FBE5C8] p-10 rounded-lg shadow-lg'>
           
        <h1 class="flex justify-center pt-0" >Password Generator</h1>

          <div class="flex flex-row gap-1 mt-4 w-xl "> 
            <input 
            type="text"  placeholder='Password' value={password} readOnly ref={passwordRef}
            className='outline-none w-full px-1 py-3 bg-[#e9edc9]'></input>
            <button onClick={copyToClipboard} class="bg-[#8FDDE7] rounded-lg p-2 hover:border hover:border-black">Copy</button>
          </div>
          <div class="flex flex-row justify-between mt-4">
              <div className='flex flex-row gap-2'>
                <input type="range" id="length" min={6} max={40} value={length} onChange={(e)=>{setLength(e.target.value)}} className='p-1.5'></input>
                <label htmlFor='length' >Length: {length}</label>
              </div>

              <div className='flex flex-row gap-2'>
                <input type="Checkbox" id="numbers" defaultChecked={numbers} onChange={()=>{setNumbers((prev)=>!prev)}}/>
                <label htmlFor='numbers'>Numbers</label>
              </div>

              <div className='flex flex-row gap-2'>
                <input type="Checkbox" id="char" defaultChecked={char} onChange={()=>{setChar((prev)=>!prev)}}/>
                <label htmlFor='char'>Characters</label>
              </div>

          </div>
           
        </div>
      </div>
    </>
  )
}

export default App
