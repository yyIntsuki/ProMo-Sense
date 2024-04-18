import "/src/style.css";
import React from "react";


function AboutTheGroupMembersView(props){
   
    function goesToEmailACB(email){
        window.location.href = `mailto:${email}`;
    }

    return(
        <div className="About">
           
        <br />
        <h2> Group 9 </h2>
        <br />
        <div className="about_row">
        
        <div className=" about_per1">
            <h4>Salahudin Salah</h4><br />
            <div className=""></div><br />
            <div></div>
    <img src="src/assets/SalahGrupp9.JPG" alt="salah" className="about_image"/>
            <p>Developer</p>
            <p>sasalah@kth.se</p><br />
            <p><button onClick={() => goesToEmailACB("sasalah@kth.se")} >Contact</button></p>
        </div>
       
        <div className=" about_per2">
            <h4>Ali Kazimov</h4><br />
            <div className=""></div><br />
            <div></div>
    <img src="src/assets/ALIGRUPP9.png" alt="salah" className="about_image"/>
            <p>Developer</p>
            <p>kazimov@kth.se</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
        
        
        </div>
        
        <div className=" about_per3">
            
            <h4>Ludwig Ask</h4><br />
            <div className=""></div><br />
        
            <img src="src/assets/PeterGrupp9" alt="salah" className="about_image"/>
            <p>Group Leader & Developer</p>
            <p>ludwigas@kth.se</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
        
        </div>


         
        <div className=" about_per4">
            
            <h4>pPeter Li</h4><br />
            <div className=""></div><br />
        
            <img src="src/assets/D.jpg" alt="salah" className="about_image"/>
            <p>Group Leader & Developer</p>
            <p>ludwigas@kth.se</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
        
        </div>
        
        
        <div className=" about_per4">
            <h4>Peter Li</h4><br />
            <div className = ""></div><br />
            <img src = "src/assets/peterGrupp9.jpg"></img>
            {   }
            <p>Co Leader & Developer</p>
            <p>97peter.l@gmail.com</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
            
        </div>
       
       
        <div className=" about_per5">
            <h4>Daniel Lejonstad</h4><br />
            <div className="about_per4_image"></div><br />
            <img src = "src/assets/DanielGrupp9.jpg"></img>
            {   }
            <p>Scrum Master & Developer</p>
            <p>daniel.lejonstad@hotmail.com</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
            
        
        </div>
        </div>
        </div>
        
            );
}

export default AboutTheGroupMembersView;