export default function Team() {
    function handleClickToEmail(email) { window.location.href = `mailto:${email}`; }

    return (
        <div className="about_wrapper">
            <h1>About the team</h1>
            <div className="about_group_members">
                <div className="about_person">
                    <h4>Salahudin Salah</h4>
                    <img src="https://pli2.s-ul.eu/promosense/oVcgpMLz" alt="Salahudin Salah" />
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
                    <img src="https://pli2.s-ul.eu/promosense/EcmjYERi" alt="Ali Kazimov" />
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
                    <img src="https://pli2.s-ul.eu/promosense/RHATpVQx" alt="Ludwig Ask" />
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
                    <img src="https://pli2.s-ul.eu/promosense/d7flcPFO" alt="Peter Li" />
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
                    <img src="https://pli2.s-ul.eu/promosense/n3cQN5I9" alt="Daniel Lejonstad" />
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
