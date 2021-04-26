import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const { fullName } = props

  return (
    <div>
      <h3>Welcome, {fullName}</h3>
      <p>Let's make some music!</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    fullName: state.auth.fullName
  }
}

export default connect(mapState)(Home)
