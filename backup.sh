#!/bin/bash

# Database credentials
user="root"
password="root"
db_name="liberty"

# Other options
backup_path="/var/www/libertyprim-api/SQL/dumps"
date=$(date +"%d-%b-%Y")

# Set default file permissions
umask 177

# Dump database into SQL file
sudo mysqldump --user=$user --password=$password $db_name --no-create-info > $backup_path/$db_name-$date.sql

echo ""
echo "=================================================="
echo "=                                                ="
echo "=          BACKUP REALISÉ AVEC SUCCÉS !          ="
echo "=                                                ="
echo "=================================================="
echo ""

# Delete files older than 30 days
#find $backup_path/* -mtime +30 -exec rm {} \;