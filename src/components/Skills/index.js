import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skills-card">
      <img src={imageUrl} alt={name} className="skills-image" />
      <p>{name}</p>
    </li>
  )
}
export default Skills
