While on your master branch:
git pull --rebase upstream master
If starting new feature/branch:
git checkout -b featureBranchName
Only work on feature branches, not on master
Commit early, commit often
Once finished working on feature branch, checkout master, then pull upstream
git pull --rebase upstream master
Resolve any conflicts locally
Then, do: 
git checkout featureBranchName
git rebase master
Which moves the entire feature branch to begin on the tip of the master branch, incorporating all of the new commits in master
git checkout master
git merge featureBranchName
Test out master locally, ensure the build doesn't break
Let the team know that you will submit a Pull Request so they don't push any of their changes
Push to origin (your fork)
Submit Pull Request
Q: But what if I have 3 commits that are really similar?
A: Squash them:
git log --oneline
git rebase -i HEAD~3
select 2 of the commits to be squashed ('squash'), and 1 commit to receive those changes ('pick')
