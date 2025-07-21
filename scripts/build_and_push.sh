#!/bin/sh
set -e

docker build -t ncacademy/express_shipping:latest .

docker login

docker push ncacademy/express_shipping:latest

echo "✅ Image built & pushed"
