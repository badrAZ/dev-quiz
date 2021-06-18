import React from 'react'
import PropTypes from 'react-proptypes'
import Select from 'react-select'
import { SiJavascript, SiReact, SiNodeDotJs } from 'react-icons/si'
import { BiNetworkChart } from 'react-icons/bi'

const Label = ({ Component, label }) => (
  <strong>
    <Component /> {label}
  </strong>
)

const OPTIONS = [
  {
    value: 'javascript',
    label: <Label Component={SiJavascript} label='Javascript' />,
  },
  {
    value: 'architecture',
    label: <Label Component={BiNetworkChart} label='Architecture' />,
  },
  {
    value: 'react',
    label: <Label Component={SiReact} label='React' />,
  },
  {
    value: 'node',
    label: <Label Component={SiNodeDotJs} label='Node' />,
  },
]

export default function SelectQuizType({ onChange, value }) {
  const handler = React.useCallback(
    option => onChange(option.value),
    [onChange]
  )
  const newValue = React.useMemo(
    () => OPTIONS.find(_ => _.value === value),
    [value]
  )

  return <Select options={OPTIONS} value={newValue} onChange={handler} />
}

SelectQuizType.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}
