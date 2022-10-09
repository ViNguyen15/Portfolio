#!/bin/sh
cd
cd Desktop/

echo "creating folder..."
mkdir JimmysProject/
cd JimmysProject/

git clone https://github.com/ViNguyen15/Portfolio.git

echo "cloned successful"
cd Portfolio/portfolioProject

echo "starting portfolio project"

npm install
start "http://localhost:8000/"
npm run dev -- --port 8000

