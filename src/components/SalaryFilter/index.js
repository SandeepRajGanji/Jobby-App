import './index.css'

const SalaryFilter = props => {
  const {payDetails, selectPay} = props
  const {label, salaryRangeId} = payDetails

  const onSelectPay = () => {
    selectPay(salaryRangeId)
  }

  return (
    <li onClick={onSelectPay} type="button">
      <input type="radio" id={salaryRangeId} name="salary" />
      <label htmlFor={salaryRangeId} className="salary-item-label">
        {label}
      </label>
    </li>
  )
}
export default SalaryFilter
