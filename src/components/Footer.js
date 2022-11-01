import React from "react";
import { BsLinkedin } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import '../Style/footer.css'
const Footer = (props) => {

    return (
        <footer>
            <div className="footer-content">

                <ul className="socials">
                    <li><a href="https://www.linkedin.com/in/georgeluciano2599/"><BsLinkedin className="icon" /></a></li>
                    <li><a href="https://github.com/Georgelucib"><BsGithub className="icon" /></a></li>
                    <li><a href="https://twitter.com/Blurryluck"><BsTwitter className="icon" /></a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>2022 - React Project - All Rights Reserved. Designed by <span>George Barros</span></p>
            </div>
        </footer>
    );
};

export default Footer;
