import PropTypes from 'react-proptypes'
import { RiAlarmWarningFill } from 'react-icons/ri'

export default function Error({ error }) {
  return <div className='text-danger'>
    <RiAlarmWarningFill /> {error}
  </div>
}
Error.propTypes = {
  error: PropTypes.string.isRequired,
}
