near login
echo "..............."
echo "Building contract"
echo "..............."

npm run buildNear:release

echo "..............."
echo "Build completed"
echo "..............."
echo "Deploying contract"
echo "..............."

near dev-deploy ../out/main.wasm

echo "..............."
echo "Building frontend on local"
echo "..............."

npm run build

echo "..............."
echo "Build completed"
echo "..............."
echo "Deploying frontend on localhost"
echo "..............."

npm run start


