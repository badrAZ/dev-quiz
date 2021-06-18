import Spinner from 'react-bootstrap/Spinner'

export default function NoData({ data, children }) {
  return data != null ? children() : <Spinner animation='border' />
}
