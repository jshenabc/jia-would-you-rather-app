import React, { Component } from 'react'


class Dashboard extends Component {

  render() {
    return (
      <div>
        // <h3 className='center'>Your timeline</h3>
        // <ul className='dashboard-list'>
        //   {this.props.tweetIds.map((id) => (
        //     <li key={id}>
        //       <Tweet id={id}/>
        //     </li>
        //   ))}
        // </ul>
      </div>
    )
  }
}

// function mapStateToProps ({ tweets }){
//   return {
//     tweetIds : Object.keys(tweets)
//       .sort((a,b) => tweets[b].timestamp-tweets[a].timestamp)
//   }
// }
export default Dashboard
