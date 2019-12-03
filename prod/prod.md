### Deployment  instructions

If you have already created your Heroku app, you can easily add a remote to your local repository with the heroku git:remote command. All you need is your Heroku app’s name:

heroku git:remote -a asutravelander


Renaming remotes

By default, the Heroku CLI names all of the Heroku remotes it creates for your app heroku. You can rename your remotes with the git remote rename command:

git remote rename heroku heroku-staging

Renaming your Heroku remote can be handy if you have multiple Heroku apps that use the same codebase (for example, the staging and production versions of an app). In this case, each Heroku app has its own remote in your local repository.

The remainder of this article assumes your app has a single Heroku remote that is named heroku.
Deploying code

To deploy your app to Heroku, you typically use the git push command to push the code from your local repository’s master branch to your heroku remote, like so:

git push heroku master


Use this same command whenever you want to deploy the latest committed version of your code to Heroku.

Note that Heroku only deploys code that you push to the master branch of the heroku remote. Pushing code to another branch of the remote has no effect.
Deploying from a branch besides master

If you want to deploy code to Heroku from a non-master branch of your local repository (for example, testbranch), use the following syntax to ensure it is pushed to the remote’s master branch:

git push heroku task:master
