import { createHashRouter, RouterProvider } from "react-router-dom";
import {observer} from 'mobx-react-lite'
import About from "./aboutPresenter";


export default observer(
    function ReactRoot(props){

        function makeRouter(){
            return createHashRouter([
                
                {
                    path: "/about",
                    element: <About props = {props.model}/>
                },
                
            ])
        }
            

            return((
            <div className="root" >
               <RouterProvider router={makeRouter(props)} />
            </div>
           )
            ) 
        }
 )