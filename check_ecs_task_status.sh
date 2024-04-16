#!/bin/bash

# Function to check the status of the latest task
check_task_status() {
    latest_task=$(aws ecs list-tasks --cluster "$cluster_name" --service-name "$service_name" --region "$region_name" --query 'taskArns | [-1]' --output text)
    echo $latest_task
    if [ -n "$latest_task" ]; then
        task_status=$(aws ecs describe-tasks --cluster "$cluster_name" --tasks "$latest_task" --region "$region_name"  --query 'tasks[0].lastStatus' --output text)
        echo "Latest task status: $task_status"

        # Check if the task is running
        if [ "$task_status" == "RUNNING" ]; then
            return 0  # Task is running
        elif [ "$task_status" == "STOPPED" ]; then
            return 1  # Task has stopped (failed)
        fi
    fi

    return 2  # Task is not running yet
}

# Poll for task status until it is running or failed
while true; do
    if check_task_status; then
        echo "Task is now running!"
        break
    elif [ $? -eq 1 ]; then
        echo "Task has failed. Exiting script."
        exit 1
    else
        echo "Waiting for the task to be in RUNNING state..."
        sleep 5  # Adjust the sleep interval as needed
    fi
done

