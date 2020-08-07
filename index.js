/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    app.log('an issue was opened')
    const issueComment = context.issue({ body: 'Thanks for opening this issue! version 2' })
    return context.github.issues.createComment(issueComment)
  })


  
  app.on('pull_request.labeled', async context => {


    app.log('a PR was labeled')
    const params = context.issue({})


    
    

    const label_name = await context.payload.label.name

    switch(label_name) {
      case 'bug':
        //do something
        app.log('this label was: bug')
      case 'invalid':
        //do something
      case 'good first issue':
        //do something
    }

    approved = await checkApproved(context, params)
    //app.log(approved)
    if(approved) {
      app.log('this PR is approved')
      //return merge(context, params)
    }
    return
  })


   async function checkApproved(context, params) {

    const reviews = await context.github.pulls.listReviews(params)
    const count = await reviews.data.filter(review => review.state == 'APPROVED').length
    //app.log(count)

    if(count >= 2) {
      return true
    } else {
      return false
    }
    
  }

  async function merge(context, params) {
    return context.github.pulls.merge(params)
  }



  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
