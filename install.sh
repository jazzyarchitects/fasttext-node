#!/bin/bash

# Python is needed only for word similarity prediction
#PYTHON2_COMMAND=$(python --version)
#PYTHON2_EXISTS=$?

# Checking if python exists

# Check if c++ is installed
C_COMMAND=$(c++ --version)
C_EXISTS=$?

if [ "$C_EXISTS" -eq "0" ]
then 
  echo -e "\033[0;32m\033[1mc++ compiler is installed... Cool...!!!\033[0m"
else 
  GCC_COMMAND=$(gcc --version)
  GCC_EXISTS=$?

  if [ "$GCC_EXISTS" -eq "0" ]
  then 
    echo -e "\033[0;32m\033[1mgcc c++ compiler is installed... Cool...!!!\033[0m"
  fi
  echo -e "\033[0;31mC++ compiler not installed in your system. Install c++ or gcc to use \033[1m\033[4mFastText-Node\033[0;31m  module \033[0m"
fi

GIT_COMMAND=$(git --version)

GIT_EXISTS=$?

# Checking if git exists. Git is required for cloning fast text library
if [ "$GIT_EXISTS"  -eq "0" ]
then
  echo -e "\033[0;32m\033[1mGit is installed... Cool...!!!\033[0m"
else
  echo -e "\033[0;31mGit not installed in your system. Install git to use \033[1m\033[4mFastText-Node\033[0;31m  module \033[0m"
  exit 1
fi

# Check if curl is installed
CURL_COMMAND=$(curl --version)

CURL_EXISTS=$?

if [ "$CURL_EXISTS" -eq "0" ]
then
  echo -e "\033[0;32m\033[1mCurl is installed... Cool...!!!\033[0m"
else
  echo -e "\033[0;31mCurl not installed in your system. Install curl to use \033[1m\033[4mFastText-Node\033[0;31m  module \033[0m"
  exit 1
fi


echo -e "\033[0;32m\033[1mInstalling FastText-Node Module\033[0m"

echo -e "\033[0;32mDownloading Fast Text Library\033[0m"

# remove the existing folder else git throws an error
rm -rf fastText/

git clone https://github.com/facebookresearch/fastText.git

echo -e "\033[0;32mDownloaded Fast Text Library."
echo -e "Building the library\033[0m"

cd fastText
make

echo -e "\033[0;32m\033[1mInstalled FastText-Node Library\033[0m"

echo ""

echo -e "\033[0;32m\033[1mBuilding node module\033[0m"

cd ..
./node_modules/.bin/grunt build

echo -e "\033[0;32m\033[1mFinished installing module\033[0m"
