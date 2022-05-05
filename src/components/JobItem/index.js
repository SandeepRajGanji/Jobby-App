import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import {IoBag} from 'react-icons/io5'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props

  const {
    companyLogo,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-card">
        <div className="job-title-container">
          <img src={companyLogo} alt="company logo" className="company-logo" />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="job-rating-section">
              <BsFillStarFill className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-other-details-container">
          <div className="job-location-type-container">
            <div className="job-location-container">
              <GoLocation />
              <p>{location}</p>
            </div>
            <div className="job-type-container">
              <IoBag />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
