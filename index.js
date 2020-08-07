/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  
  app.log('Yay, the app was loaded!')

  //on PR labeled event
  app.on('pull_request.labeled', async context => {

    const params = context.issue({})

    //store the label name as a string
    const label_name = await context.payload.label.name

    //depending on what the label was do an action
    switch(label_name) {
      case 'bug':
        //do something
        app.log('this label was: bug')
      case 'invalid':
        //do something
      case 'good first issue':
        //do something
    }

    //check if enough people have approved the request
    approved = await checkApproved(context, params)
    
    //merge the PR if it has been approved by enough people
    if(approved) {
      //app.log('this PR is approved')
      return merge(context, params)
    }
    return
  })


  /**Function to check if a Pull Request has been approved for merge
   * 
   * @param {*} context 
   * @param {*} params 
   */
   async function checkApproved(context, params) {

    const reviews = await context.github.pulls.listReviews(params)
    const count = await reviews.data.filter(review => review.state == 'APPROVED').length
    if(count >= 2) {
      return true
    } else {
      return false
    }
    
  }

  /**Function to merge Pull Request
   * 
   * @param {*} context 
   * @param {*} params 
   */
  async function merge(context, params) {
    return context.github.pulls.merge(params)
  }

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
