import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {GoLocation} from 'react-icons/go'
import {IoBag} from 'react-icons/io5'
import {BsFillStarFill, BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobSpecificItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobSpecificItemData: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobSpecificItemDetails()
  }

  getJobSpecificItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const modifiedData = {
        companyLogo: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        companyWebsiteUrl: data.job_details.company_website_url,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
        skills: data.job_details.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
      }

      const modifiedSimilarJobsData = data.similar_jobs.map(eachJob => ({
        companyLogo: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobSpecificItemData: modifiedData,
        similarJobs: modifiedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobSpecificItemFailureView = () => (
    <div className="failure-job-specific-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure View"
        className="failure-job-specific-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobSpecificItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderJobSpecificItemSuccessView = () => {
    const {jobSpecificItemData, similarJobs} = this.state
    const {
      companyLogo,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
      companyWebsiteUrl,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      skills,
    } = jobSpecificItemData
    return (
      <>
        <div className="job-specific-card">
          <div className="job-title-container">
            <img
              src={companyLogo}
              alt="job details company logo"
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
          <div>
            <div className="job-description-heading-section">
              <h1 className="heading">Description</h1>
              <div className="visit-container">
                <a href={companyWebsiteUrl}>
                  <button type="button" className="visit-button">
                    Visit
                  </button>

                  <BsBoxArrowUpRight className="visit-icon" />
                </a>
              </div>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>

          <div>
            <h1 className="heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(eachSkill => (
                <Skills skillDetails={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="heading">Life at Company</h1>
            <div className="life-at-company-details">
              <p className="job-description">{lifeAtCompanyDescription}</p>
              <img
                src={lifeAtCompanyImageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(eachJob => (
              <SimilarJobs key={eachJob.id} similarJobData={eachJob} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobSpecificItemView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobSpecificItemSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobSpecificItemFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-specific-item-container">
          {this.renderJobSpecificItemView()}
        </div>
      </>
    )
  }
}
export default JobSpecificItem
