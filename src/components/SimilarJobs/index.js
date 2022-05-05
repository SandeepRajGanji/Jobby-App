import {GoLocation} from 'react-icons/go'
import {IoBag} from 'react-icons/io5'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobData} = props
  const {
    companyLogo,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobData
  return (
    <li className="similar-job-card">
      <div className="job-title-container">
        <img
          src={companyLogo}
          alt="similar job company logo"
          className="company-logo"
        />
        <div>
          <h1 className="job-title">{title}</h1>
          <div className="job-rating-section">
            <BsFillStarFill className="star" />
            <p>{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>

      <div className="similar-job-location-type-container">
        <div className="job-location-container">
          <GoLocation />
          <p>{location}</p>
        </div>
        <div className="job-type-container">
          <IoBag />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
