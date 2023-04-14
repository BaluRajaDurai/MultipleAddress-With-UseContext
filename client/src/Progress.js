import { useState} from "react";
import { Button, Progress } from 'semantic-ui-react'
import Bar from "./bar.js"


const ProgressBar = () => {

    
  return (
        <div>
              {/* <Progress percent={100} indicating <Bar total={200} current={100} />,/>
               
               */}
               <p>Pogress Bar</p>

<Bar total={200} current={100} />
        </div>
  );
};

export default ProgressBar;
