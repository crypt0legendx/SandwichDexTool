function Footer(){

    return (
        <>
            <footer>
                <div className="footer_wrapper">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10 col-lg-12">
                                <div className="footer_box_wrapper">
                                    <div className="footer_box pt_30">
                                        <div className="footer_content">
                                            <a href="index.html">
                                                <img src="../../../assets/images/Logo/logo.png" className="img-fluid" alt="" />
                                            </a>
                                            <p>Sandwich Network is the definite hub to start your decentralized cryptocurrency journey. Join us!</p>
                                        </div>
                                    </div>
                                    <div className="footer_box pt_30">
                                        <div className="footer_list_wrapper">
                                            <h5>Products</h5>
                                   
                                        </div>
                                    </div>
                                    <div className="footer_box pt_30">
                                        <div className="footer_list_wrapper">
                                            <h5>Support</h5>
                                            <ul className="footer_list">
                                                <li>
                                                    <a href="/tutorials/">Tutorials</a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="https://docs.sandwich.network/">Documentation</a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="https://docs.sandwich.network/support">Customer support</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer_box pt_30">
                                        <div className="footer_list_wrapper">
                                            <h5>Social</h5>
                                            <ul className="footer_list">
                                                <li>
                                                    <a target="_blank" href="https://t.me/SandwichNetwork">
                                                        <i className="fab fa-telegram-plane"></i> Telegram
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="https://twitter.com/NetworkSandwich">
                                                        <i className="fab fa-twitter"></i> Twitter
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="https://medium.com/@sandwichnetwork">
                                                        <i className="fab fa-medium"></i> Medium
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="footer_last_text">
                                    <p>Copyright © 2021 Sandwich. All rights reserved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> 
        </>
    )
}

export default Footer;