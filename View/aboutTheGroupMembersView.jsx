import React from "react";

export default
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
            <div className="about_per1_image"></div><br />
            {   }
            <p>Developer</p>
            <p>sasalah@kth.se</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
        </div>
       
        <div className=" about_per2">
            <h4>Ali Kazimov</h4><br />
            <div className="about_per2_image"></div><br />
            {   }
            <p>Developer</p>
            <p>kazimov@kth.se</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
        
        
        </div>
        
        <div className=" about_per3">
            
            <h4>Ludwig Ask</h4><br />
            <div className="about_per3_image"></div><br />
        
            {    }
            <p>Group Leader & Developer</p>
            <p>gay.ll</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
        
        </div>
        
        <div className=" about_per4">
            <h4>Peter Li</h4><br />
            <div className="about_per4_image"></div><br />
            {   }
            <p>Co Leader & Developer</p>
            <p>ernman@kth.se</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
            
        </div>
       
       
        <div className=" about_per5">
            <h4>Daniel Lejonstad</h4><br />
            <div className="about_per4_image"></div><br />
            {   }
            <p>Co Leader & Developer</p>
            <p>ernman@kth.se</p><br />
            <p><button onClick={() => goesToEmailACB("kazimov@kth.se")} >Contact</button></p>
            
        
        </div>
        </div>
        </div>
        
            );
}
