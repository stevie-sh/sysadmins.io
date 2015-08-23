#GIT WORKFLOW

For now, all commits should be made under a personal (rivanov-branch) or feature-branch (chat-branch) or forked off the repo.   

Commits should go through a **pull-request** because it encourages collaboration and code-review and reduces danger of pushing directly to master.

Core contributors will branch off master and make edits then pull request their changes.

Non-core contributors will have to fork off the repo.

For now, however. Let's make sure all commits are going through pull-requests.

[Git-Workflow Resource](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)

[Pull Request Resource #2](https://help.github.com/articles/using-pull-requests/)

##GIT BRANCHING

* Master is always production-ready.
* Tagged releases are used whenever changes are made to production.
* MVPx will each have its own branch and should pull from master stable changes.
* At this point in time there will be three main branches - MVP1, MVP2, and master

Following a simplifed version of this:
[Git-workflow-branching](http://nvie.com/posts/a-successful-git-branching-model/)

##VERSIONING
each mvp is 0.x.y
where y are fixes and updates to mvps
mvp number is up to date with x

##DEPLOYS
deploys should all be documented with a brief change log on the github wiki
