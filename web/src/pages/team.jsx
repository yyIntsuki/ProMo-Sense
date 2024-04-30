export default function Team() {
    function handleClickToEmail(email) { window.location.href = `mailto:${email}`; }

    return (
        <div className="about_wrapper">
            <h1>About the team</h1>
            <div className="about_group_members">
                <div className="about_person">
                    <h4>Salahudin Salah</h4>
                    <img src="https://i.ibb.co/ScX1q0M/Salah-Grupp9.jpg" alt="Salahudin Salah" />
                    <div className="roles">
                        <p>Product Owner</p>
                        <p>Developer</p>
                    </div>
                    <div className="contact">
                        <button onClick={() => handleClickToEmail("sasalah@kth.se")}>Contact</button>
                        <small>sasalah@kth.se</small>
                    </div>
                </div>

                <div className="about_person">
                    <h4>Ali Kazimov</h4>
                    <img src="https://i.ibb.co/VwSjYgg/ALIGRUPP9.jpg" alt="Ali Kazimov" />
                    <div className="roles">
                        <p>Developer</p>
                    </div>
                    <div className="contact">
                        <button onClick={() => handleClickToEmail("kazimov@kth.se")}>Contact</button>
                        <small>kazimov@kth.se</small>
                    </div>
                </div>

                <div className="about_person">
                    <h4>Ludwig Ask</h4>
                    <img src="https://i.ibb.co/fxXDSFT/DIFSUGER.jpg" alt="Ludwig Ask" />
                    <div className="roles">
                        <p>Developer</p>
                    </div>
                    <div className="contact">
                        <button onClick={() => handleClickToEmail("ludwigas@kth.se")}>Contact</button>
                        <small>ludwigas@kth.se</small>
                    </div>
                </div>

                <div className="about_person">
                    <h4>Peter Li</h4>
                    <img src="https://i.ibb.co/P5JCfSM/peter-Grupp9.jpg" alt="Peter Li" />
                    <div className="roles">
                        <p>Developer</p>
                    </div>
                    <div className="contact">
                        <button onClick={() => handleClickToEmail("pli2@kth.se")}>Contact</button>
                        <small>pli2@kth.se</small>
                    </div>
                </div>

                <div className="about_person">
                    <h4>Daniel Lejonstad</h4>
                    <img src="https://i.ibb.co/QQB53nd/Daniel-Grupp9.jpg" alt="Daniel Lejonstad" />
                    <div className="roles">
                        <p>Scrum Master</p>
                        <p>Developer</p>
                    </div>
                    <div className="contact">
                        <button onClick={() => handleClickToEmail("daniel.lejonstad@hotmail.com")}>Contact</button>
                        <small>daniel.lejonstad@hotmail.com</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
