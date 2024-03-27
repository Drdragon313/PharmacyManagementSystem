#!/bin/bash

# Load variables from the config file
source config.sh

# Git pull to update the codebase
git branch && git pull

# Check if the git pull was successful
if [ $? -ne 0 ]; then
  echo "Error: Git pull failed. Please check your repository."
  exit 1
fi

# Run npm install inside the container
echo "Running 'npm install' command in container"
docker exec "$containername" npm install

# Find the process ID of the existing running process
existing_pid=$(docker exec "$containername" netstat -tulpn 2>/dev/null | grep ":$portnumber" | awk '{print $7}' | cut -d'/' -f1)
echo "Existing running Node.js process (PID $existing_pid)"

# Check if there is a running process
if [ -n "$existing_pid" ]; then
  # Kill the existing running process
  docker exec "$containername" kill -9 "$existing_pid"
  echo "Existing Node.js process (PID $existing_pid) killed."
else
  echo "No existing Node.js process found."
fi

# Run npm start inside the container
echo "Running 'npm start' command in container"
docker exec -d "$containername" npm start
