#!/bin/bash
rsync -rzt -e "ssh -o GSSAPIAuthentication=no" --exclude "upload.sh" ./ root@192.168.181.159:/root/file-deal