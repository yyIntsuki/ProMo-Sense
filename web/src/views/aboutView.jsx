import "../css/style.css";

export default function AboutView(props) {
    function goesToEmailACB(email) {
        window.location.href = `mailto:${email}`;
    }

    return (
        <div className="about_wrapper">
            <div className="about_group_members">
                <div className="about_per1">
                    <h4>Salahudin Salah</h4><br />
                    <img src="/src/assets/salah.JPG" alt="Salahudin Salah" className="about_image" /><br />
                    <p>Developer</p>
                    <p>sasalah@kth.se</p><br />
                    <p><button onClick={() => goesToEmailACB("sasalah@kth.se")}>Contact</button></p>
                </div>

                <div className="about_per2">
                    <h4>Ali Kazimovezz</h4><br />
                    <img src="src/assets/ali.png" alt="Ali Kazimov" className="about_image" /><br />
                    <p>Developer</p>
                    <p>kazimov@kth.se</p><br />
                    <p><button onClick={() => goesToEmailACB("kazimov@kth.se")}>Contact</button></p>
                </div>

                <div className="about_per3">
                    <h4>Ludwig Ask</h4><br />
                    <img src="src/assets/ludwig.jpg" alt="Ludwig Ask" className="about_image" /><br />
                    <p>Group Leader & Developer</p>
                    <p>ludwigas@kth.se</p><br />
                    <p><button onClick={() => goesToEmailACB("ludwigas@kth.se")}>Contact</button></p>
                </div>

                <div className="about_per4">
                    <h4>Peter Li</h4><br />
                    <img src="src/assets/peter.jpg" alt="Peter Li" className="about_image" /><br />
                    <p>Group Leader & Developer</p>
                    <p>pli2@kth.se</p><br />
                    <p><button onClick={() => goesToEmailACB("pli2@kth.se")}>Contact</button></p>
                </div>

                <div className="about_per5">
                    <h4>Daniel Lejonstad</h4><br />
                    <img src="src/assets/daniel.jpg" alt="Daniel Lenjonstad" className="about_image" /><br />
                    <p>Scrum Master & Developer</p>
                    <p>daniel.lejonstad@hotmail.com</p><br />
                    <p><button onClick={() => goesToEmailACB("daniel.lejonstad@hotmail.com")}>Contact</button></p>
                </div>
            </div>
        </div>
    );
}
