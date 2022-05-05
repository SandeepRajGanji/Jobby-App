import './index.css'

const EmploymentFilter = props => {
  const {empDetails, selectType} = props
  const {label, employmentTypeId} = empDetails

  const onSelectType = () => {
    selectType(employmentTypeId)
  }

  return (
    <li onClick={onSelectType} type="button">
      <input type="checkbox" id={employmentTypeId} name={label} />
      <label htmlFor={employmentTypeId} className="empType-item-label">
        {label}
      </label>
    </li>
  )
}
export default EmploymentFilter
