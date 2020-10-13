#!/bin/bash

# colours

PRE="\033["             # prefix
NC="${PRE}0m"           # no colour
LG="${PRE}0;32m"        # light green
DG="${PRE}1;32m"        # dark green
LR="${PRE}0;31m"        # light red
BI="${PRE}1m${PRE}4m"   # bold italics

# Python is needed only for word similarity prediction
#PYTHON2_COMMAND=$(python --version)
#PYTHON2_EXISTS=$?

# Checking if python exists

# Check if c++ is installed

if command -v c++ &> /dev/null
then 
  echo -e "${DG}C++ compiler is installed... Cool...!!!${NC}"
else 

  # Check if gcc is installed

  if command -v gcc &> /dev/null
  then 
    echo -e "${DG}Gcc compiler is installed... Cool...!!!${NC}"
  fi

  echo -e "${LR}C++ compiler is not installed on your system. Install c++ or gcc to use the ${BI}FastText-Node${LR} module${NC}"
fi

# Checking if git exists. Git is required for cloning fast text library

if command -v git &> /dev/null
then
  echo -e "${DG}Git is installed... Cool...!!!${NC}"
else
  echo -e "${LR}Git not installed in your system. Install git to use ${BI}FastText-Node${LR} module${NC}"
  exit 1
fi

# Check if curl is installed

if command -v curl &> /dev/null
then
  echo -e "${DG}Curl is installed... Cool...!!!${NC}"
else
  echo -e "${LR}Curl not installed in your system. Install curl to use ${BI}FastText-Node${LR} module${NC}"
  exit 1
fi

# Installing FastText-Node Module

echo -e "${DG}Installing FastText-Node Module${NC}"

echo -e "${LG}Downloading Fast Text Library${NC}"

# remove the existing folder else git throws an error

rm -rf fastText/

git clone https://github.com/facebookresearch/fastText.git

echo -e "${LG}Downloaded Fast Text Library.${NC}"
echo -e "${LG}Building the library${NC}"

cd fastText
make

echo -e "${LG}Built Fast Text Library.${NC}"

echo -e "${DG}Installed FastText-Node Library${NC}"

echo ""

cd ..

echo -e "${DG}Building node module${NC}"

ROOT=$(pwd)

${ROOT}/node_modules/.bin/grunt build

echo -e "${DG}Finished installing module${NC}"
