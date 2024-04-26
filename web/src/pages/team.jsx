export default function Team() {
    function handleClickToEmail(email) { window.location.href = `mailto:${email}`; }

    return (
        <div className="about_wrapper">
            <h1>About the team</h1>
            <div className="about_group_members">
                <div className="about_person">
                    <h4>Salahudin Salah</h4>
                    <img src="https://i.ibb.co/ScX1q0M/Salah-Grupp9.jpg" alt="Salahudin Salah" className="about_image" />
                    <p>Product Owner & Developer</p>
                    <p>sasalah@kth.se</p>
                    <h5 onClick={() => handleClickToEmail("sasalah@kth.se")}>Contact</h5>
                </div>

                <div className="about_person">
                    <h4>Ali Kazimov</h4>
                    <img src="https://i.ibb.co/VwSjYgg/ALIGRUPP9.jpg" alt="Ali Kazimov" className="about_image" />
                    <p>Developer</p>
                    <p>kazimov@kth.se</p>
                    <h5 onClick={() => handleClickToEmail("kazimov@kth.se")}>Contact</h5>
                </div>

                <div className="about_person">
                    <h4>Ludwig Ask</h4>
                    <img src="https://i.ibb.co/fxXDSFT/DIFSUGER.jpg" alt="Ludwig Ask" className="about_image" />
                    <p>Developer</p>
                    <p>ludwigas@kth.se</p>
                    <h5 onClick={() => handleClickToEmail("ludwigas@kth.se")}>Contact</h5>
                </div>

                <div className="about_person">
                    <h4>Peter Li</h4>
                    <img src="https://i.ibb.co/P5JCfSM/peter-Grupp9.jpg" alt="Peter Li" className="about_image" />
                    <p>Developer</p>
                    <p>pli2@kth.se</p>
                    <h5 onClick={() => handleClickToEmail("pli2@kth.se")}>Contact</h5>
                </div>

                <div className="about_person">
                    <h4>Daniel Lejonstad</h4>
                    <img src="https://i.ibb.co/QQB53nd/Daniel-Grupp9.jpg" alt="Daniel Lejonstad" className="about_image" />
                    <p>Scrum Master & Developer</p>
                    <p>daniel.lejonstad@hotmail.com</p>
                    <h5 onClick={() => handleClickToEmail("daniel.lejonstad@hotmail.com")}>Contact</h5>
                </div>
            </div>
        </div>
    );
}
