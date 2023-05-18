import React, {Component} from 'react';
import '../contact.css';
class Contacts extends Component {
    render() {
        function validateForm() {
            var name =  document.getElementById('name').value;
            if (name == "") {
                document.querySelector('.status').innerHTML = "Name cannot be empty";
                return false;
            }
            var email =  document.getElementById('email').value;
            if (email == "") {
                document.querySelector('.status').innerHTML = "Email cannot be empty";
                return false;
            } else {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test(email)){
                    document.querySelector('.status').innerHTML = "Email format invalid";
                    return false;
                }
            }
            var subject =  document.getElementById('subject').value;
            if (subject == "") {
                document.querySelector('.status').innerHTML = "Subject cannot be empty";
                return false;
            }
            var message =  document.getElementById('message').value;
            if (message == "") {
                document.querySelector('.status').innerHTML = "Message cannot be empty";
                return false;
            }
            document.querySelector('.status').innerHTML = "Sending...";
        }
        return (
            <section class="mb-4" >


                <h2 class="h1-responsive font-weight-bold text-center my-4" >Contact us</h2>

                <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                    a matter of hours to help you.</p>

                <div class="row mx-auto mb-5 form">


                    <div class="col-md-9 mb-md-0 mb-5">
                        <form id="contact-form" name="contact-form" action="mail.php" method="POST">


                            <div class="row">


                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="name" name="name" class="form-control"/>
                                            <label for="name" class="">Your name</label>
                                    </div>
                                </div>



                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="email" name="email" class="form-control"/>
                                            <label for="email" class="">Your email</label>
                                    </div>
                                </div>


                            </div>



                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input type="text" id="subject" name="subject" class="form-control"/>
                                            <label for="subject" class="">Subject</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">


                                <div class="col-md-12">

                                    <div class="md-form">
                                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                                        <label for="message">Your message</label>
                                    </div>

                                </div>
                            </div>


                        </form>

                        <div class="text-center text-md-left">
                            <a className="btn btn-primary" onClick={validateForm}>Send</a>
                        </div>
                        <div class="status"></div>
                    </div>

                </div>

            </section>

        );
    }
}

export default Contacts;
