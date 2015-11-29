# Git Workflow

This document describes the git workflow that should be used when contributing to Challengr.

There are two main branches in the repo, `master` and `deploy`. All pull requests should be made to the `master` branch. Once a certain milestone has been reached, `master` will be merged into `deploy` for deployment.

####1. **Fork the repo at [https://github.com/hacksquare/Challengr](https://github.com/hacksquare/Challengr)**

####2. **Clone the fork to your local computer**
  `$ git clone http://github.com/your-user-name/Challengr.git`

####3. **Set your upstream as the team's repo**
  `$ git remote add upstream http://github.com/hacksquare/Challengr.git`

####4. **Create a new branch**
  Make sure you have the newest code at this point.
  `$ git checkout master`
  `$ git pull --rebase upstream master`

  Then create new branch.
  `$ git checkout -b newBranchName`

  Keep the names short but descriptive.

####5. **Hack away**
  ```sh
  # made changes to code
  $ git status
  $ git add <filename> # or git add .
  $ git commit
  ```

  Commit often. Break down your task into separate mini-tasks and commit each time. If you realize you made to many commits in the end you can and should squash.

  Check out or [Commit Guide](COMMIT-MESSAGES.md) for specifics on commit messages.

####6. **Prepare your code for pull request**
  - Check that the Code does not break anything.
  - Read through code and add comments if necessary.
  - Fix errors flagged by JSHint.
  - Check if code conforms with the style guide.
  - Prettify all your code (check [TOOLS.md](TOOLS.md)).
  - squash your commits if necessary.

####7. **Checkout master and pull from upstream**
  `$ git checkout master`
  `$ git pull --rebase upstream master`

####8. **Checkout your branch and rebase master**
  ```sh
  $ git checkout yourBranch
  $ git rebase master
  ```

####9. **Fix all merge conflicts**
  ```sh
  # fix merge conflicts
  $ git rebase continue
  # repeat until done
  ```
####10. **Checkout master and merge your branch**
  ```sh
  $ git checkout master
  $ git merge yourBranch
  ```

####11. **Check your code again**
  And check it again. And make sure it does not break anything.

####12. **Push to your fork**
  `$ git push origin master`

####13. **Make pull request on github.com**
  Title the request so the reviewer can see what the pull request does.


####14. **Fix all merge conflicts**
  ##merge conflicts
  `$ git rebase continue`


####15. **Push the changes to you github repo**
  `$ git push origin chatDatabaseQuery`

####16. **Make pull request on github.com**
  Title the request so the reviewer can see what the pull request does.

####17. **Let someon check out your pull request**
  If everyhing is fine the person will merge it, otherwise he will let you know what needs to be fixed and you can discuss it. NEVER MERGE YOUR OWN PULL REQUESTS!

####18. **Repeat cycle from step 4**


####Extra. **Squashing**
  Q: But what if I have 3 commits that are really similar?
  A: Squash them:

  ```sh
  $ git log --oneline
  $ git rebase -i HEAD~3
  ```

  select 2 of the commits to be squashed ('squash'), and 1 commit to receive those changes ('pick')
  
  Read more about squashing [here](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
