import React, { useState } from 'react'
import {IHelloWorldProps} from './IHelloWorldProps'

import {Employee} from './AddEmployee'
import { GetEmployee } from './GetEmployee'

const HelloWorld:React.FC<IHelloWorldProps> = (props):JSX.Element => {

  const [refresh,setRefresh] = useState<boolean>(false);

  const togglerefresh = ():void =>{
    setRefresh(!refresh);
  }

  return (
    <div>  
      <h2>
          This is Site for Task1
      </h2>

      <Employee weburl={props.webURL}  changeState={togglerefresh}/>

      <GetEmployee weburl={props.webURL} refreshlist={refresh}/>

    </div>
  )
}

export default HelloWorld