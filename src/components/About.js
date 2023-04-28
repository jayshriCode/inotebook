import { React } from "react"
import { Link} from "react-router-dom";


function About() {

  return (
    <div>
     
      <section className="bg-light py-5 py-xl-8">
        <div className="container">
          <div className="row gy-5 gy-lg-0 gx-lg-6 gx-xxl-8 align-items-lg-center">
            <div className="col-12 col-lg-6">
              <img className="img-fluid rounded" loading="lazy" src="https://bootstrapbrain.com/wp-content/plugins/bootstrap-brain/components/about/about-2/assets/img/about-img-1.webp" alt=""/>
            </div>
            <div className="col-12 col-lg-6">
              <h2 className="h1 mb-3">Why Choose Us?</h2>
              <p className="lead fs-4 text-secondaryX mb-5">With years of experience and deep industry knowledge, we have a proven track record of success and are constantly pushing ourselves to stay ahead of the curve.</p>
              <div className="d-flex align-items-center mb-3">
                <div className="me-3 text-primary">
                  <i class="fa-sharp fa-solid fa-circle-check fa-xl" style={{color:'#1862e2'}}></i>
                </div>
                
                <div>
                  <p className="fs-5 m-0">Our evolution procedure is super intelligent.</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="me-3 text-primary">
                <i class="fa-sharp fa-solid fa-circle-check fa-xl" style={{color:'#1862e2'}}></i>
                </div>
                <div>
                  <p className="fs-5 m-0">We deliver services beyond expectations.</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-5">
                <div className="me-3 text-primary">
                <i class="fa-sharp fa-solid fa-circle-check fa-xl" style={{color:'#1862e2'}}></i>
                </div>
                <div>
                  <p className="fs-5 m-0">Let's hire us to reach your objectives.</p>
                </div>
              </div>
              {!localStorage.getItem('token')?<Link className="btn btn-outline-primary btn-2xl rounded-pill px-4 gap-3" to="/login"  role="button">Connect Now</Link>: ''} 
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
