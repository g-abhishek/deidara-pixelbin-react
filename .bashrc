function tagdeploy () {
  if [[ "$1" = "erase" ]]
  then
    branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    if [ "$branch" = "master" ] || [ "$branch" = "main" ]
    then
      echo "Attention! This action will push code to production. Do you wish to continue(y/n)?:"
      read flag
      if [[ "$flag" == "y" ]] || [[ "$flag" == "Y" ]]
      then
        TAG=deploy.$1
        echo "Deploying $TAG $branch"
        git tag $TAG -f
        git push origin $TAG -f
      else
        echo "Aborting"
      fi
    else
      echo "Error: Deploying prod from $branch"
    fi
  elif [[ "$1" = "erasex0" ]]
  then
    TAG=deploy.$1.$(date +%s)
    echo "Deploying $TAG $branch"
    git tag $TAG
    git push origin $TAG
  else
    echo "Incorrect realm: $1 !!"
  fi
}