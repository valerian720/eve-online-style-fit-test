@REM 1) add to vue.config.js
@REM where REPO_NAME is actial repository name

@REM module.exports = {
@REM   publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
@REM };

@REM 2) remove dist from .gitignore

@REM 3)
npm run build
git add dist
git commit -m 'adding dist subtree'
git subtree push --prefix dist origin gh-pages

@REM 4) go to repo and deploy branch gh-pages as stanalone website