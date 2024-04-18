import React from "react";
import "/src/style.css"; 

function AboutTheGroupMembersView(props) {
    function goesToEmailACB(email) {
        window.location.href = `mailto:${email}`;
    }

    return (
        <div className="about-group-members"> {}
            <div className="about_per1">
                <h4>Salahudin Salah</h4><br />
                <img src="/assets/SalahGrupp9.JPG" alt="Salahudin Salah" className="about_image" /><br />
                <p>Developer</p>
                <p>sasalah@kth.se</p><br />
                <p><button onClick={() => goesToEmailACB("sasalah@kth.se")}>Contact</button></p>
            </div>

            <div className="about_per2">
                <h4>Ali Kazimov</h4><br />
                <img src="/assets/ALIGRUPP9.png" alt="Ali Kazimov" className="about_image" /><br />
                <p>Developer</p>
                <p>kazimov@kth.se</p><br />
                <p><button onClick={() => goesToEmailACB("kazimov@kth.se")}>Contact</button></p>
            </div>

            <div className="about_per3">
                <h4>Ludwig Ask</h4><br />
                <img src="/assets/PeterGrupp9.jpg" alt="Ludwig Ask" className="about_image" /><br />
                <p>Group Leader & Developer</p>
                <p>ludwigas@kth.se</p><br />
                <p><button onClick={() => goesToEmailACB("kazimov@kth.se")}>Contact</button></p>
            </div>

            <div className="about_per4">
                <h4>Peter Li</h4><br />
                <img src="/assets/D.jpg" alt="Peter Li" className="about_image" /><br />
                <p>Group Leader & Developer</p>
                <p>97peter.l@gmail.com</p><br />
                <p><button onClick={() => goesToEmailACB("kazimov@kth.se")}>Contact</button></p>
            </div>

            <div className="about_per5">
                <h4>Daniel Lejonstad</h4><br />
                <img src="/assets/DanielGrupp9.jpg" alt="Daniel Lejonstad" className="about_image" /><br />
                <p>Co Leader & Developer</p>
                <p>daniel.lejonstad@hotmail.com</p><br />
                <p><button onClick={() => goesToEmailACB("kazimov@kth.se")}>Contact</button></p>
            </div>
        </div>
    );
}

export default AboutTheGroupMembersView;
