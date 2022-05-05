import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import EmploymentFilter from '../EmploymentFilter'
import SalaryFilter from '../SalaryFilter'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  emptyResult: 'EMPTYRESULT',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsData: [],
    apiStatus: apiStatusConstants.initial,
    empType: '',
    salaryPay: '',
    search: '',
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    const {empType, salaryPay, search} = this.state
    let newEmpType = []
    if (empType.length !== 0) {
      for (let i = 0; i < empType.length; i += 1) {
        newEmpType.push(empType[i])
      }
    }
    newEmpType = newEmpType.join(',')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${newEmpType}&minimum_package=${salaryPay}&search=${search}`
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      if (data.jobs.length > 0) {
        const modifiedData = data.jobs.map(eachData => ({
          companyLogo: eachData.company_logo_url,
          employmentType: eachData.employment_type,
          id: eachData.id,
          jobDescription: eachData.job_description,
          location: eachData.location,
          packagePerAnnum: eachData.package_per_annum,
          rating: eachData.rating,
          title: eachData.title,
        }))

        this.setState({
          jobsData: modifiedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.emptyResult,
        })
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderNoJobsView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobListSuccessView = () => {
    const {jobsData} = this.state

    return (
      <ul className="jobs-list-container">
        {jobsData.map(eachJob => (
          <JobItem jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  selectType = id => {
    const {empType} = this.state

    const empTypeName = employmentTypesList.filter(eachJobType => {
      if (id === eachJobType.employmentTypeId) {
        return eachJobType.employmentTypeId
      }
      return null
    })
    const newEmpType = [...empType, empTypeName[0].employmentTypeId]
    console.log(newEmpType)
    this.setState(
      {
        empType: newEmpType,
      },
      this.getJobItemData,
    )
  }

  selectPay = id => {
    const salaryPayRange = salaryRangesList.filter(
      eachPayType => eachPayType.salaryRangeId === id,
    )

    this.setState(
      {
        salaryPay: salaryPayRange[0].salaryRangeId,
      },
      this.getJobItemData,
    )
  }

  renderLeftSection = () => (
    <>
      <Profile />
      <div className="filters-container">
        <h1 className="filters-heading">Type of Employment</h1>
        <ul className="empType-list">
          {employmentTypesList.map(eachType => (
            <EmploymentFilter
              key={eachType.employmentTypeId}
              empDetails={eachType}
              selectType={this.selectType}
            />
          ))}
        </ul>
      </div>
      <div className="filters-container">
        <h1 className="filters-heading">Salary Range</h1>
        <ul className="empType-list">
          {salaryRangesList.map(eachPay => (
            <SalaryFilter
              key={eachPay.salaryRangeId}
              payDetails={eachPay}
              selectPay={this.selectPay}
            />
          ))}
        </ul>
      </div>
    </>
  )

  renderJobListFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure View"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobItemData}
      >
        Retry
      </button>
    </div>
  )

  updateSearch = event =>
    this.setState({
      search: event.target.value,
    })

  renderJobView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobListSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobListFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.emptyResult:
        return this.renderNoJobsView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-container">
            <div className="left-section">{this.renderLeftSection()}</div>
            <div className="right-section">
              <div className="search-container">
                <input
                  type="search"
                  className="search"
                  placeholder="Search"
                  onChange={this.updateSearch}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                  onClick={this.getJobItemData}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderJobView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
