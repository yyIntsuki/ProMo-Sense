export default function Team() {
    function handleClickToEmail(email) { window.location.href = `mailto:${email}`; }

    return (
        <div className="about_wrapper">
            <div className="about_group_members">
                <div className="about_per1">
                    <h4>Salahudin Salah</h4><br />
                    <img src="https://i.ibb.co/ScX1q0M/Salah-Grupp9.jpg" alt="Salahudin Salah" className="about_image" />

                    <p>Product Owner & Developer</p>
                    <p>sasalah@kth.se</p><br />
                    <p><button onClick={() => handleClickToEmail("sasalah@kth.se")}>Contact</button></p>
                </div>

                <div className="about_per2">
                    <h4>Ali Kazimov</h4><br />
                    <img src="https://i.ibb.co/VwSjYgg/ALIGRUPP9.jpg" alt="Ali Kazimov" className="about_image" /><br />
                    <p>Developer</p>
                    <p>kazimov@kth.se</p><br />
                    <p><button onClick={() => handleClickToEmail("kazimov@kth.se")}>Contact</button></p>
                </div>

                <div className="about_per3">
                    <h4>Ludwig Ask</h4><br />
                    <img src="https://i.ibb.co/fxXDSFT/DIFSUGER.jpg" alt="Ludwig Ask" className="about_image" /><br />
                    <p>Developer</p>
                    <p>ludwigas@kth.se</p><br />
                    <p><button onClick={() => handleClickToEmail("ludwigas@kth.se")}>Contact</button></p>
                </div>

                <div className="about_per4">
                    <h4>Peter Li</h4><br />
                    <img src="https://i.ibb.co/P5JCfSM/peter-Grupp9.jpg" alt="Peter Li" className="about_image" /><br />
                    <p>Developer</p>
                    <p>pli2@kth.se</p><br />
                    <p><button onClick={() => handleClickToEmail("pli2@kth.se")}>Contact</button></p>
                </div>

                <div className="about_per5">
                    <h4>Daniel Lejonstad</h4><br />
                    <img src="https://i.ibb.co/QQB53nd/Daniel-Grupp9.jpg" alt="Daniel Lejonstad" className="about_image" /><br />
                    <p>Scrum Master & Developer</p>
                    <p>daniel.lejonstad@hotmail.com</p><br />
                    <p><button onClick={() => handleClickToEmail("daniel.lejonstad@hotmail.com")}>Contact</button></p>
                </div>
            </div>
        </div>
    );
}
